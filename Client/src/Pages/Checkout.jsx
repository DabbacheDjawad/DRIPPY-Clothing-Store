import { Link } from "react-router-dom";
import wilayas from "../Wilayas";
import { useCart } from "../Context/CartContext";
import Button from "../Components/Button";
import axios from "axios";

const Checkout = () => {
  const shipping = 700;
  const { cart } = useCart();  
  const token = localStorage.getItem("token");
  function calculateTotal() {
    return cart.reduce((total, element) => {
      return total + element.price * element.quantity;
    }, 0);
  }

  const total = calculateTotal();
  

  async function placeOrder(){
    const formData = new FormData();
    const products = [{}];
    cart.map((item , index)=>{
      products[index].product = item._id;
      products[index].quantity = item.quantity
    });

    formData.append("products", JSON.stringify(products));
    
    try{
      await axios.post("http://localhost:3000/api/v1/orders" , {products : products , status : "pending"} ,
        {headers: { Authorization: `Bearer ${token}` }}
      );
      alert("qsfsdmfoj")
    }catch(error){
      console.log(error);      
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-gray-50 to-gray-200 py-20 mt-40">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-6xl">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-8 font-medium">
          <Link to="/" className="hover:text-[#ff6c00] transition-colors">
            Home &gt;
          </Link>
          <Link to="/Cart" className="hover:text-[#ff6c00] transition-colors">
            Shopping Cart &gt;
          </Link>
          <span className="text-gray-800">Checkout</span>
        </div>

        {/* Checkout Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Billing Section */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center tracking-tight">
              Billing & Shipping
            </h2>

            {[
              { label: "Full Name (optional)", type: "text" },
              { label: "Phone Number", type: "text" },
              { label: "Address", type: "text" },
              { label: "Email (Optional)", type: "email" },
            ].map(({ label, type }, i) => (
              <div className="mb-5" key={i}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all"
                />
              </div>
            ))}

            {/* Wilaya Select */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Wilaya
              </label>
              <select
                name="wilaya"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all"
              >
                {wilayas.map((wilaya, index) => (
                  <option key={index} value={wilaya}>
                    {wilaya.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Info */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Additional Info (Optional)
              </label>
              <textarea
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff6c00] transition-all"
              />
            </div>
          </div>

          {/* Cart Section */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center tracking-tight">
              Your Order
            </h2>

            {cart.length === 0 ? (
              <p className="text-center text-gray-500">No Purchases Until Now</p>
            ) : (
              <div className="space-y-6">
                {cart.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b pb-4 border-gray-200"
                  >
                    <img
                      src={product.image[0].url}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-xl border"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-500">Size: {product.size}</p>
                      <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                      <p className="text-[#ff6c00] font-bold mt-1">{product.price} DZD</p>
                    </div>
                  </div>
                ))}

                {/* Totals */}
                <div className="space-y-3 border-t pt-4 mt-4 border-gray-200 text-sm font-medium text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-gray-800">{total} DZD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-gray-800">{shipping} DZD</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-4 border-gray-300">
                    <span>Total</span>
                    <span className="text-[#ff6c00]">{total + shipping} DZD</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-[#ff6c00] text-white hover:bg-[#e65a00] transition-all duration-300
                   mt-6 py-3 rounded-xl text-lg font-semibold shadow-md"
                   onClick={placeOrder}
                >
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
