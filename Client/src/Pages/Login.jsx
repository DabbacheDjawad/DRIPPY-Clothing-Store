import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Components/Button";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


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
                        />
                    </div>
                    <Button type="submit" className="w-full bg-[#ff6c00] text-white hover:bg-[#e65a00] transition-all">
                        Login
                    </Button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/Register" className="text-[#ff6c00] hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;