import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ShoppingCart, Search, User, X, Menu, LogOut, Home, Shirt, Watch, ShoppingBag, Info, LayoutDashboard } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";
import "./Navbar.css";
import urban from "../assets/urbanSec.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const handleExcess = () => {
    if (!localStorage.getItem("userToken")) {
      toast.error("Login first...", { autoClose: 1000, style: { backgroundColor: "#f3f4f6", color: "#000000" } })
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
        setIsLogin(false);
        navigate('/login');
      }, 2000)
    } else {
      toast.warn("User not Logined...", { autoClose: 1000, style: { backgroundColor: "#f3f4f6", color: "#000000" } });
    }
    // if(localStorage.getItem("userToken")) {
    //     console.log(localStorage.getItem("userToken"));
    // }
    // console.log(localStorage)
  }

  useEffect(() => {
    setIsLogin(!!localStorage.getItem("userToken"));
  }, [navigate]);

  return (
    <div className='navbarBody w-full top-0 left-0 fixed z-9999'>
      <div className='navbarContent mx-auto shadow-md p-5 bg-gray-100 h-[75px]'>

        <div className='navbarLogo flex items-center md:px-1'>
          <Link to="/" className='logoName md:text-2xl text-3xl font-bold'>
            <img src={urban} className='ml-[-14px] md:ml-[0px] w-45 h-12  md:h-11 md:w-40'></img>
          </Link>
        </div>

        <div className='navbarRoutes md:flex items-center text-xl hidden'>
          <Link to="/" className='routeMain'>
            <p className='text-gray-700 hover:text-gray-900 relative group'>
              Home
              <div className="w-full bg-black h-0.5 bottom-[-1px] rounded-lg left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-out absolute"></div>
            </p>
          </Link>
          <Link to="/watches" className='routeMain'>
            <p className='text-gray-700 hover:text-gray-900 relative group'>
              Accessories
              <span className='w-full bg-black h-0.5 bottom-[-1px] rounded-lg left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-out absolute'></span>
            </p>
          </Link>
          <Link to="/allTrend" className='routeMain'>
            <p className='text-gray-700 hover:text-gray-900 relative group'>
              Collection
              <span className='w-full bottom-[-1px] left-0 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-out absolute'></span>
            </p>
          </Link>
          <Link to="/luxury" className='routeMain'>
            <p className='text-gray-700 hover:text-gray-900 relative group'>
              Luxury
              <span className='w-full bottom-[-1px] left-0 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-out absolute'></span>
            </p>
          </Link>
          <Link to="/about" className='routeMain'>
            <p className='text-gray-700 hover:text-gray-900 relative group'>
              About
              <span className='w-full bottom-[-1px] left-0 h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-out absolute'></span>
            </p>
          </Link>
        </div>

        <div className='shoppingIcons md:flex items-center text-xl hidden'>
          <div className='relative group mt-2'>
            <button onClick={() => handleDashLogin()} className='cursor-pointer'>
              <User />
            </button>
            <div className='absolute bg-gray-700 text-white left-1/2 -translate-x-1/2 mt-1 text-sm px-1 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity'>
              Account
            </div>
          </div>
          <div className='relative group mt-2'>
            <button onClick={() => handleExcess()} className='cursor-pointer'>
              <ShoppingCart />
            </button>
            <div className='absolute bg-gray-700 text-white left-1/2 -translate-x-1/2 mt-1 text-sm px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity'>
              Cart
            </div>
          </div>
          <div className='relative group mt-2'>
            <button onClick={() => handleLogout()} className='cursor-pointer'>
              <LogOut />
            </button>
            <div className='absolute bg-gray-700 text-white left-1/2 -translate-x-1/2 mt-1 text-sm px-1 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity'>
              LogOut
            </div>
          </div>
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
            className="fixed h-[100vh] md:hidden smallNavbar shadow-lg w-70 bg-gray-100"
          >
            <div className="text-xl smallContent md:hidden ml-5">
              <Link to="/" className="flex text-3xl mt-5 linkComponent items-center gap-2" onClick={() => { setIsOpen(false) }}>
                <Home className='' />Home
              </Link>
              <Link to="/allTrend" className="flex text-3xl linkComponent items-center gap-2" onClick={() => { setIsOpen(false) }}>
                <Shirt className='' />Collection
              </Link>
              <Link to="/watches" className="flex text-3xl linkComponent items-center gap-2" onClick={() => { setIsOpen(false) }}>
                <Watch className='' />Accessories
              </Link>
              <Link to="/luxury" className="flex text-3xl linkComponent items-center gap-2" onClick={() => { setIsOpen(false) }}>
                <ShoppingBag />Luxury
              </Link>
              <Link to="/about" className="flex text-3xl linkComponent items-center gap-2" onClick={() => { setIsOpen(false) }}>
                <Info />About
              </Link>
              <Link to="/cart" className="flex text-3xl linkComponent items-center gap-2" onClick={() => { setIsOpen(false) }}>
                <ShoppingCart />Cart
              </Link>
              <Link to="/login" className="flex text-3xl linkComponent" onClick={handleDashLogin2}>
                {!isLogin ? <div className='flex items-center gap-2'><User />Register</div> : <div className='flex items-center gap-2'><LayoutDashboard />DashBoard</div>}
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