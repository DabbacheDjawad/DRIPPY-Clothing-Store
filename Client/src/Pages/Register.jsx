import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import axios from "axios";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [response , setResponse] = useState("");

    const navigate = useNavigate();
    function handleNavigation(destination){
      navigate(`/${destination}`);
    }


    async function handleRegister(e){
    e.preventDefault()
        try{
            const {data} = await axios.post("http://localhost:3000/api/v1/auth/register",{name , email , password});
            //setting token in localStorage
            localStorage.setItem("token" , data.token);
            setResponse("User Registered...")
        }catch(error){
            if(error.status == 400) setResponse("Duplicate Email Value")
            else setResponse("Invalid Credentials")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-[0_15px_30px_-5px_rgba(151,65,252,0.2)] w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-[#ff6c00]">Register</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff6c00] focus:border-[#ff6c00] transition-all"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff6c00] focus:border-[#ff6c00] transition-all"
                            required
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
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#ff6c00] focus:border-[#ff6c00] transition-all"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full bg-[#ff6c00] text-white hover:bg-[#e65a00]
                     transition-all" onClick={handleRegister}>
                        Register
                    </Button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/Login" className="text-[#ff6c00] hover:underline">
                        Login here
                    </Link>
                </p>
                <p className={`text-center font-bold ${response === "User Registered..."?"text-green-600" :"text-red-600" }`}
            >{`${response}`}</p>
            </div>

            {/* redirector */}
            {response ==="User Registered..." ? setTimeout(()=>handleNavigation("") , 2000):""}
        </div>
    );
};

export default Register;