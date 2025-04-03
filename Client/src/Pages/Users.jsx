import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Components/Button";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { CiUser } from "react-icons/ci";
import { ImProfile } from "react-icons/im";
import { FiUserX, FiUserCheck, FiTrash2 } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

const Users = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [response , setResponse] = useState("")

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/users", 
          { headers: { Authorization: `Bearer ${token}` } });
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
      await axios.patch(`http://localhost:3000/api/v1/users/block/${userId}`, 
        {}, 
        { headers: { Authorization: `Bearer ${token}` } });
      
      setUsers(users.map(user => 
        user._id === userId ? { ...user, isBlocked: !user.isBlocked } : user
      ));
    } catch (err) {
      console.log(err);
    }
  };


  async function handleRemoveUser(id){
    try{
        await axios.delete(`http://localhost:3000/api/v1/users/${id}`,{headers: { Authorization: `Bearer ${token}` }})
        setUsers(users.filter(user => user._id !== id));
    }catch(error){
        console.log(error);
    }
  }



  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100 mt-40 max-md:overflow-x-hidden">


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
                  <span className="flex gap-5 items-center"><p className="w-[30%]">Products</p> <GiClothes size={20}/></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/orders"
                  className="block text-gray-700 hover:text-[#ff6c00] transition-all"
                >
                  <span className="flex gap-5 items-center"><p className="w-[30%]">orders</p> <FaShoppingCart size={20}/></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/users"
                  className="block text-gray-700 hover:text-[#ff6c00] transition-all"
                >
                  <span className="flex gap-5 items-center"><p className="w-[30%]">Users</p> <CiUser size={20}/></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/profile"
                  className="block text-gray-700 hover:text-[#ff6c00] transition-all"
                >
                  <span className="flex gap-5 items-center"><p className="w-[30%]">Profile</p><ImProfile size={20}/></span>
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
          className={`fixed top-4 left-4 p-2 z-50 hover:text-orange-500 transition-all duration-200 bg-white rounded-lg shadow-lg ${
            isSidebarOpen ? "translate-x-[250px]" : ""
          }`}
        >
          <RxHamburgerMenu size={24} />
        </button>

        {/* Dashboard Content */}
        <div className="py-8 lg:ml-[5%] lg:w-[90%] max-sm:w-full max-sm:p-3">
          <div className="flex justify-between items-center mb-6 max-sm:flex-col max-sm:items-start max-sm:gap-3">
            <h1 className="text-2xl font-bold max-sm:text-xl ml-3">User Management</h1>
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

          
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm overflow-x-auto">
              <div className="min-w-[600px] max-sm:min-w-full">
                <div className="grid grid-cols-8 gap-4 text-sm font-bold border-b pb-3 max-sm:text-sm max-sm:grid-cols-6">
                  <div className="max-sm:hidden">User ID</div>
                  <div>Name</div>
                  <div className="col-span-2 max-sm:col-span-3">Email</div>
                  <div>Role</div>
                  <div>Status</div>
                  <div className="max-sm:hidden">Block</div>
                  <div className="max-sm:hidden">Remove</div>
                </div>

                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div key={user._id} className="grid grid-cols-8 gap-4 py-5 border-b border-gray-200
                     items-center text-sm max-sm:text-sm max-sm:grid-cols-6">
                      <div className="truncate max-sm:hidden">#{user._id.slice(-6)}</div>
                      <div className="truncate">{user.name}</div>
                      <div className="col-span-2 max-sm:col-span-3 break-all text-sm max-sm:text-[14px]">
                        {user.email}
                      </div>
                      <div className="capitalize">{user.role}</div>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          user.isBlocked ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                        }`}>
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
                              <FiUserCheck /> <span className="max-sm:hidden">Unblock</span>
                            </>
                          ) : (
                            <>
                              <FiUserX /> <span className="max-sm:hidden">Block</span>
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
                          <FiTrash2 /> <span className="max-sm:hidden">Remove</span>
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