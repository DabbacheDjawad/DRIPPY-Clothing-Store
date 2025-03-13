import { useState } from "react";
import { useCart } from "../Context/CartContext";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
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
    <div className="mt-40 sm:text-xl md:text-xl">
      <div className="text-center">
        <h1>Shopping Cart</h1>
      </div>

      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div
              key={index}
              className="border border-gray-400 p-3 my-2 rounded-lg mb-10 max-sm:w-[90%] max-sm:ml-[5%] flex flex-col
              md:flex-row md:items-center w-[90%] ml-[5%]"
            >
              {/* Image */}
              <div>
                <img src={item.images[0]} alt={item.name} className="sm:w-[600px] md:w-[100px] m-auto" />
              </div>

              {/* Details */}
              <div className="flex ml-5 mt-10 md:mt-0 md:py-5 md:w-3/4">
                <div className="flex flex-col md:flex-row md:gap-5 md:justify-center md:w-full">
                  <h3>{item.name}</h3>

                  <div className="flex gap-10">
                    <p className="text-orange-500">
                      {`Quantity: ${quantities[index] ?? item.quantity}`}
                    </p>
                    {/* Readjust Quantity */}
                    <input
                      type="number"
                      min="1"
                      defaultValue={item.quantity}
                      onChange={(e) => handleQuantity(e, index)}
                      className="w-20 outline-none border border-gray-300 rounded"
                    />
                  </div>

                  <p className="text-orange-500">{`Size: ${item.size}`}</p>
                  <p className="text-green-500">{`Price: ${item.price}`}</p>
                </div>
              </div>

              {/* Remove Item */}
              <div className="m-auto md:m-0">
                <button
                  className="px-5 md:px-1 md:text-lg py-1 rounded-lg border
              hover:bg-gradient-to-b from-[#ff0000] via-[#c41010] to-[#d92929]
              transition-all duration-100 hover:scale-110 hover:text-white text-red-600 border-red-600"
                  onClick={() => removeProduct(index)}
                >
                  Remove item
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-center gap-5">
        <h1 className="text-xl text-green-500">{cart.length === 0 || totalPrice <= 0 ? "" : `Total: ${totalPrice} DZD`}</h1>
        <Button className="text-green-500 border-green-500 hover:!bg-none hover:bg-green-500 hover:text-white">
          <Link to={"/Checkout"}>Go to Checkout</Link>
          </Button>
      </div>
    </div>
  );
};

export default ShoppingCart;