import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import axios from "axios";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [response , setResponse] = useState("");

    function handleEmail(e){
        setEmail(e.target.value);
    }

    function handlePassword(e){
        setPassword(e.target.value);
    }


    const navigate = useNavigate();

    function handleNavigation(destination){
      navigate(`/${destination}`);
    }

    async function handleLogin(e){
        e.preventDefault();
          try{
            const token = localStorage.getItem("token")        
    
            const {data} = await axios.post("http://localhost:3000/api/v1/auth/login",{email , password},
             { headers : {
                Authorization : `Bearer ${token}`
              }}
            );
    
            setResponse("User Logged In...");
            localStorage.setItem("token" , data.token)
             
          }catch(error){
            if(error.status === 401) setResponse("UNAUTHORIZED , Wrong Email or Password")
            else if(error.status === 400) setResponse("UNAUTHORIZED , Be Sure To Provide The Full Credentials")
            else setResponse("Something Went Wrong , Please Try Again")
        console.log(error);
        
          }
      }
  

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-[0_15px_30px_-5px_rgba(151,65,252,0.2)] w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-[#ff6c00]">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff6c00] focus:border-[#ff6c00] transition-all"
                            required
                            onChange={handleEmail}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff6c00] focus:border-[#ff6c00] transition-all"
                            required
                            onChange={handlePassword}
                        />
                    </div>
                    <Button type="submit" className="w-full bg-[#ff6c00] text-white hover:bg-[#e65a00] 
                    transition-all" onClick={handleLogin}>
                        Login
                    </Button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/Register" className="text-[#ff6c00] hover:underline">
                        Register here
                    </Link>
                </p>

                <p className={`text-center font-bold ${response === "User Logged In..."?"text-green-600" :"text-red-600" }`}
                >{`${response}`}</p>

            </div>
            {response ==="User Logged In..." ? setTimeout(()=>handleNavigation("") , 2000):""}
        </div>
    );
};

export default Login;