import { useState } from "react";
import { useCart } from "../Context/CartContext";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

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
      return total + Number(element.price.split(" ")[0]) * itemQuantity;
    }, 0);
  }

  const totalPrice = calculateTotal();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-20 mt-15">
      <div className="bg-white p-8 rounded-lg shadow-[0_15px_30px_-5px_rgba(151,65,252,0.2)] w-full max-w-6xl">
        <h1 className="text-2xl font-bold text-center mb-6">Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center my-10 text-red-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center border border-gray-200 p-4 rounded-lg transition-all hover:shadow-md"
              >
                {/* Product Image */}
                <div className="w-full md:w-1/6 mb-4 md:mb-0">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-auto rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="w-full md:w-4/6 md:ml-6">
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <p className="text-[#ff6c00]">Quantity:</p>
                      <input
                        type="number"
                        min="1"
                        defaultValue={item.quantity}
                        onChange={(e) => handleQuantity(e, index)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-[#ff6c00] focus:border-[#ff6c00] transition-all"
                      />
                    </div>

                    {/* Size */}
                    <p className="text-[#ff6c00]">Size: {item.size}</p>

                    {/* Price */}
                    <p className="text-green-500">Price: {item.price}</p>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeProduct(index)}
                      className="text-red-600 hover:text-red-800 transition-all flex items-center justify-center"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-col md:flex-row items-center justify-between mt-10">
              <h1 className="text-xl text-green-500">
                {cart.length === 0 || totalPrice <= 0
                  ? ""
                  : `Total: ${totalPrice} DZD`}
              </h1>
              <Button className="bg-[#ff6c00] text-white hover:bg-[#e65a00] transition-all">
                <Link to={"/Checkout"}>Go to Checkout</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;