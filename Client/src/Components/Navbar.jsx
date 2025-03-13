    import logo from "../assets/images/DRIPPY.png"
    import Button from "./Button"
    import { RxHamburgerMenu } from "react-icons/rx";
    import { useState , useEffect} from "react";
    import {Link} from "react-router-dom"
    const Navbar = ({className}) => {

        const [isOpen , setIsOpen] = useState(false);
        function handleIsOpen(){
            setIsOpen(!isOpen);
        }

        const [scrollY, setScrollY] = useState(window.pageYOffset);

        useEffect(() => {
          const handleScroll = () => {
            setScrollY(window.pageYOffset);
          };
      
          window.addEventListener("scroll", handleScroll);
          
          return () => window.removeEventListener("scroll", handleScroll);
        }, []);
        

    return (
        //container
        <div className={`flex items-center justify-evenly z-10 bg-white h-[100px] fixed top-0
         shadow-[0_15px_30px_-5px_rgba(151,65,252,0.2)] 
         ${scrollY===0?"w-[80%] ml-[10%] translate-y-[30px]":"w-full translate-y-0"}
         transition-all duration-300`}>
            {/* image Div */}
            <div>
                <img src={logo} alt="logo" width={150} />
            </div>

            {/* DropDown Menu */}
            <div className={`lg:hidden xl:hidden`}>
                <Button onClick={handleIsOpen} className="max-sm:mr-5 max-sm:text-xs"><RxHamburgerMenu/></Button>
            </div>

            <div className={
            `${isOpen?"max-h-[180px] opacity-100 absolute w-full top-[100px] rounded-lg text-[#ff6c00] bg-white"
            :"max-h-0 overflow-hidden absolute opacity-0"}
            transition-all duration-300
            lg:relative lg:bg-white lg:text-black lg:top-auto lg:left-auto lg:max-h-fit lg:w-[50%] lg:opacity-100
            xl:relative xl:bg-white xl:text-black xl:top-auto xl:left-auto xl:max-h-fit xl:opacity-100 xl:w-[50%] `}>

                <ul className="flex flex-col lg:flex-row xl:flex-row lg:gap-10 xl:gap-10 lg:ml-[15%] xl:ml-[15%]">
                    <li className={`py-4 pl-[10%] font-medium hover:text-white hover:bg-[#ff6c00] hover:border-1
                     hover:border-[#ff6c00] hover:rounded-lg lg:hover:text-[#ff6c00] lg:hover:bg-white
                     lg:hover:border-none xl:hover:border-none transition-all
                    `}>
                    <Link to={"/"}>Home</Link></li>

                    <li className={`py-4 pl-[10%] font-medium hover:text-white hover:bg-[#ff6c00] hover:border-1
                     hover:border-[#ff6c00] hover:rounded-lg lg:hover:text-[#ff6c00] lg:hover:bg-white
                     lg:hover:border-none xl:hover:border-none transition-all
                    `}>
                        <Link to={"/Cart"}>Shopping Cart</Link></li>

                    <li className={`py-4 pl-[10%] font-medium hover:text-white hover:bg-[#ff6c00] hover:border-1
                     hover:border-[#ff6c00] hover:rounded-lg lg:hover:text-[#ff6c00] lg:hover:bg-white
                     lg:hover:border-none xl:hover:border-none transition-all
                    `}>
                        <Link to={"/Checkout"}>Checkout</Link></li>
                </ul>
            </div>

            {/* Buttons Container */}
            <div className="flex gap-5 max-sm:gap-1">
                <Button className="max-sm:text-xs">Sign in</Button>
                <Button className="max-sm:text-xs">Sign Up</Button>
            </div>

        </div>
    )
    }

    export default Navbar
