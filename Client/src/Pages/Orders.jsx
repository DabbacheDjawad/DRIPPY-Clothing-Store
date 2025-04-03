import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { RxHamburgerMenu } from "react-icons/rx";
import Button from "../Components/Button";
import { FaShoppingCart } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { CiUser } from "react-icons/ci";
import { ImProfile } from "react-icons/im";
import { MdDashboard } from "react-icons/md";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  let [total , setTotal] = useState([]);
  const [response , setResponse] = useState("");

  const token = localStorage.getItem("token");

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/orders`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(response.data.orders);
        setResponse("");
      } catch (err) {
        setResponse(err.response.data.message);
      }
    };

    fetchOrders();
  }, []);


  //calculating total
  useEffect(() => {
    const calculatedTotal = orders.reduce((sum, order) => {
      return sum + order.products.reduce((orderSum, product) => {
        return orderSum + (product.product?.price || 0) * product.quantity;
      }, 0);
    }, 0);
  
    setTotal(calculatedTotal);
  }, [orders]);

  //delete Order
  async function deleteOrder(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/orders/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100 mt-40 w-[95%] ml-[2.5%]">
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
                  to="/admin"
                  className="block text-gray-700 hover:text-[#ff6c00] transition-all"
                >
                 <span className="flex gap-5 items-center">Dashboard <MdDashboard size={20}/></span>
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/products"
                  className="block text-gray-700 hover:text-[#ff6c00] transition-all"
                >
                  <span className="flex gap-5 items-center">
                    Products <GiClothes size={20} />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/orders"
                  className="block text-gray-700 hover:text-[#ff6c00] transition-all"
                >
                  <span className="flex gap-5 items-center">
                    orders <FaShoppingCart size={20} />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/users"
                  className="block text-gray-700 hover:text-[#ff6c00] transition-all"
                >
                  <span className="flex gap-5 items-center">
                    Users <CiUser size={20} />
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/profile"
                  className="block text-gray-700 hover:text-[#ff6c00] transition-all"
                >
                  <span className="flex gap-5 items-center">
                    Profile <ImProfile size={20} />
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="flex-1 p-8">
        {/* SlideBar Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`fixed top-7 text-orange-400 left-10 p-2 z-50 bg-white rounded-lg shadow-[0_15px_30px_-5px_rgba(151,65,252,0.2)] ${
            isSidebarOpen ? "translate-x-[250px]" : ""
          } transition-all duration-300 hover:scale-105`}
        >
          <RxHamburgerMenu size={24} />
        </button>

        <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-3 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
          <Button>
            <Link to="/">Order Now</Link>
          </Button>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6">
          {orders && orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-lg shadow-[0_15px_30px_-5px_rgba(151,65,252,0.1)] hover:shadow-[0_15px_30px_-5px_rgba(151,65,252,0.2)] transition-all"
            >
              {/* Order Header */}
              <div className="flex justify-between items-start border-b pb-4 mb-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "shipped"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              {/* Customer Section */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  CUSTOMER
                </h3>
                <p className="text-gray-800 font-medium">
                  {order.user?.name || "Guest User"}
                </p>
              </div>

              {/* Products Section */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  PRODUCTS
                </h3>
                <div className="space-y-3">
                  {order.products.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-800">
                        {item.product?.name || "Deleted Product"}
                      </span>
                      <span className="text-gray-500 text-sm">
                        x{item.quantity} - $
                        {(item.product?.price || 0) * item.quantity}
                      </span>
                      
                    </div>
                  ))}
                </div>
              </div>

              {/* TOTAL */}
              <div className="flex justify-between">
                <p className="mb-2">Total : </p>
                <p className="font-semibold text-orange-500">{`${total}`}</p>
              </div>
              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button
                  onClick={() => deleteOrder(order._id)}
                  className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="bg-white p-8 rounded-lg shadow-[0_15px_30px_-5px_rgba(151,65,252,0.1)] text-center">
            <p className="text-gray-500">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
