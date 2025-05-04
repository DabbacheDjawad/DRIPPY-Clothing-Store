import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "../Components/Button";
import SideBar from "../Components/SideBar";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://drippy-clothing-store.onrender.com/api/v1/orders`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(response.data.orders);
        setResponse("");
      } catch (err) {
        setResponse(err.response?.data?.message || "Failed to fetch orders.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Calculating total
  useEffect(() => {
    const calculatedTotal = orders.reduce((sum, order) => {
      return (
        sum +
        order.products.reduce((orderSum, product) => {
          return orderSum + (product.product?.price || 0) * product.quantity;
        }, 0)
      );
    }, 0);

    setTotal(calculatedTotal);
  }, [orders]);

  // Delete Order
  async function deleteOrder(id) {
    try {
      await axios.delete(
        `https://drippy-clothing-store.onrender.com/api/v1/orders/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 border-4 border-[#ff6c00] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 mt-40 w-[95%] md:ml-10">
      {/* Sidebar */}
      <SideBar className={"md:-translate-x-5"} />

      {/* Main Content */}
      <div className="py-8 lg:ml-[2.5%] lg:w-[95%] max-sm:w-full max-sm:p-3">
        <div className="p-8 max-sm:w-full max-sm:p-3">
          <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
          <Button>
            <Link to="/">Order Now</Link>
          </Button>
        </div>

        {response && (
          <div className="text-red-500 text-center my-4">{response}</div>
        )}

        {/* Orders Grid */}
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6">
          {orders.map((order) => (
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

              {/* Products */}
              <div className="space-y-2">
                {order.products.map((productWrapper, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span>
                      {productWrapper.product?.name || "Unnamed Product"} x{" "}
                      {productWrapper.quantity}
                    </span>
                    <span>
                      {(productWrapper.product?.price || 0) *
                        productWrapper.quantity}{" "}
                      DZD
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Total:{" "}
                  {order.products.reduce((sum, p) => {
                    return sum + (p.product?.price || 0) * p.quantity;
                  }, 0)}{" "}
                  DZD
                </span>
                <button
                  onClick={() => deleteOrder(order._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total Summary */}
        <div className="text-xl font-semibold text-right mt-8 mr-6 text-gray-800">
          Total Revenue: {total} DZD
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
