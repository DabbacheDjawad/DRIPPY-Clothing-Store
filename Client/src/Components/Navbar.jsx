import logo from "../assets/images/DRIPPY.png";
import Button from "./Button";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ className }) => {
    const [isOpen, setIsOpen] = useState(false);

    function handleIsOpen() {
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
        <div
            className={`flex items-center justify-evenly z-10 bg-white h-[100px] fixed top-0
         shadow-[0_15px_30px_-5px_rgba(151,65,252,0.2)] 
         ${scrollY === 0 ? "w-[80%] ml-[10%] translate-y-[30px]" : "w-full translate-y-0"}
         transition-all duration-300`}
        >
            {/* image Div */}
            <div>
                <img src={logo} alt="logo" width={150} />
            </div>

            {/* DropDown Menu */}
            <div className={`lg:hidden xl:hidden`}>
                <Button onClick={handleIsOpen} className="max-sm:mr-5 max-sm:text-xs">
                    <RxHamburgerMenu />
                </Button>
            </div>

            <div
                className={`${
                    isOpen
                        ? "translate-y-0 opacity-100 visible"
                        : "translate-y-[-20px] opacity-0 invisible"
                }
                absolute top-[100px] left-0 w-full bg-white rounded-lg shadow-lg
                transition-all duration-300
                lg:relative lg:bg-white lg:text-black lg:top-auto lg:left-auto lg:max-h-fit lg:w-[50%] lg:opacity-100 lg:translate-y-0 lg:visible lg:shadow-none
                xl:relative xl:bg-white xl:text-black xl:top-auto xl:left-auto xl:max-h-fit xl:opacity-100 xl:w-[50%] xl:translate-y-0 xl:visible xl:shadow-none`}
            >
                <ul className="flex flex-col lg:flex-row xl:flex-row lg:gap-10 xl:gap-10 lg:ml-[15%] xl:ml-[15%]">
                    <Link
                        to={"/"}
                        className="py-4 pl-[10%] hover:bg-[#ff6c00] hover:border-1
                    hover:border-[#ff6c00] hover:rounded-lg lg:hover:text-[#ff6c00] lg:hover:bg-white
                     lg:hover:border-none xl:hover:border-none transition-all hover:text-white font-medium"
                        onClick={handleIsOpen}
                    >
                        <li>Home</li>
                    </Link>

                    <Link
                        to={"/Cart"}
                        className="py-4 pl-[10%] hover:bg-[#ff6c00] hover:border-1
                    hover:border-[#ff6c00] hover:rounded-lg lg:hover:text-[#ff6c00] lg:hover:bg-white
                     lg:hover:border-none xl:hover:border-none transition-all hover:text-white font-medium"
                        onClick={handleIsOpen}
                    >
                        <li>Shopping Cart</li>
                    </Link>

                    <Link
                        to={"/Checkout"}
                        className="py-4 pl-[10%] hover:bg-[#ff6c00] hover:border-1
                    hover:border-[#ff6c00] hover:rounded-lg lg:hover:text-[#ff6c00] lg:hover:bg-white
                     lg:hover:border-none xl:hover:border-none transition-all hover:text-white font-medium"
                        onClick={handleIsOpen}
                    >
                        <li>Checkout</li>
                    </Link>
                </ul>
            </div>

            {/* Buttons Container */}
            <div className="flex gap-5 max-sm:gap-1">
                <Link to={"/Login"}><Button className="max-sm:text-xs">Sign in</Button></Link>
                <Link to={"/Register"}><Button className="max-sm:text-xs">Sign Up</Button></Link>
            </div>
        </div>
    );
};

export default Navbar;