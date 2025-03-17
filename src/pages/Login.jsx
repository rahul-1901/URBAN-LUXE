import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, LogIn, Globe } from 'lucide-react';
import loginShop from "../assets/loginShop.png";
import { API_BASE_URL, googleAuth } from '../backendApi/api';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashBoard from './DashBoard';
import {useGoogleLogin} from "@react-oauth/google";
import googleLogo from "../assets/googleLogo.png";

const Login = () => {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })
    const [showDashBoard, setShowDashBoard] = useState(false);

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (localStorage.getItem("userToken")) {
                toast.warn("LogOut First", { autoClose: 1000, style: { backgroundColor: "#f3f4f6", color: "#000000" } });
            } else {
                const response = await axios.post(`${API_BASE_URL}/api/user/login`, userData);
                toast.success(response.data.message, { autoClose: 1000, style: { backgroundColor: "#f3f4f6", color: "#000000" } });
                setTimeout(() => {
                    navigate("/dashBoard");
                }, 2000)
                // console.log(response)
                localStorage.setItem("userToken", response.data.jwtToken);
                localStorage.setItem("userEmail", response.data.email);
                // console.log(localStorage.getItem("userToken"))
                // console.log(localStorage.getItem("userEmail"))
            }
        } catch (error) {
            // console.log(error)
            const response1 = error
            toast.error(response1.response.data.message, { autoClose: 1000, style: { backgroundColor: "#f3f4f6", color: "#000000" } })
        }
    }

    // const handleLogout = () => {
    //     localStorage.removeItem("userToken");
    //     // if(localStorage.getItem("userToken")) {
    //     //     console.log(localStorage.getItem("userToken"));
    //     // }
    //     // console.log(localStorage)
    // }

    const erconsole = () => {
        console.log(localStorage);
    }

    const handleChange = (e) => {
        // const name = e.target.name;
        // const value = e.target.value;
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }

    const responseGoogle = async (authResult) => {
        try {
            if(authResult['code']) {
                const result = await googleAuth(authResult['code']);
                const {email, name} = result.data.user;
                const token = result.data.token;
                toast.success("User Logined...", { autoClose: 1000, style: { backgroundColor: "#f3f4f6", color: "#000000" } });
                setTimeout(() => {
                    navigate("/dashBoard");
                }, 2000)
                // console.log(result.data.user);
                localStorage.setItem("userToken", token);
                localStorage.setItem("userEmail", email);
            }
        } catch (error) {
            console.error('Error while req google', error)
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code'
    })

    return (
        <>
            <div className="min-h-screen flex mt-[70px]">
                <div className="hidden lg:flex lg:w-1/2 bg-red-50 slideLeft">
                    <div className="w-full h-full flex items-center justify-center p-12">
                        <img
                            src={loginShop}
                            alt="Shopping illustration"
                            className="w-full max-w-lg object-contain"
                        />
                    </div>
                </div>

                <div className="w-full lg:w-2/3 flex items-center justify-center p-8 bg-red-400 slideRight">
                    <div className="w-full max-w-md space-y-8">
                        <div>
                            <div className="flex items-center gap-2 text-gray-900">
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                                    Login Here
                                </h2>
                                <LogIn className="mt-1 h-8 w-8 text-coral-500" />
                            </div>
                            <p className="mt-2 text-sm text-gray-800">
                                Don't have an account?{' '}
                                <Link to="/signUp" className="text-coral-700 hover:text-coral-500 font-medium signupLogin">
                                    Sign up
                                </Link>
                            </p>
                        </div>

                        <form className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:border-none  focus:outline-2 focus:ring-0"
                                    placeholder="abc@gmail.com"
                                    value={userData.email}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:border-none  focus:outline-2 focus:ring-0"
                                    placeholder="Enter your password"
                                    value={userData.password}
                                />
                            </div>

                            <div className="flex items-center justify-between mt-[-18px]">
                                <Link to="/forgot-password" className="text-sm text-gray-900 hover:text-coral-500 signupLogin">
                                    Forgot Password?
                                </Link>
                            </div>

                            <button
                                type='submit'
                                onClick={handleLogin}
                                className="w-full py-3 px-4 rounded-lg text-white bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-colors cursor-pointer">
                                Sign in
                            </button>
                        </form>
                        <p className='text-center text-xl text-white font-semibold'>Or</p>
                        <button onClick={googleLogin} className='cursor-pointer font-semibold flex items-center justify-center gap-2 bg-gray-100 rounded-md px-5 py-2 w-full h-10'><img src={googleLogo} className='h-full'/>Google Login</button>
                        {/* <button
                            onClick={erconsole}
                            className="w-full py-3 px-4 rounded-lg text-white bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-colors cursor-pointer">
                            Sign in
                        </button> */}
                        {/* <button
                            onClick={handleLogout}
                            className="w-full py-3 px-4 rounded-lg text-white bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-colors cursor-pointer">
                            LogOut
                        </button> */}
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default Login;