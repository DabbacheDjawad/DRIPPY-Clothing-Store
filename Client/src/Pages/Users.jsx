import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FiUserX,
  FiUserCheck,
  FiTrash2,
  FiUserPlus,
  FiUserMinus,
} from "react-icons/fi";
import SideBar from "../Components/SideBar";

const Users = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("https://drippy-clothing-store.onrender.com/api/v1/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data.users);
        setResponse("");
      } catch (err) {
        setResponse(err.response.data.message);
      }
    }
    fetchUsers();
  }, [token]);

  const handleBlockUser = async (userId) => {
    try {
      await axios.patch(
        `https://drippy-clothing-store.onrender.com/api/v1/users/block/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isBlocked: !user.isBlocked } : user
        )
      );
    } catch (err) {
      setResponse(err.response.data.message);
    }
  };

  async function handleRemoveUser(id) {
    try {
      await axios.delete(`https://drippy-clothing-store.onrender.com/api/v1/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      setResponse(error.response.data.message);
    }
  }

  async function handleAdminSwitch(id) {
    try {
      const response = await axios.patch(`https://drippy-clothing-store.onrender.com/api/v1/users/switch/${id}`, {} , {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response.data.user);
      
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user , role : response.data.user.role } : user
        )
      );
    } catch (error) {
      setResponse(error.response.data.message);
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100 mt-40 max-md:overflow-x-hidden">
      
       {/* Side */}
          <SideBar />
        {/* Main Content */}
        <div className="py-8 lg:ml-[2.5%] lg:w-[95%] max-sm:w-full max-sm:p-3">
        <div className="p-8 max-sm:w-full max-sm:p-3">
          <div className="flex justify-between items-center mb-6 max-sm:flex-col max-sm:items-start max-sm:gap-3">
            <h1 className="text-2xl font-bold max-sm:text-xl ml-3">
              User Management
            </h1>
            <div className="flex gap-3 max-sm:w-full">
              <input
                type="text"
                placeholder="Search users..."
                className="px-4 py-2 border rounded-lg focus:outline-none max-sm:w-full mr-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm overflow-x-hidden">
            <div className="min-w-[600px] max-sm:min-w-full">
              <div className="grid lg:grid-cols-9 md:grid-cols-8 gap-4 text-sm font-bold border-b pb-3 max-sm:text-sm max-sm:grid-cols-7 max-md:grid-cols-5">
                <div className="max-sm:hidden">User ID</div>
                <div>Name</div>
                <div className="col-span-2 max-sm:col-span-3 max-sm:ml-[30%]">
                  Email
                </div>
                <div className="max-sm:ml-[100%]">Role</div>
                <div className="max-sm:ml-[100%] max-md:hidden">Status</div>
                <div className="max-sm:hidden max-md:hidden">Block</div>
                <div className="max-sm:hidden max-md:hidden">Remove</div>
                <div className="max-sm:hidden max-md:hidden md:hidden lg:block">
                  make admin
                </div>
              </div>

              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className="grid lg:grid-cols-9 gap-4 py-5 border-b md:grid-cols-8 
                    border-gray-200 items-center text-sm max-sm:text-sm max-sm:grid-cols-6 max-md:grid-cols-5"
                  >
                    <div className="truncate max-sm:hidden">
                      #{user._id.slice(-6)}
                    </div>
                    <div className="truncate">{user.name}</div>
                    <div className="col-span-2 max-sm:col-span-3 break-all text-sm max-sm:text-[14px]">
                      {user.email}
                    </div>
                    <div className="capitalize">{user.role}</div>
                    <div>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          user.isBlocked
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </div>
                    <div>
                      <button
                        onClick={() => handleBlockUser(user._id)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
                          user.isBlocked
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        {user.isBlocked ? (
                          <>
                            <FiUserCheck />{" "}
                            <span className="max-sm:hidden">Unblock</span>
                          </>
                        ) : (
                          <>
                            <FiUserX />{" "}
                            <span className="max-sm:hidden">Block</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => handleRemoveUser(user._id)}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm
                           bg-red-100 text-red-800 hover:bg-red-200"
                      >
                        <FiTrash2 />{" "}
                        <span className="max-sm:hidden">Remove</span>
                      </button>
                    </div>

                    <div>
                      <button
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm max-sm:w-fit 
                        ${user.role ==="client"?"bg-blue-100 text-blue-800 hover:bg-blue-200":
                          "bg-purple-100 text-purple-700 hover:bg-purple-200"} w-31 ${
                           user.isBlocked ? "hidden" : ""} `}
                          onClick={()=>handleAdminSwitch(user._id)}
                      >
                        {user.role === "client" ? (
                          <div
                            className={`${
                              user.role !== "client" ? "hidden" : ""
                            } flex items-center`}
                          >
                            <FiUserPlus />
                            <span className={`max-sm:hidden`}>Make Admin</span>
                          </div>
                        ) : (
                          <div
                            className={`${
                              user.role === "client" ? "hidden" : ""
                            } flex`}
                          >
                            <FiUserMinus />
                            <span className={`max-sm:hidden`}>Make client</span>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-gray-500">
                  No users found matching your search
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
