import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useEffect } from "react";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    available: false,
    image: [],
    availableSizes: [],
  });
  const { addToCart } = useCart();
  const swiperRef = useRef(null);
  let [quantity, setQuantity] = useState(1);
  let [prSize, setSize] = useState("S");

  useEffect(() => {
    async function fetchProduct() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://drippy-clothing-store.onrender.com/api/v1/products/${id}`
        );
        setProduct(response.data.product);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  function handleQuantity(e) {
    setQuantity(Number(e.target.value));
  }

  function handleSize(e) {
    setSize(e.target.value);
  }

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current?.navigation?.update();
    }
  }, [id]);

  function handleAddToCart() {
    addToCart(product, quantity, prSize);
    if (quantity > 0) {
      alert(`${product.name} Added to Cart Successfully!!`);
    } else {
      alert(`Cannot enter negative or null quantity`);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block h-12 w-12 border-4 border-[#ff6c00] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-20 mt-30">
      <div className="bg-white p-8 rounded-lg shadow-[0_15px_30px_-5px_rgba(151,65,252,0.2)] w-full max-w-6xl">
        {/* Breadcrumb Navigation */}
        <div className="flex gap-2 text-sm text-gray-600 mb-6">
          <p>
            <Link to="/" className="hover:text-[#ff6c00] transition-all">
              Home &gt;
            </Link>
          </p>
          <p>
            <Link to="/" className="hover:text-[#ff6c00] transition-all">
              Products &gt;
            </Link>
          </p>
          <p className="font-semibold">{product.name}</p>
        </div>

        {/* Product Details */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              className="w-full"
            >
              {product.image.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img.url}
                    alt={product.name}
                    className="max-md:w-full max-md:ml-0 max-lg:w-[60%] max-lg:ml-[10%] rounded-lg border border-gray-200"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product Information */}
          <div className="lg:w-1/2">
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="space-y-4">
              <p className="text-lg">
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Available Sizes:</span>{" "}
                {product.availableSizes.join(", ")}
              </p>
              <p
                className={`text-lg ${
                  product.available ? "text-green-500" : "text-red-600"
                }`}
              >
                {product.available ? "Available in Stock" : "Sold Out"}
              </p>
              <p className="text-green-500 text-lg font-semibold">
                {product.price}
              </p>
            </div>

            {/* Size and Quantity Selection */}
            <div className="mt-6 space-y-6">
              <div>
                <label
                  htmlFor="sizes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Size
                </label>
                <select
                  id="sizes"
                  onChange={handleSize}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff6c00] focus:border-[#ff6c00] transition-all"
                >
                  {product.availableSizes.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  defaultValue={quantity}
                  onChange={handleQuantity}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff6c00] focus:border-[#ff6c00] transition-all"
                />
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-8">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-[#ff6c00] text-white hover:bg-[#e65a00] transition-all"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
