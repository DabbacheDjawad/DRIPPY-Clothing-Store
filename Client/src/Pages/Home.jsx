import backgroundImage from "../assets/images/backgroundShoe1.png"
import banner from "../assets/images/banner-bg.jpg"
import Features from "../Components/Features"
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import products from "../products";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
const Home = () => {
  const mediumScreenShoe = "md:-rotate-90 xl:-rotate-0 lg:-rotate-0 2xl:rotate-0 md:mt-14 lg:mt-auto xl:mt-auto";

  const [filters , setFilters] = useState(false)
  const [showMore , setShowMore] = useState(false)
  const [count , setCount] = useState(6)
  const [showValue , setShowValue] = useState("Show More");
  
  function handleFiltering(){
    setFilters(!filters);
  }

  function handleCount(e){
    showMore===true?setCount(products.length):setCount(6);
    setShowMore(!showMore)
    showMore===true?setShowValue("Show Less"):setShowValue("Show More ");
  }

  return (
    <div>
      <div>
        <img src={banner} alt="bnr" className="h-[700px] lg:h-[800px] xl:h-[800px] -z-50 absolute top-0 lg:right-0 xl:right-0" />
        <img src={backgroundImage} alt="bg-image" className={`hidden lg:block xl:block md:block absolute lg:right-10 xl:right-30
         lg:h-[350px] md:right-0 md:h-[250px] top-50 -z-0 ${mediumScreenShoe}`}/>
      </div>

      <div className="mt-[15%] md:mt-[20%] lg:mt-[12%] lg:ml-25 ml-10">
        <h1 className="w-[60%]  font-extrabold  text-4xl/normal md:text-5xl/normal text-[#222222] max-sm:text-center max-sm:w-[80%]">Welocme to DRIPPY</h1>
        <h1 className="w-[50%] font-bold text-2xl md:text-start text-[#222222] max-sm:text-center max-sm:w-[80%]">The Best Men Clothing Store in Algeria</h1>
        <p className="mt-6 text-[#777777] w-[65%] lg:w-[30%] md:w-[50%] max-sm:text-center max-sm:w-[80%]">We are DRIPPY store a new abitious algerian man clothing Shop , we provide the latest and the most trendy clothing
           from hats and beenies going through shirts and jackets to pants and shoes and occasionally fashion socks</p>
           <a href="/" className="flex items-center font-semibold mt-5"><CiCirclePlus size={55} color="#ff6c00"/> Add to Cart</a>
      </div>

    {/* Features */}
    <Features className="mt-[40%] sm:mt-[30%] md:mt-[15%] xl:mt-[10%] gap-5" subClassName="w-[70%] sm:w-[40%] lg:w-[30%] text-center border-[#DCD7C9] border-1 rounded-lg bg-white"/>

      
    {/* Products */}
    <section className="mt-24">
          <div><h1 className="text-center text-3xl">Our Products</h1></div>

          <div className="flex w-full justify-center mt-7">
            <input type="text" placeholder="Search for an item" className="border-1 rounded-lg py-2 outline-none text-center w-[50%]"/>
            <button className="ml-10 cursor-pointer" onClick={handleFiltering}><IoFilter size={30} className="hover:text-[#ff6c00]" /></button>
            </div>


          {/* filtering */}
          <div className={`flex justify-center max-sm:flex-col items-center flex-wrap gap-2 mt-5 ${filters ? "block" :"hidden"}`}>
            {/* Category */}
            <div className={`flex gap-5`}>
              <p className="w-20">Category : </p>
              <select name="category" className="outline-none border-1 border-gray-400 rounded-sm px-2 w-35">
                <option value="all" className="">All</option>
                <option value="shirts">Shirts</option>
                <option value="jackets">Jackets</option>
                <option value="pants">Pants</option>
                <option value="shoes">Shoes</option>
              </select>
            </div>

            {/* Price */}
            <div className="flex gap-5">
              <p className="w-20">Price : </p>
              <select name="price" className="outline-none border-1 border-gray-400 rounded-sm w-35">
                <option value="all">All Prices</option>
                <option value="under-3000">Under 3000 DZD</option>
                <option value="3000-9000">3000-9000 DZD</option>
                <option value="over-9000">Over 9000 DZD</option>
              </select>
            </div>

          {/* by Size */}
          <div className="flex gap-5">
              <p className="w-20">Size : </p>
              <select name="size" className="outline-none border-1 border-gray-400 rounded-sm w-35">
                <option value="all">All</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="XXXl">XXXL</option>
              </select>
            </div>

          {/* sort by */}
          <div className="flex gap-5">
              <p className="w-20">Sort By : </p>
              <select name="sort" className="outline-none border-1 border-gray-400 rounded-sm w-35">
                <option value="latest">Latest</option>
                <option value="price-ascending">price:Ascending</option>
                <option value="price-descending">price:Descending</option>
              </select>
            </div>
          </div>

          {/* Products Display */}
          <div className="mt-20">
            <ul className="flex flex-wrap gap-5 justify-center items-center">
              {products && products.slice(0 , count).map((product , index)=>(
                
                  <li key={index}>
                <Link to={`/productDetails/${index}`}>
                <LazyLoadImage
                src={product.images[0]}
                alt={product.name}
                effect="blur"
                className="h-[300px] w-[250px] border-gray-200 border-1 rounded-lg"
              />
                </Link>
              <p className="font-semibold ml-3">{product.name}</p>
              <p className="text-green-400 ml-3">{product.price}</p>
                  </li>
              ))}
            </ul>
            <Button className={"m-auto mt-10 px-20"} onClick={handleCount}>{showValue}</Button>
          </div>
    </section>
    </div>
  )
}

export default Home
