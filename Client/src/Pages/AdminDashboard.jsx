import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Components/Button";
import axios from "axios";
import SideBar from "../Components/SideBar";
const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);

  const [productsShowMore, setProductsShowMore] = useState(false);
  const [productsCount, setproductsCount] = useState(4);
  const [productsShowValue, setProductsShowValue] = useState("Show More");

  function handleProductsCount() {
    if (productsShowMore) {
      setproductsCount(4);
      setProductsShowValue("Show More");
    } else {
      setproductsCount(products.length);
      setProductsShowValue("Show Less");
    }
    setProductsShowMore(!productsShowMore);
  }

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productRes = await axios.get("https://drippy-clothing-store.onrender.com/api/v1/products");
        const ordersRes = await axios.get("https://drippy-clothing-store.onrender.com/api/v1/orders", 
          { headers: { Authorization: `Bearer ${token}` } });
        const usersRes = await axios.get("https://drippy-clothing-store.onrender.com/api/v1/users",
          { headers: { Authorization: `Bearer ${token}` } });

        setOrders(ordersRes.data.orders);
        setUsers(usersRes.data.users);
        setProducts(productRes.data.products);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProducts();
  }, [token]);

  useEffect(() => {
    const calculatedTotal = orders.reduce((sum, order) => {
      return sum + order.products.reduce((orderSum, product) => {
        return orderSum + (product.product?.price || 0) * product.quantity;
      }, 0);
    }, 0);
    setTotal(calculatedTotal);
  }, [orders]);

  // Mock data
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalUsers = users.length;
  const totalRevenue = total;

  return (
    <div className="flex min-h-screen bg-gray-100 mt-40 max-sm:mt-20 max-sm:overflow-x-hidden md:ml-5">
      {/* Sidebar */}
      <SideBar  className={"md:-translate-x-5"}/>

        {/* Main Content */}
        <div className="py-8 lg:ml-[2.5%] lg:w-[95%] max-sm:w-full max-sm:p-3">
        <div className="p-8 max-sm:w-full max-sm:p-3">
          <h1 className="text-2xl font-bold text-center mb-8 max-sm:text-xl max-sm:mb-4">
            Admin Dashboard
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 max-sm:w-3/4 max-sm:ml-[7.5%] sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-700 max-sm:text-xs">
                Total Products
              </h2>
              <p className="text-2xl font-bold text-[#ff6c00] max-sm:text-lg">
                {totalProducts}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-700 max-sm:text-xs">
                Total Orders
              </h2>
              <p className="text-xl font-bold text-[#ff6c00] max-sm:text-lg">
                {totalOrders}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-700 max-sm:text-xs">
                Total Users
              </h2>
              <p className="text-xl font-bold text-[#ff6c00] max-sm:text-lg">
                {totalUsers}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-700 max-sm:text-xs">
                Total Revenue
              </h2>
              <p className="text-xl font-bold text-[#ff6c00] max-sm:text-lg">
                ${totalRevenue.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Latest Products */}
          <div className="mb-8 w-[95%]">
            <div className=" w-full flex items-center justify-between mb-3 max-sm:flex-col max-sm:items-start max-sm:gap-2">
              <h2 className="text-xl font-bold max-sm:text-lg">Latest Products</h2>
              <Link to={"/admin/products"}>
                <Button>
                  Manage Products
                </Button>
              </Link>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg shadow-sm overflow-x-auto">
              <div className="min-w-[300px]">
                <div className="grid grid-cols-4 gap-2 max-sm:text-xs font-bold border-b pb-2">
                  <div>ID</div>
                  <div>Name</div>
                  <div>Price</div>
                  <div>Stock</div>
                </div>

                {products.slice(0, productsCount).map((product) => (
                  <div key={product._id} className="grid grid-cols-4 gap-2 py-2 border-b border-gray-200 text-xl max-sm:text-xs items-center">
                    <div className="truncate">#{product._id.slice(-6)}</div>
                    <div className="flex items-center gap-1">
                      <img 
                        src={product.image[0]?.url} 
                        alt={product.name} 
                        className="h-12 max-sm:h-6 max-sm:w-6" 
                      />
                      <span className="truncate">{product.name}</span>
                    </div>
                    <div className="text-[#ff6c00] font-semibold">${product.price}</div>
                    <div className={`font-semibold ${
                      product.available ? "text-green-500" : "text-red-600"
                    }`}>
                      {product.available ? "In Stock" : "Out"}
                    </div>
                  </div>
                ))}

                <Button 
                  onClick={handleProductsCount}
                  className="mt-3 w-fit max-sm:mt-5 max-sm:w-fit max-sm:text-sm"
                >
                  {productsShowValue}
                </Button>
              </div>
            </div>
          </div>

          {/* Latest Orders */}
          <div className="mb-8 w-[95%]">
            <div className="flex justify-between mb-3 max-sm:flex-col max-sm:items-start max-sm:gap-2">
              <h2 className="text-2xl font-bold max-sm:text-lg">Latest Orders</h2>
              <Link to={"/admin/orders"}>
                <Button className="w-fit max-sm:text-sm">Manage Orders</Button>
              </Link>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg shadow-sm overflow-x-auto">
              <div className="min-w-[320px]">
                <div className="grid grid-cols-5 gap-2 text-xl max-sm:text-xs font-bold border-b pb-2">
                  <div>Order</div>
                  <div>Customer</div>
                  <div>Items</div>
                  <div>Status</div>
                  <div>Total</div>
                </div>

                {orders.slice(0, 5).map((order) => (
                  <div key={order._id} className="grid grid-cols-5 gap-2 py-2 border-b border-gray-200 max text-xl-sm:text-xs items-center">
                    <div className="truncate text-xl">#{order._id.slice(-6)}</div>
                    <div className="truncate">{order.user?.name?.split(' ')[0] || 'N/A'}</div>
                    <div className="ml-[10%]">{order.products.length}</div>
                    <div>
                      <span className={`px-1 py-0.5 rounded-full max-sm:text-[10px] ${
                        order.status === "shipped" ? "bg-blue-100 text-blue-800" :
                        order.status === "delivered" ? "bg-green-100 text-green-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-green-500 font-semibold">${(
                      order.products.reduce((sum, product) => {
                        return sum + (product.product?.price || 0) * product.quantity;
                      }, 0)
                    ).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Latest Users */}
          <div className="w-[95%]">
            <div className="flex justify-between mb-3 max-sm:flex-col max-sm:items-start max-sm:gap-2">
              <h2 className="text-2xl font-bold max-sm:text-lg">Latest Users</h2>
              <Link to={"/admin/users"}>
                <Button className="w-fit max-sm:text-sm">Manage Users</Button>
              </Link>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg shadow-sm overflow-x-auto">
              <div className="min-w-[280px]">
                <div className="grid grid-cols-4 gap-2 text-xs font-bold border-b pb-2">
                  <div>User ID</div>
                  <div>Name</div>
                  <div>Email</div>
                  <div>Role</div>
                </div>

                {users.slice(0, 5).map((user) => (
                  <div key={user._id} className="grid grid-cols-4 gap-2 py-2 border-b border-gray-200 text-lg max-sm:text-xs items-center">
                    <div className="truncate">#{user._id.slice(-6)}</div>
                    <div className="truncate">{user.name}</div>
                    <div className="truncate">{user.email.split('@')[0]}...</div>
                    <div className="capitalize text-[#ff6c00] font-semibold">{user.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
