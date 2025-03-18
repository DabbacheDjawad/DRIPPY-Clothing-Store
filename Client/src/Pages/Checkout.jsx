import { Link } from "react-router-dom";
import wilayas from "../Wilayas";
import { useCart } from "../Context/CartContext";
import Button from "../Components/Button";

const Checkout = () => {
  const shipping = 700;
  const { cart } = useCart();

  function calculateTotal() {
    return cart.reduce((total, element) => {
      return total + Number(element.price.split(" ")[0]) * element.quantity;
    }, 0);
  }

  const total = calculateTotal();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-20 mt-15">
      <div className="bg-white p-8 rounded-lg shadow-[0_15px_30px_-5px_rgba(151,65,252,0.2)] w-full max-w-6xl">
        <div className="flex gap-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-[#ff6c00] transition-all">
            Home &gt;
          </Link>
          <Link to="/Cart" className="hover:text-[#ff6c00] transition-all">
            Shopping Cart &gt;
          </Link>
          <span>Checkout</span>
        </div>

        {/* Checkout Container */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Billing & Shipping Form */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-bold text-center mb-6">BILLING & SHIPPING</h2>

            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Full Name (optional)</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                 focus:outline-none focus:ring-[#ff6c00] focus:border-[#ff6c00] transition-all"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                 focus:outline-none focus:ring-[#ff6c00] focus:border-[#ff6c00] transition-all"
              />
            </div>

            {/* Wilaya */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Wilaya</label>
              <select
                name="wilaya"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                 focus:outline-none focus:ring-[#ff6c00] focus:border-[#ff6c00] transition-all"
              >
                {wilayas.map((wilaya, index) => (
                  <option key={index} value={wilaya}>
                    {wilaya.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                 focus:outline-none focus:ring-[#ff6c00] focus:border-[#ff6c00] transition-all"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email (Optional)</label>
              <input
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md
                 shadow-sm focus:outline-none focus:ring-[#ff6c00] focus:border-[#ff6c00] transition-all"
              />
            </div>

            {/* Additional Info */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                ADDITIONAL INFO (Optional)
              </label>
              <textarea
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md
                 shadow-sm focus:outline-none focus:ring-[#ff6c00] focus:border-[#ff6c00] transition-all"
              />
            </div>
          </div>


          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl font-bold text-center mb-6">Purchases</h2>

            {cart.length === 0 ? (
              <p className="text-center text-gray-600">No Purchases Until Now</p>
            ) : (
              <div className="space-y-6">
                {cart.map((product, index) => (
                  <div key={index} className="flex gap-4 border-b border-gray-200 pb-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex flex-col justify-center">
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-gray-600">Size: {product.size}</p>
                      <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                      <p className="text-green-500 font-semibold">{product.price}</p>
                    </div>
                  </div>
                ))}

                {/* Charges */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p className="font-semibold">SubTotal</p>
                    <span className="text-green-500 font-semibold">{`${total} DZD`}</span>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold">Shipping</p>
                    <span className="text-green-500 font-semibold">{`${shipping} DZD`}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-4">
                    <p className="font-semibold">Total</p>
                    <span className="text-green-500 font-semibold">{`${total + shipping} DZD`}</span>
                  </div>
                </div>


                <Button className="w-full bg-[#ff6c00] text-white hover:bg-[#e65a00] transition-all
                 duration-300 mt-6">
                  PLACE ORDER
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;