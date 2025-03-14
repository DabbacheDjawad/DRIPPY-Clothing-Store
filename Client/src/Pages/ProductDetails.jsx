import { useParams } from "react-router-dom"
import products from "../products"
import {Swiper , SwiperSlide} from "swiper/react"
import React, { useState } from "react";
import { Navigation, Pagination } from 'swiper/modules';
import "swiper/css"
import 'swiper/css/navigation';
import { useRef , useEffect } from "react";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";

const ProductDetails = () => {
  const productID = useParams();
  const {addToCart} = useCart();  //add to cart function
  const swiperRef = useRef(null);
  let [quantity , setQuantity] = useState(0);
  let [prSize , setSize] = useState("S");

const product = products[productID.id];

  function handleQuantity(e){
    setQuantity(Number(e.target.value));
  }

  function handleSize(e){
    setSize(e.target.value);
  }

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current?.navigation?.update();
    }
  }, []);

function handleAddToCart(){
    addToCart(product , quantity , prSize);
    if(quantity > 0){
      alert(`${product.name} Added to Cart Successfully!!`);
    }else{
      alert(`Can not enter negative or null quantity`);
    }
  }

  return (
    <div className="mt-40 overflow-hidden">
      {/* Item */}
      <div className="flex gap-5 relative left-[25%] max-sm:text-xs sm:text-lg">
          <p className="text-gray-400"><Link to={"/"}>Home &gt;</Link></p>
          <p className="text-gray-400"><Link to={"/"}>Products &gt;</Link></p>
          <p className="font-semibold">{products[productID.id].name}</p>
      </div>


      {/* Images */}
      <div className="flex flex-col lg:flex-row lg:mt-15 gap-10 xl:justify-center xl:gap-30">
        <div>
      <Swiper
      modules={[Navigation,Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      className="lg:!m-0 max-sm:w-[300px] sm:w-[500px] lg:w-[500px] mt-15 lg:!ml-15">
      <div className="">
          {products &&
           products[productID.id].images.slice(0,product.images.length-1).map((image , index)=>(
           <SwiperSlide className="sm:!w-[500px]" key={index}> <img src={image} alt={product.name} className="max-w-[800px]
            max-sm:w-[300px] sm:w-[500px] lg:w-[500px] lg:h-[600px] border-1 rounded-lg border-gray-300"
           /></SwiperSlide>
          ))}
      </div>
      </Swiper>
      </div>
      
      <div className="xl:w-[40%]">
      {/* Description */}
      <div className="ml-[5%] mt-10 flex flex-col gap-2">
        <h1 className="font-semibold sm:text-2xl">{product.name}</h1>
        <h3 className="font-semibold text-lg">category : {`${product.category}`}</h3>
        <p className="font-semibold text-lg">Available Sizes : {`${product.availableSizes}`}</p>
        <p className={`font-semibold text-lg ${product.available?"text-green-500":"text-red-600"}`}>{products[productID.id].available?"Available in Stock":"Sold"}</p>
        <p className="text-green-500 font-semibold text-lg">{`${product.price}`}</p>
        <p className="mt-3 text-gray-500 w-[90%]">{`${product.description}`}</p>
      </div>

      {/* Shopping Details */}
      <div className="flex justify-center xl:justify-start gap-20 max-sm:w-full mt-10 text-lg xl:ml-[5%]">
        <div>
            <p>Sizes</p>
            <select name="sizes" onChange={handleSize} id="sizes" className="outline-none border-1 border-gray-400 rounded-lg w-[150%] py-1">
            {product.availableSizes && product.availableSizes.map((size , index)=>(
              <option value={`${size}`} key={index}>{`${size}`}</option>
            ))}
            </select>
          </div>
          <div>
            <p>Quantity</p>
            <input type="number" defaultValue={quantity} onChange={handleQuantity} 
            className="outline-none border-1 rounded-lg border-gray-400 py-1"/>
          </div>
      </div>
      <div className="mt-5">
        <Button className={"sm:w-[40%] lg:w-[90%]  m-auto xl:w-[90%]"} onClick={handleAddToCart}>add To Cart</Button>
      </div>
      </div>
    </div>
    </div>
  )
}

export default ProductDetails
