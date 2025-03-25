import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Components/Button";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";
import axios from "axios"
import { FaShoppingCart } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { CiUser } from "react-icons/ci";
import { ImProfile } from "react-icons/im";
const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products , setProducts] = useState([])


  useEffect(()=>{ 
      async function fetchProducts(){
        const res = await axios.get("http://localhost:3000/api/v1/products");        
        setProducts(res.data.products);        
      }
      fetchProducts();
  } , [])






  // Mock data (replace with real data from your backend)
  const totalProducts = 120;
  const totalOrders = 45;
  const totalUsers = 85;
  const totalRevenue = 12000;

  const latestProducts = [
    { id: 1, name: "Product A", dateAdded: "2023-10-01" },
    { id: 2, name: "Product B", dateAdded: "2023-10-02" },
    { id: 3, name: "Product C", dateAdded: "2023-10-03" },
  ];

  const latestOrders = [
    { id: 1, customer: "John Doe", total: 1500, date: "2023-10-01" ,status : "pending"},
    { id: 2, customer: "Jane Smith", total: 2500, date: "2023-10-02" ,status : "shipped"},
    { id: 3, customer: "Alice Johnson", total: 3000, date: "2023-10-03",status : "pending" },
  ];

  const latestUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      dateJoined: "2023-10-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      dateJoined: "2023-10-02",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      dateJoined: "2023-10-03",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 mt-40">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 z-50 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          <nav>
            <ul className="space-y-10 font-semibold">
              <li>
                <Link
                  to="/admin/products"
                  className="block text-gray-700 hover:text-[#ff6c00] transition-all"
                >
                  <span className="flex gap-5 items-center">Products <GiClothes size={20}/></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/orders"
                  className="block text-gray-700 hover:text-[#ff6c00] transition-all"
                >
                 <span className="flex gap-5 items-center">orders <FaShoppingCart size={20}/></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/users"
                  className="block text-gray-700 hover:text-[#ff6c00] transition-all"
                >
                  <span className="flex gap-5 items-center">Users <CiUser size={20}/></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/profile"
                  className="block text-gray-700 hover:text-[#ff6c00] transition-all"
                >
                  <span className="flex gap-5 items-center">Profile <ImProfile size={20}/></span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 p-2 bg-white rounded-lg shadow-lg lg:hidden"
        >
          <RxHamburgerMenu size={24} />
        </button>

        {/* Dashboard Content */}
        <div className="p-8 lg:ml-[5%] w-[90%]">
          {/* Header */}
          <h1 className="text-2xl font-bold text-center mb-8">
            Admin Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:scale-105 transition-all duration-300">
              <h2 className="text-lg font-semibold text-gray-700">
                Total Products
              </h2>
              <p className="text-2xl font-bold text-[#ff6c00]">
                {totalProducts}
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:scale-105 transition-all duration-300">
              <h2 className="text-lg font-semibold text-gray-700">
                Total Orders
              </h2>
              <p className="text-2xl font-bold text-[#ff6c00]">{totalOrders}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:scale-105 transition-all duration-300">
              <h2 className="text-lg font-semibold text-gray-700">
                Total Users
              </h2>
              <p className="text-2xl font-bold text-[#ff6c00]">{totalUsers}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:scale-105 transition-all duration-300">
              <h2 className="text-lg font-semibold text-gray-700">
                Total Revenue
              </h2>
              <p className="text-2xl font-bold text-[#ff6c00]">
                ${totalRevenue}
              </p>
            </div>
          </div>

          {/* Latest Products */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-5 max-sm:flex-col">
              <h2 className="text-xl font-bold mt-2">Latest Products</h2>
              <Button className={"max-sm:w-[80%] max-sm:mt-3"}>
                <Link to={"/products/add"}>
                  <span className="flex items-center justify-center gap-3">
                    Add Product
                    <FaPlus />
                  </span>
                </Link>
              </Button>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              {latestProducts.map((product) => (
                <div key={product.id} className="border-b border-gray-200 py-3">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    Added on: {product.dateAdded}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Orders */}


              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Latest Orders</h2>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">


                  <div className="grid grid-cols-5 gap-4 font-semibold border-b pb-2 mb-2">
                    <div>Order ID</div>
                    <div>Customer</div>
                    <div>Products</div>
                    <div>Status</div>
                    <div>Total</div>
                  </div>

                  {/* Rows */}
                  {latestOrders.map((order) => (
                    <div
                      key={order.id}
                      className="grid grid-cols-5 gap-4 py-3 border-b border-gray-300"
                    >
                      <div className="font-medium">#{order.id}</div>
                      <div>{order.customer}</div>
                      <div>
                        {order.product}
                      </div>
                      <div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.status === "shipped"? "bg-blue-100 text-blue-800":""}
                              ${order.status === "delivered"? "bg-green-100 text-green-800":""}
                              ${order.status === "pending"?"bg-yellow-100 text-yellow-800":""}
                          `}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="text-green-500 font-semibold">
                        ${order.total}
                      </div>
                    </div>
                  ))}
                </div>
              </div>


          {/* Latest Users */}
          <div>
            <h2 className="text-xl font-bold mb-4">Latest Users</h2>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              {latestUsers.map((user) => (
                <div key={user.id} className="border-b border-gray-200 py-3">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">Email: {user.email}</p>
                  <p className="text-sm text-gray-600">
                    Joined on: {user.dateJoined}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
