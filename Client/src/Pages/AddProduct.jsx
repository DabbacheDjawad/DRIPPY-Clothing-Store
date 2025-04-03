import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../Components/Button";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaShoppingCart } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { CiUser } from "react-icons/ci";
import { ImProfile } from "react-icons/im";
import { MdDashboard } from "react-icons/md";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [availableSizes, setAvailableSizes] = useState([]);
  const [available, setAvailable] = useState(true);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sizeOptions = ["S", "M", "L", "XL", "XXL", "XXXL"];

  const handleSizeChange = (size) => {
    setAvailableSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };



  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    
    // Validate total number of images (max 10)
    if (images.length + newFiles.length > 10) {
      alert("Maximum 10 images allowed");
      return;
    }
  
    // Combine existing images with new ones
    const updatedImages = [...images, ...newFiles];
    setImages(updatedImages);
    
    // Create previews for new files only
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
    
    // Reset file input to allow selecting the same files again
    e.target.value = null;
  };

  const removeImage = (index) => {
    // Clean up the object URL
    URL.revokeObjectURL(imagePreviews[index]);
    
    // Remove the image and preview
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Append product details
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    availableSizes.forEach((size)=>{
      formData.append("availableSizes" , size);
    })
    formData.append("available", available);
    
    // Append each image
    images.forEach((image, index) => {
      formData.append(`image`, image);
    });

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/products",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Product added successfully!");
      
      // Reset form after successful submission
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setAvailableSizes([]);
      setAvailable(true);
      setImages([]);
      setImagePreviews([]);
    } catch (error) {
      console.error(error);
      alert("Error adding product. Please try again.");
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
   
   
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`fixed top-7 text-orange-400 left-10 p-2 z-50 bg-white rounded-lg 
            shadow-[0_15px_30px_-5px_rgba(151,65,252,0.2)] max-sm:top-0 max-sm:left-0 ${
            isSidebarOpen ? "translate-x-[250px]" : ""
          } transition-all duration-300 hover:scale-105`}
        >
          <RxHamburgerMenu size={24} />
        </button>

        {/* Form Container */}
        <div className="p-8 lg:ml-[5%] w-[90%] mt-10 max-sm:w-full">
          <div className="bg-white p-8 rounded-lg shadow-[0_15px_30px_-5px_rgba(151,65,252,0.1)] max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>
            
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
              

              <div className="flex gap-4 max-sm:flex-col w-full">
                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                    type="text"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-1 outline-gray-300  focus:border-transparent transition-all"
                    />
                </div>

                <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-1 outline-gray-300 focus:border-transparent transition-all"
                    />
                </div>
              </div>
              
              

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows="4"
                  className="w-full border border-gray-400 rounded-lg px-4 py-2 outline-1 outline-gray-300 focus:border-transparent transition-all"
                ></textarea>
              </div>

             
             
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-1 outline-gray-300 focus:border-transparent transition-all"
                >
                  <option value="">Select Category</option>
                  <option value="shirts">Shirts</option>
                  <option value="shoes">Shoes</option>
                  <option value="pants">Jeans</option>
                  <option value="jackets">Jackets</option>
                </select>
              </div>

         
         
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

             
             
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={available}
                  onChange={() => setAvailable(!available)}
                  className="h-4 w-4 text-[#ff6c00] focus:ring-[#ff6c00] border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">Available in Stock</label>
              </div>

              

              <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Product Images ({images.length}/10 max)
  </label>
  <input
    type="file"
    onChange={handleImageChange}
    multiple
    accept="image/*"
    className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:text-sm file:font-semibold
              file:text-[#ff6c00] file:bg-white
              hover:file:text-[#e65a00] file:border-1 file:border-[#ff6c00]"
  />

  {/* Image Previews with Removal */}
  {imagePreviews.length > 0 && (
    <div className="mt-4">
      <div className="flex flex-wrap gap-3">
        {imagePreviews.map((preview, index) => (
          <div key={index} className="relative group">
            <img
              src={preview}
              alt={`Preview ${index + 1}`}
              className="h-24 w-24 object-cover rounded-lg border border-gray-200"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        {images.length} image(s) selected. Click images to remove.
      </p>
    </div>
  )}
</div>

     
     
              <div className="pt-4">
                <Button type="submit">Add Product</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;