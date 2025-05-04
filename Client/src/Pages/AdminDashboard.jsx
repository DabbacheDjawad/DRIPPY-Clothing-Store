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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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
        setIsLoading(true);
        const [productRes, ordersRes, usersRes] = await Promise.all([
          axios.get("https://drippy-clothing-store.onrender.com/api/v1/products"),
          axios.get("https://drippy-clothing-store.onrender.com/api/v1/orders",
            { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("https://drippy-clothing-store.onrender.com/api/v1/users",
            { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setOrders(ordersRes.data.orders);
        setUsers(usersRes.data.users);
        setProducts(productRes.data.products);
        setError(""); // Clear error if all goes well
      } catch (err) {
        console.error(err);
        setError("Failed to fetch dashboard data. Please try again.");
      } finally {
        setIsLoading(false);
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

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalUsers = users.length;
  const totalRevenue = total;

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 border-4 border-[#ff6c00] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="mt-4 text-lg text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 mt-40 max-sm:mt-20 max-sm:overflow-x-hidden md:ml-5">
      <SideBar className={"md:-translate-x-5"} />
      <div className="py-8 lg:ml-[2.5%] lg:w-[95%] max-sm:w-full max-sm:p-3">
        <div className="p-8 max-sm:w-full max-sm:p-3">
          <h1 className="text-2xl font-bold text-center mb-8 max-sm:text-xl max-sm:mb-4">
            Admin Dashboard
          </h1>

          {/* Stats */}
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
          <div className="mb-8 w-[95%] max-sm:w-full">
            <div className="w-full flex items-center justify-between mb-3 max-sm:flex-col max-sm:items-start max-sm:gap-2">
              <h2 className="text-xl font-bold max-sm:text-lg">Latest Products</h2>
              <Link to={"/admin/products"}>
                <Button>Manage Products</Button>
              </Link>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg shadow-sm max-sm:overflow-x-hidden">
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
                    <div className={`font-semibold ${product.available ? "text-green-500" : "text-red-600"}`}>
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
          <div className="mb-8 w-[95%] max-sm:w-full">
            <div className="flex justify-between mb-3 max-sm:flex-col max-sm:items-start max-sm:gap-2">
              <h2 className="text-2xl font-bold max-sm:text-lg">Latest Orders</h2>
              <Link to={"/admin/orders"}>
                <Button className="w-fit max-sm:text-sm">Manage Orders</Button>
              </Link>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg shadow-sm overflow-x-hidden">
              <div className="min-w-[320px]">
                <div className="grid grid-cols-5 max-sm:grid-cols-3 gap-2 text-xl max-sm:text-xs font-bold border-b pb-2">
                  <div className="max-sm:hidden">Order</div>
                  <div>Customer</div>
                  <div>Items</div>
                  <div className="max-sm:hidden">Status</div>
                  <div>Total</div>
                </div>

                {orders.slice(0, 5).map((order) => (
                  <div
                    key={order._id}
                    className="grid grid-cols-5 py-2 border-b border-gray-200 text-xs sm:text-base items-center gap-1 sm:gap-4"
                  >
                    <div className="truncate max-sm:hidden">#{order._id.slice(-4)}</div>
                    <div className="truncate">
                      {order.user?.name?.split(" ")[0] || "N/A"}
                    </div>
                    <div className="text-center md:mr-[60%] max-md:ml-[70%]">
                      {order.products.length}
                    </div>
                    <div>
                      <span className={`px-1 py-0.5 rounded-full text-[10px] sm:text-xs max-sm:hidden ${
                        order.status === "shipped"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-right font-semibold text-green-500 whitespace-nowrap">
                      ${order.products.reduce((sum, product) => {
                        return sum + (product.product?.price || 0) * product.quantity;
                      }, 0).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Latest Users */}
          <div className="w-[95%] max-sm:w-full">
            <div className="flex justify-between mb-3 max-sm:flex-col max-sm:items-start max-sm:gap-2">
              <h2 className="text-2xl font-bold max-sm:text-lg">Latest Users</h2>
              <Link to={"/admin/users"}>
                <Button className="w-fit max-sm:text-sm">Manage Users</Button>
              </Link>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg shadow-sm overflow-x-hidden">
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
                    <div className="truncate">{user.email.split("@")[0]}...</div>
                    <div className="capitalize truncate text-[#ff6c00] font-semibold">{user.role}</div>
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
