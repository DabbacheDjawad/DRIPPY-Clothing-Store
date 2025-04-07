import logo from "../assets/images/DRIPPY.png";
import Button from "./Button";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({ role: "" });
  const token = localStorage.getItem("token");

  function handleIsOpen() {
    setIsOpen(!isOpen);
  }

  const [scrollY, setScrollY] = useState(window.pageYOffset);

  useEffect(() => {
    fetchUserData();
    
    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //to know whats the role of the user for conditional rendering of the link in the navbar (Admin Dashboard)
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/users/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    //container
    <div
      className={`flex items-center justify-evenly z-10 bg-white h-[100px] fixed top-0
         shadow-[0_15px_30px_-5px_rgba(151,65,252,0.2)] max-lg:shadow-xl text-[15px]
         ${
           scrollY === 0
             ? "w-[80%] ml-[10%] translate-y-[30px]"
             : "w-full translate-y-0"
         }
         transition-all duration-300`}
    >
      {/* image Div */}
      <div>
        <Link to={"/"}>
          <img src={logo} alt="logo" width={150} />
        </Link>
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
        <ul className={`flex flex-col lg:flex-row xl:flex-row lg:gap-10 xl:gap-14 xl:ml-[15%] ${scrollY === 0 ? "" : "lg:ml-[15%]"} transition-all duration-300`}>
          <Link
            to={"/"}
            className="py-4 max-lg:pl-[10%] hover:bg-[#ff6c00] hover:border-1
                    hover:border-[#ff6c00] hover:rounded-lg lg:hover:text-[#ff6c00] lg:hover:bg-white
                     lg:hover:border-none xl:hover:border-none transition-all hover:text-white font-medium"
            onClick={handleIsOpen}
          >
            <li>Home</li>
          </Link>

          <Link
            to={"/Cart"}
            className="py-4 max-lg:pl-[10%] hover:bg-[#ff6c00] hover:border-1
                    hover:border-[#ff6c00] hover:rounded-lg lg:hover:text-[#ff6c00] lg:hover:bg-white
                     lg:hover:border-none xl:hover:border-none transition-all hover:text-white font-medium"
            onClick={handleIsOpen}
          >
            <li>Cart</li>
          </Link>

          <Link
            to={"/Checkout"}
            className="py-4 max-lg:pl-[10%] hover:bg-[#ff6c00] hover:border-1
                    hover:border-[#ff6c00] hover:rounded-lg lg:hover:text-[#ff6c00] lg:hover:bg-white
                     lg:hover:border-none xl:hover:border-none transition-all hover:text-white font-medium"
            onClick={handleIsOpen}
          >
            <li>Checkout</li>
          </Link>

          <Link
            to={"/profile"}
            className="py-4 max-lg:pl-[10%] hover:bg-[#ff6c00] hover:border-1
                    hover:border-[#ff6c00] hover:rounded-lg lg:hover:text-[#ff6c00] lg:hover:bg-white
                     lg:hover:border-none xl:hover:border-none transition-all hover:text-white font-medium"
            onClick={handleIsOpen}
          >
            <li>Profile</li>
          </Link>

          {(user?.role === "admin" || user?.role ==="superAdmin") && (
            <Link
              to={"/admin"}
              className="py-4 max-lg:pl-[10%] hover:bg-[#ff6c00] hover:border-1
                        hover:border-[#ff6c00] hover:rounded-lg lg:hover:text-[#ff6c00] lg:hover:bg-white
                         lg:hover:border-none xl:hover:border-none transition-all hover:text-white font-medium min-w-fit"
            >
                 Dashboard
            </Link>
          )}
        </ul>
      </div>

      {/* Buttons Container */}
      <div className="flex gap-5 max-sm:gap-1">
        <Link to={"/Login"}>
          <Button className="max-sm:text-xs">Sign in</Button>
        </Link>
        <Link to={"/Register"}>
          <Button className="max-sm:text-xs">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
