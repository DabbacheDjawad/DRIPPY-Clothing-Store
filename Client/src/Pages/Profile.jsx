import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiEdit,
  FiShoppingBag,
  FiCreditCard,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
    phone: "",
  });
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUserData();
    fetchOrders();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "https://drippy-clothing-store.onrender.com/api/v1/users/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data.user);
      console.log(response.data.user);
      
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://drippy-clothing-store.onrender.com/api/v1/orders/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(response.data.orders);      
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

   const handleUpdateProfile = async (id) => {
     try {
       await axios.patch(`https://drippy-clothing-store.onrender.com/api/v1/users/${id}`, user, {
         headers: { Authorization: `Bearer ${token}` },
       });
       setIsEditing(false);
     } catch (error) {
       console.error("Error updating profile:", error);
     }
   };



const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
};



  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await axios.post(
        "https://drippy-clothing-store.onrender.com/api/v1/users/avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUser({ ...user, avatar: response.data.avatar });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 mt-40 max-sm:mt-20 max-sm:overflow-x-hidden">
      {/* Main Content */}


      <div className="flex-1">
        <div className="p-8 lg:ml-[5%] lg:w-[90%] max-sm:w-full max-sm:p-3">
          <div className="bg-white p-6 rounded-lg shadow-sm">

            {/* Profile Header */}


            <div className="bg-[#ff6c00] px-6 py-8 text-center rounded-t-lg">
              <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                {user.avatar ? (
                  <img
                    src={user.avatar.url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#ff8c00] flex items-center justify-center">
                    <FiUser className="text-white text-5xl" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100">
                  <FiEdit className="text-[#ff6c00]" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
              <h1 className="mt-4 text-2xl font-bold text-white">
                {user.name}
              </h1>
              <p className="text-orange-100">{user.email}</p>
            </div>

            

            <div className="flex flex-col md:flex-row bg-white">


              {/* Sidebar Navigation */}
              <div className="w-full md:w-64 bg-gray-50 p-4 border-r">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`flex items-center w-full px-4 py-3 rounded-lg text-gray-700 hover:text-[#ff6c00] transition-all ${
                      activeTab === "profile"
                        ? "bg-orange-50 text-[#ff6c00]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <FiUser className="mr-3" />
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`flex items-center w-full px-4 py-3 rounded-lg text-gray-700 hover:text-[#ff6c00] transition-all ${
                      activeTab === "orders"
                        ? "bg-orange-50 text-[#ff6c00]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <FiShoppingBag className="mr-3" />
                    My Orders
                  </button>


                  <button
                    onClick={() => setActiveTab("payment")}
                    className={`flex items-center w-full px-4 py-3 rounded-lg text-gray-700 hover:text-[#ff6c00] transition-all ${
                      activeTab === "payment"
                        ? "bg-orange-50 text-[#ff6c00]"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <FiCreditCard className="mr-3" />
                    Payment Methods
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 mt-4 transition-all"
                  >
                    <FiLogOut className="mr-3" />
                    Logout
                  </button>
                </nav>
              </div>


              {/* Content */}
              <div className="flex-1 p-6">

                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-800">
                        Profile Information
                      </h2>
                      {!isEditing ? (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center text-[#ff6c00] hover:text-[#ff8c00]"
                        >
                          <FiEdit className="mr-2" /> Edit Profile
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsEditing(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          Cancel
                        </button>
                      )}
                    </div>

                    {isEditing ? (
                      <form  onSubmit={()=>handleUpdateProfile(user._id)}>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={user.name}
                              onChange={(e) =>
                                setUser({ ...user, name: e.target.value })
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#ff6c00] focus:border-[#ff6c00]"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              value={user.email}
                              disabled
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={user.phone}
                              onChange={(e) =>
                                setUser({ ...user, phone: e.target.value })
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#ff6c00] focus:border-[#ff6c00]"
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-[#ff6c00] text-white rounded-lg hover:bg-[#ff8c00] transition-all"
                        >
                          Save Changes
                        </button>
                      </form>
                    ) : (
                      <div className="space-y-4">
                        <div className="pb-4 border-b border-gray-200">
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="text-lg text-gray-800">{user.name}</p>
                        </div>
                        <div className="pb-4 border-b border-gray-200">
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="text-lg text-gray-800">{user.email}</p>
                        </div>
                        <div className="pb-4 border-b border-gray-200">
                          <p className="text-sm text-gray-500">Phone Number</p>
                          <p className="text-lg text-gray-800">
                            +213 {user.phone || "Not provided"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Orders Tab */}
                {activeTab === "orders" && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6">
                      My Orders
                    </h2>
                    {orders.length === 0 ? (
                      <div className="text-center py-12">
                        <FiShoppingBag className="mx-auto text-4xl text-gray-400 mb-4" />
                        <p className="text-gray-500">
                          You haven't placed any orders yet
                        </p>
                        <button
                          onClick={() => navigate("/products")}
                          className="mt-4 px-6 py-2 bg-[#ff6c00] text-white rounded-lg hover:bg-[#ff8c00] transition-all"
                        >
                          Start Shopping
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div
                            key={order._id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-all"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <p className="font-medium text-gray-800">
                                  Order #{order._id.substring(0, 8)}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {new Date(
                                    order.createdAt
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              <span
                                className={`px-3 py-1 rounded-full text-xs ${
                                  order.status === "delivered"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "shipped"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {order.status}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 mb-4">
                              {order.products.slice(0, 3).map((item) => (
                                <img
                                  key={item._id}
                                  src={item.product.image[0].url}
                                  
                                  alt={item.product.name}
                                  className="w-16 h-16 object-cover rounded border border-gray-200"
                                />
                              ))}
                              {order.products.length > 3 && (
                                <div className="w-16 h-16 bg-gray-50 rounded border border-gray-200 flex items-center justify-center text-gray-500">
                                  +{order.products.length - 3}
                                </div>
                              )}
                            </div>
                            <div className="flex justify-between items-center">
                              <button
                                onClick={() => navigate(`/orders/${order._id}`)}
                                className="text-[#ff6c00] hover:text-[#ff8c00] text-sm font-medium transition-all"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
