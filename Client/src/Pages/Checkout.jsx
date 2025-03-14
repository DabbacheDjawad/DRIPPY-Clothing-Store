import { Link } from "react-router-dom";
import wilayas from "../Wilayas"
import { useCart } from "../Context/CartContext";
import Button from "../Components/Button";
const Checkout = () => {
const shipping = 700;
const {cart , setCart} = useCart();

  function calculateTotal() {
  return cart.reduce((total, element) => {
    return total + Number(element.price.split(" ")[0]) * element.quantity;
  }, 0);
}

const total = calculateTotal();
  return (
    <div className="mt-40">
      {/* Links */}
      <div className="w-full flex justify-center">
        <Link to={"/"}  className="text-gray-500">Home -&gt;</Link>
        <Link to={"/Cart"} className="text-gray-500">Shoppring Cart -&gt;</Link>
        <Link to={"/Checkout"}>Checkout</Link>
      </div>

      {/* Checkout Container */}
      <div className="flex flex-col md:flex-row">

        {/* Payment */}
        <div className="flex flex-col w-[90%] ml-[5%] max-sm:gap-5 md:gap-7 py-10 border-gray-400 border-y mt-5">
            <h2 className="text-center text-2xl">BILLING & SHIPPING</h2>

            {/* Name */}
            <div className="flex flex-col">
              <label className="font-light">Full Name (optional)</label>
              <input type="text" className="text-2xl py-1 w-full border border-gray-400 outline-none rounded-sm"/>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="font-light">Phone Number</label>
              <input type="text" className="text-2xl py-1 w-full border border-gray-400 outline-none rounded-sm"/>
            </div>
            
            {/* Wilaya */}
            <div className="flex flex-col">
              <label className="font-light">Wilaya</label>
              <select name="wilaya" className="outline-none border py-1 text-2xl font-light border-gray-400 rounded-sm">
                {wilayas && wilayas.map((wilaya , index)=>(
                  <option key={index} value={wilaya}>{`${wilaya.name}`}</option>
                ))}
              </select>
            </div>
            
            {/* Adress */}
            <div className="flex flex-col">
              <label className="font-light">Adress</label>
              <input type="text" className="text-2xl py-1 w-full border border-gray-400 outline-none rounded-sm"/>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="font-light">Email (Optional)</label>
              <input type="email" className="text-2xl py-1 w-full border border-gray-400 outline-none rounded-sm"/>
            </div>

            {/* Additional Info */}
            <div>
            <label className="font-light">ADDITIONAL INFO (Optional)</label>
            <textarea type="text" className="text-2xl py-1 w-full border border-gray-400 outline-none rounded-sm"/>
            </div>
        </div>

        {/* Items (ORDER)*/}
          <div className="flex flex-col w-[90%] ml-[5%] mt-10 md:w-[110%]">
              <h2 className="text-2xl text-center">Purchases</h2>
              
              {cart.length === 0 ? (<p>No Purchases Until Now</p>):
              cart.map((product , index)=>(
                <div key={index} className="flex gap-8 border-b border-gray-400 py-3">
                  <img src={product.images[0]} alt={product.name} className="max-sm:w-[120px] sm:w-[120px]"/>
                  <div className="flex flex-col justify-center">
                    <p>{`${product.name}`}</p>
                    <p>{`Size : ${product.size}`}</p>
                    <p className="font-bold">{`x${product.quantity}`}</p>
                    <p className="text-green-500 font-semibold">{`${product.price}`}</p>
                  </div>
    
                </div>
              ))}
                  {/* charges */}
                   <div>
                    <div className="flex justify-between border-b border-gray-400 py-3">
                      <p className="font-semibold">SubTotal</p>
                      <span className="mr-[10%] text-green-500 font-semibold">{`${total} DZD`}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-400 py-3">
                      <p className="font-semibold">Shipping</p>
                      <span className="mr-[10%] text-green-500 font-semibold">{`${shipping} DZD`}</span>
                    </div>

                    <div className="flex justify-between border-b border-gray-400 py-3">
                      <p className="font-semibold">Total</p>
                      <span className="mr-[10%] text-green-500 font-semibold">{`${total+shipping} DZD`}</span>
                    </div>

                    <Button className="mt-5 m-auto max-sm:w-[80%] sm:w-[80%] rounded-sm mb-5">PLACE ORDER</Button>
                  </div>
          </div>
      </div>
    </div>
  )
}

export default Checkout
