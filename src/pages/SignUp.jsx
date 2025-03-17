import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, LogIn } from 'lucide-react';
import SignUpOn from "../assets/signUp.png";
import "../components/animate.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { API_BASE_URL } from "../backendApi/api.js";

const SignUp = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({ ...userData, [name]: value })
    }

    const navigate = useNavigate();
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/api/user/signUp`, userData);
            toast.success(response.data.message, {autoClose: 1000, style: { backgroundColor: "#f3f4f6", color: "#000000" }})
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        } catch (error) {
            const response1 = error;
            toast.error(response1.response.data.message, {style: { backgroundColor: "#f3f4f6", color: "#000000" }})
            // console.log(error)
        }
    }


    return (
        <div className="min-h-screen flex mt-[70px]">
            <div className="w-full lg:w-2/3 flex items-center justify-center p-8 bg-red-400 slideLeft">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <div className="flex items-center gap-2 text-gray-900">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                                Sign Up
                            </h2>
                            <LogIn className="mt-1 h-8 w-8 text-coral-500" />
                        </div>
                        <p className="mt-2 text-sm text-gray-800">
                            Already have an account?{' '}
                            <Link to="/login" className="text-coral-700 hover:text-coral-500 font-medium signupLogin">
                                Sign In
                            </Link>
                        </p>
                    </div>

                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:border-none  focus:outline-2 focus:ring-0"
                                placeholder="Enter your name"
                                value={userData.name}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                required
                                value={userData.email}
                                className="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:border-none  focus:outline-2 focus:ring-0"
                                placeholder="abc@gmail.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                Create Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                value={userData.password}
                                required
                                className="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:border-none  focus:outline-2 focus:ring-0"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="flex items-center justify-between mt-[-18px]">
                            <Link to="/forgot-password" className="text-sm text-gray-900 hover:text-coral-500 signupLogin">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            onClick={handleSignUp}
                            className="w-full py-3 px-4 rounded-lg text-white bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-colors cursor-pointer">
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
            <div className="hidden lg:flex lg:w-1/2 bg-red-50 slideRight">
                <div className="w-full h-full flex items-center justify-center p-12">
                    <img
                        src={SignUpOn}
                        alt="Shopping illustration"
                        className="w-full max-w-lg object-contain"
                    />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUp;