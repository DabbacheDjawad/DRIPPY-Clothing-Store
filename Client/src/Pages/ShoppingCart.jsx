import { useState } from "react";
import { useCart } from "../Context/CartContext";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
import { FaTrash, FaArrowLeft } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";

const ShoppingCart = () => {
  const { cart, setCart } = useCart();
  const [quantities, setQuantities] = useState({});

  function handleQuantity(e, index) {
    const newQuantity = Number(e.target.value);
    setQuantities((prev) => ({
      ...prev,
      [index]: newQuantity,
    }));
  }

  function removeProduct(ProductToRemoveIndex) {
    setCart(cart.filter((_, index) => index !== ProductToRemoveIndex));
  }

  function calculateTotal() {
    return cart.reduce((total, element, index) => {
      const itemQuantity = quantities[index] ?? element.quantity;
      return total + element.price * itemQuantity;
    }, 0);
  }

  const totalPrice = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-40">
      <div className="max-w-7xl mx-auto">
        {/* Header and Continue Shopping */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/" 
            className="flex items-center text-[#ff6c00] hover:text-[#e65a00] transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Your Shopping Cart</h1>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <FiShoppingBag className="mx-auto text-4xl text-gray-400 mb-4" />
            <h2 className="text-2xl font-medium text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Start shopping to add items to your cart</p>
            <Button className="bg-[#ff6c00] hover:bg-[#e65a00] text-white px-6 py-3">
              <Link to="/">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Product Image */}
                    <div className="w-full sm:w-1/4 p-4">
                      <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={item.image[0].url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="w-full sm:w-3/4 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-1">{item.name}</h3>
                          <p className="text-gray-500 mb-4">Size: {item.size}</p>
                        </div>
                        <button
                          onClick={() => removeProduct(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2"
                          aria-label="Remove item"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center">
                          <label htmlFor={`quantity-${index}`} className="sr-only">Quantity</label>
                          <input
                            id={`quantity-${index}`}
                            type="number"
                            min="1"
                            defaultValue={item.quantity}
                            onChange={(e) => handleQuantity(e, index)}
                            className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-[#ff6c00] focus:border-[#ff6c00] transition-all"
                          />
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-lg font-semibold text-[#ff6c00]">
                            {item.price} DZD
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{totalPrice} DZD</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t">
                    <span className="text-lg font-bold text-gray-800">Total</span>
                    <span className="text-lg font-bold text-[#ff6c00]">{totalPrice} DZD</span>
                  </div>
                </div>

                <Button className="w-full bg-[#ff6c00] hover:bg-[#e65a00] text-white py-3 text-lg">
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>

                <p className="text-sm text-gray-500 mt-4 text-center">
                  Free shipping and returns
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;