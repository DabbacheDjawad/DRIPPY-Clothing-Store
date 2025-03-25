import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../Components/Button";
import { RxHamburgerMenu } from "react-icons/rx";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [availableSizes, setAvailableSizes] = useState([]);
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sizeOptions = ["S", "M", "L", "XL", "XXL", "XXXL"];

  const handleSizeChange = (size) => {
    setAvailableSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("availableSizes", "XL"); // Convert to JSON
    formData.append("available", available);
    formData.append("image", image); // Cloudinary will process this file

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/products",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Product added successfully!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 mt-20">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 z-50 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/admin/products"
                  className="block text-gray-700 hover:text-[#ff6c00] transition-all"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/orders"
                  className="block text-gray-700 hover:text-[#ff6c00] transition-all"
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/users"
                  className="block text-gray-700 hover:text-[#ff6c00] transition-all"
                >
                  Users
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/profile"
                  className="block text-gray-700 hover:text-[#ff6c00] transition-all"
                >
                  Profile
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
          className={`fixed top-7 text-orange-400 left-10 p-2 z-50 bg-white rounded-lg shadow-[0_15px_30px_-5px_rgba(151,65,252,0.2)] ${
            isSidebarOpen ? "translate-x-[250px]" : ""
          } transition-all duration-300 hover:scale-105`}
        >
          <RxHamburgerMenu size={24} />
        </button>

        {/* Form Container */}
        <div className="p-8 lg:ml-[5%] w-[90%] mt-10">
          <div className="bg-white p-8 rounded-lg shadow-[0_15px_30px_-5px_rgba(151,65,252,0.1)] max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>
            
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
              
              <div className="flex gap-4 max-sm:flex-col w-full">
                {/* Name */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                    type="text"
                    placeholder="Enter product name"
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6c00] focus:border-transparent transition-all"
                    />
                </div>

                {/* Price */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                    type="number"
                    placeholder="Enter price"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6c00] focus:border-transparent transition-all"
                    />
                </div>
              </div>
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  placeholder="Enter product description"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6c00] focus:border-transparent transition-all"
                ></textarea>
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff6c00] focus:border-transparent transition-all"
                >
                  <option value="">Select Category</option>
                  <option value="shirts">T-Shirts</option>
                  <option value="shoes">Shoes</option>
                  <option value="pants">Jeans</option>
                  <option value="jackets">Jackets</option>
                </select>
              </div>

              {/* Available Sizes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes</label>
                <div className="flex flex-wrap gap-3">
                  {sizeOptions.map((size) => (
                    <label key={size} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        value={size}
                        onChange={() => handleSizeChange(size)}
                        checked={availableSizes.includes(size)}
                        className="h-4 w-4 text-[#ff6c00] focus:ring-[#ff6c00] border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={available}
                  onChange={() => setAvailable(!available)}
                  className="h-4 w-4 text-[#ff6c00] focus:ring-[#ff6c00] border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">Available in Stock</label>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-[#ff6c00] file:text-white
                      hover:file:bg-[#e65a00] transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-[#ff6c00] text-white hover:bg-[#e65a00] transition-all"
                >
                  Add Product
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;