import { FaTruck } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa6";
const Features = ({ className, subClassName }) => {
  const boxShadow = "shadow-[0_15px_30px_-5px_rgba(151,65,252,0.2)]";
  return (
    <div
      className={`flex flex-col sm:flex-row lg:flex-row xl:flex:row ${className} justify-center items-center flex-wrap`}
    >
      {/* Feature 1 */}
      <div
        className={`flex flex-col justify-center items-center h-[150px] hover:${boxShadow}
         transition-all duration-300 py-4 px-7 ${subClassName}`}
      >
        <FaTruck
          size={40}
          className="hover:text-gray-400 transition-colors duration-300"
        />
        <p>Fast Delivery</p>
        <p className="text-gray-400">We guarantee a fast Delivery</p>
      </div>

      {/* Feature 2 */}
      <div
        className={`flex flex-col justify-center items-center h-[150px] hover:${boxShadow}
         transition-all duration-300 py-4 px-7 ${subClassName}`}
      >
        <FaDollarSign
          size={50}
          className="hover:text-gray-400 transition-colors duration-300"
        />
        <p>Unbeatable Prices</p>
        <p className="text-gray-400">
          Our Products have the best prices you can find in the market
        </p>
      </div>

      {/* Feature 3 */}
      <div
        className={`flex flex-col justify-center items-center h-[150px] hover:${boxShadow} transition-all duration-300
             py-4 px-7 ${subClassName}`}
      >
        <FaHeadset
          size={40}
          className="hover:text-gray-400 transition-colors duration-300"
        />
        <p>24/7 Support</p>
        <p className="text-gray-400">
          our Costumer Support is Always here to help you
        </p>
      </div>
    </div>
  );
};

export default Features;
