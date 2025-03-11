import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ShoppingCart, Search, User, X, Menu, LogOut } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";
import "./Navbar.css";
import urban from "../assets/urbanSec.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin,setIsLogin] = useState(false);
  const navigate = useNavigate();
  const handleExcess = () => {
    if (!localStorage.getItem("userToken")) {
      toast.error("Login first...", { autoClose: 1000, style: { backgroundColor: "#f3f4f6", color: "#000000" }})
    } else {
      navigate('/cart');
    }
  }

  const handleDashLogin = () => {
    if (localStorage.getItem("userToken")) {
      navigate('/dashBoard')
    } else {
      navigate('login')
    }
  }


  const handleDashLogin2 = () => {
    if (localStorage.getItem("userToken")) {
      setIsOpen(false);
      setIsLogin(true);
      navigate('/dashBoard')
    } else {
      setIsOpen(false);
      setIsLogin(false);
      navigate('login')
    }
  }

  const handleLogout = () => {
    if (localStorage.getItem("userToken")) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userEmail");
      toast.success("Logout successfull...", { autoClose: 1000, style: { backgroundColor: "#f3f4f6", color: "#000000" } })
      setTimeout(() => {
        navigate('/login');
      }, 2000)
    } else {
      toast.warn("User not Logined...", {autoClose: 1000, style: { backgroundColor: "#f3f4f6", color: "#000000" }});
    }
    // if(localStorage.getItem("userToken")) {
    //     console.log(localStorage.getItem("userToken"));
    // }
    // console.log(localStorage)
  }

  return (
    <div className='navbarBody w-full top-0 left-0 fixed z-9999'>
      <div className='navbarContent mx-auto shadow-md p-5 bg-gray-100'>

        <div className='navbarLogo flex items-center md:px-1'>
          <Link to="/" className='logoName md:text-2xl text-3xl font-bold'>
            <img src={urban} className='ml-[-14px] md:ml-[0px] w-45 h-12  md:h-11 md:w-40'></img>
          </Link>
        </div>

        <div className='navbarRoutes md:flex items-center text-xl hidden'>
          <Link to="/" className='routeMain'>
            Home
          </Link>
          <Link to="/watches" className='routeMain'>
            Accessories
          </Link>
          <Link to="/allTrend" className='routeMain'>
            Collection
          </Link>
          <Link to="/luxury" className='routeMain'>
            Luxury
          </Link>
          <Link to="/about" className='routeMain'>
            About
          </Link>
        </div>

        <div className='shoppingIcons md:flex items-center text-xl hidden'>
          <button onClick={() => handleDashLogin()} className='cursor-pointer'>
            <User />
          </button>
          <button onClick={() => handleExcess()} className='cursor-pointer'>
            <ShoppingCart />
          </button>
          <button onClick={() => handleLogout()} className='cursor-pointer'>
            <LogOut />
          </button>
        </div>

        <div className='flex md:hidden items-center'>
          <button onClick={() => { setIsOpen(!isOpen) }}>
            {isOpen ? <X className='h-8 w-8 z-1000' /> : <Menu className='h-8 w-8' />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed h-[100vh] md:hidden smallNavbar w-54 bg-gray-100"
          >
            <div className="text-xl smallContent md:hidden">
              <Link to="/" className="flex text-3xl mt-5 linkComponent" onClick={() => { setIsOpen(false) }}>
                Home
              </Link>
              <div className='w-54 h-[1px] bg-black'></div>
              <Link to="/allTrend" className="flex text-3xl linkComponent" onClick={() => { setIsOpen(false) }}>
                Collection
              </Link>
              <div className='w-54 h-[1px] bg-black'></div>
              <Link to="/watches" className="flex text-3xl linkComponent" onClick={() => { setIsOpen(false) }}>
                Accessories
              </Link>
              <div className='w-54 h-[1px] bg-black'></div>
              <Link to="/luxury" className="flex text-3xl linkComponent" onClick={() => { setIsOpen(false) }}>
                Luxury
              </Link>
              <div className='w-54 h-[1px] bg-black'></div>
              <Link to="/about" className="flex text-3xl linkComponent" onClick={() => { setIsOpen(false) }}>
                About
              </Link>
              <div className='w-54 h-[1px] bg-black'></div>
              <Link to="/cart" className="flex text-3xl linkComponent" onClick={() => { setIsOpen(false) }}>
                Cart
              </Link>
              <div className='w-54 h-[1px] bg-black'></div>
              <Link to="/login" className="flex text-3xl linkComponent" onClick={handleDashLogin2}>
                {isLogin ? "Login" : "DashBoard"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer />
    </div>
  )
}

export default Navbar;