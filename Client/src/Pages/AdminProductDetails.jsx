import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "../Components/SideBar";
import Button from "../Components/Button";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const AdminProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const[currentImage , setCurrentImage] = useState("")
  

  // Form state for editing
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    availableSizes: [],
    available: true,
  });

  const sizeOptions = ["S", "M", "L", "XL", "XXL", "XXXL"];

  // Fetch product details
  useEffect(() => {
      const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://drippy-clothing-store.onrender.com/api/v1/products/${id}`
        );
        setProduct(response.data.product);
            
        setFormData({
          name: response.data.product.name,
          price: response.data.product.price,
          description: response.data.product.description,
          category: response.data.product.category,
          availableSizes: response.data.product.availableSizes || [],
          available: response.data.product.available,
        });
        setCurrentImage(response.data.product.image[0].url);
      } catch (err) {
        console.log(err);
        
      }
    };

    fetchProduct();
  }, []);


  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle size selection
  const handleSizeChange = (size) => {
    setFormData((prev) => ({
      ...prev,
      availableSizes: prev.availableSizes.includes(size)
        ? prev.availableSizes.filter((s) => s !== size)
        : [...prev.availableSizes, size],
    }));
  };

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `https://drippy-clothing-store.onrender.com/api/v1/products/${id}`,
        formData
      );
      setProduct(response.data.product);
      setIsEditing(false);
      alert(`${product.name} Updated Successfully`)
    } catch (err) {
        console.log(err);
        
    }
  };

  // Delete product
  const handleDelete = async () => {
    try {
      await axios.delete(`https://drippy-clothing-store.onrender.com/api/v1/products/${id}`);
      navigate("/admin/products");
    } catch (err) {
      console.log(err); 
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 mt-40">
      {/* Sidebar (same as your other pages) */}
      <SideBar />

        {/* Main Content */}
        <div className="py-8 lg:ml-[2.5%] lg:w-[95%] max-sm:w-full max-sm:p-3">
        <div className="p-8 max-sm:w-full max-sm:p-3">
          {/* Header with actions */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl max-sm:text-xl font-bold text-gray-800">
              Product Details
            </h1>
            <div className="flex gap-3 max-sm:text-sm">
              <Button onClick={() => setIsEditing(!isEditing)}>
                <span className="flex items-center gap-2">
                  {isEditing ? "Cancel" : "Edit"} <FiEdit />
                </span>
              </Button>
              <Button>
                <span className="flex items-center gap-2" onClick={handleDelete}>
                  Delete <FiTrash2 />
                </span>
              </Button>
            </div>
          </div>

          {/* Product Details Card */}
          <div className="bg-white p-8 rounded-lg shadow-[0_15px_30px_-5px_rgba(151,65,252,0.1)]">
            {isEditing ? (
              // Edit Form
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="flex gap-4 max-sm:flex-col w-full">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-1 outline-gray-300 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-1 outline-gray-300 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full border border-gray-400 rounded-lg px-4 py-2 outline-1 outline-gray-300 focus:border-transparent transition-all"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-1 outline-gray-300 focus:border-transparent transition-all"
                  >
                    <option value="">Select Category</option>
                    <option value="shirts">T-Shirts</option>
                    <option value="shoes">Shoes</option>
                    <option value="pants">Jeans</option>
                    <option value="jackets">Jackets</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Sizes
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {sizeOptions.map((size) => (
                      <label key={size} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.availableSizes.includes(size)}
                          onChange={() => handleSizeChange(size)}
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
                    name="available"
                    checked={formData.available}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#ff6c00] focus:ring-[#ff6c00] border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Available in Stock
                  </label>
                </div>

                <div className="pt-4">
                  <Button type="submit">Update Product</Button>
                </div>
              </form>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">


                {/* Image Gallery */}
                <div>
                  <div className="mb-4 h-96 bg-gray-100 rounded-lg overflow-hidden">
                    {product.image?.length > 0 ? (
                      <img
                        src={currentImage}
                        alt={product.name}
                        className="w-4/5 h-[98%] ml-[10%]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No image available
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 overflow-x-auto py-2">
                    {product.image?.map((img, index) => (
                      <div key={index} className="flex-shrink-0 w-16 h-16">
                        <img
                          src={img.url}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover rounded border border-gray-200 cursor-pointer"
                          onClick={()=>setCurrentImage(img.url)}
                        />
                      </div>
                    ))}
                  </div>
                </div>


                {/* Product Info */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-[#ff6c00] font-bold text-xl mb-4">
                    {product.price} DZD
                  </p>

                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700">
                      Description
                    </h3>
                    <p className="text-gray-600 mt-1">{product.description}</p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700">
                      Category
                    </h3>
                    <p className="text-gray-600 mt-1 capitalize">
                      {product.category}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700">
                      Available Sizes
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {product.availableSizes?.length > 0 ? (
                        product.availableSizes.map((size) => (
                          <span
                            key={size}
                            className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm"
                          >
                            {size}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">
                          No sizes specified
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.available
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.available ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetails;
