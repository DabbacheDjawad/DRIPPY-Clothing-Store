import { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import Button from "../Components/Button";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import SideBar from "../Components/SideBar";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  
  //filter
  const [categoryFilter , setCategoryFilter] = useState("all");
  const [priceFilter , setPriceFilter] = useState("all");
  const [search , setSearch] = useState("");

  //handlers
  function handleCategoryFilter(e){
    setCategoryFilter(e.target.value);
  }

  function handlePriceFilter(e){
    setPriceFilter(e.target.value);
  }

  function handleSearch(e){
    setSearch(e.target.value);
  }


  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://drippy-clothing-store.onrender.com/api/v1/products");
        setProducts(response.data.products);  
      } catch (err) {
        if(err.status === 404) setError("error while fetching products");
        else setError(err.msg)
      }
    };

    fetchProducts();
  }, []);

  //filter function
  const filteredProducts = products.filter((product)=>{
    const category = categoryFilter === "all" || product.category ===  categoryFilter;

    let price = true;
    if (priceFilter === "under-3000") {
      price = product.price < 3000;
    } else if (priceFilter === "3000-9000") {
      price = product.price >= 3000 && product.price <= 9000;
    } else if (priceFilter === "over-9000") {
      price = product.price > 9000;
    }

    const searching = product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());

    return category && price && searching;
  })

  return (
    <div className="flex min-h-screen bg-gray-100 mt-40 w-[95%]">
      <div className="flex-1 group-hover:ml-64 transition-all duration-300">
        <SideBar></SideBar>
        {/* Page Content */}
        <div className="p-8 md:ml-26 max-sm:w-full max-sm:p-3">
          <div className="flex justify-between items-center mb-8 max-sm:flex-col max-sm:gap-3">
            <h1 className="text-3xl font-bold text-gray-800">Products</h1>
            
              <Link to="/admin/products/add">
                <Button>
                  <span className="flex gap-2 items-center">Add New Product<FaPlus /></span>
                </Button>
              </Link>
          </div>


          {/* Filter and Search Section */}

          <div className="bg-white p-6 rounded-lg shadow-[0_15px_30px_-5px_rgba(151,65,252,0.1)] mb-8">
            <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                
                {/* Category Filter */}
                <div className="w-full sm:w-48">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                   className="w-full border border-gray-300 rounded-lg px-3 py-2
                    focus:outline-none focus:ring-2 focus:ring-[#ff6c00] focus:border-transparent transition-all"
                    onChange={handleCategoryFilter}>
                    <option value="all">All</option>
                    <option value="shirts">Shirts</option>
                    <option value="jackets">Jackets</option>
                    <option value="pants">Pants</option>
                    <option value="shoes">Shoes</option>
                
                
                    {/* Categories would be populated dynamically */}
                  </select>
                </div>
                
                {/* Price Filter */}
                <div className="w-full sm:w-48">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none
                   focus:ring-2 focus:ring-[#ff6c00] focus:border-transparent transition-all"
                   onChange={handlePriceFilter}>
                  <option value="all">All Prices</option>
                  <option value="under-3000">Under 3000 DZD</option>
                  <option value="3000-9000">3000-9000 DZD</option>
                  <option value="over-9000">Over 9000 DZD</option>
                  </select>
                </div>
              </div>
              
              {/* Search Bar */}
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2
                   focus:ring-[#ff6c00] focus:border-transparent transition-all"
                   onChange={handleSearch}/>
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link to={`/admin/products/${product._id}`}>
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-[0_15px_30px_-5px_rgba(151,65,252,0.1)] overflow-hidden hover:shadow-[0_15px_30px_-5px_rgba(151,65,252,0.2)] transition-all duration-300 hover:-translate-y-1"
              >
                {/* Product Image */}
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <img
                    src={product.image[0].url}
                    alt={product.name}
                    className="h-full w-2/3 object-center"
                  />
                </div>
                
                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#ff6c00] font-bold">{product.price}  DZD</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {product.available ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>
              </Link>
            ))}

            <p className="text-red-600 text-xl text-center font-bold w-full">{error?`${error}`:""}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;