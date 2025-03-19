import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Cart.css";
import image from "../assets/homeStart.png";
import { Trash, Plus, ShoppingCart } from "lucide-react";
import { deleteUserClothes, purchasedItems, purchaseItems } from '../backendApi/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const [purchased, setPurchased] = useState([]);
    const [showPurchased, setShowPurchased] = useState(false);
    const [justLoader, setJustLoader] = useState(false);

    const navigate = useNavigate();
    const fetchPurchased = async () => {
        try {
            const response = await purchasedItems();
            setPurchased(response);
            setTimeout(() => {
                setJustLoader(true);
            }, 1000)
            // console.log(response)
        } catch (error) {
            console.log("Error fetching from frontend side...")
        }
    }

    useEffect(() => {
        if (Array.isArray(purchased) && purchased.length > 0) {
            setShowPurchased(true);
        } else {
            setShowPurchased(false);
        }
    }, [purchased])

    console.log(purchased)

    const handlePurchase = async (id) => {
        try {
            const response = await purchaseItems(id);
            if (response.success === false) {
                throw new Error(response.message)
            } else {
                toast.success("Item purchased", { autoClose: 1000, style: { backgroundColor: "#f3f4f6", color: "#000000" } })
            }
        } catch (error) {
            toast.error(error.message, { autoClose: 1000, style: { backgroundColor: "#f3f4f6", color: "#000000" } })
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await deleteUserClothes(id);
            toast.success(response, { autoClose: 500, style: { backgroundColor: "#f3f4f6", color: "#000000" } });
            const updatedUserClothes = await purchasedItems();
            setTimeout(() => {
                setPurchased(updatedUserClothes);
            }, 1000)
        } catch (error) {
            console.log(error)
        }
    }

    const handleProceedButton = () => {
        localStorage.removeItem("orderStatus");
        // console.log(localStorage);
        setTimeout(() => {
            navigate("/paymentDetails")
        }, 500)
    }

    useEffect(() => {
        fetchPurchased();
    }, [])

    return (
        <>
            {showPurchased ?
                (<div className='min-h-screen'>
                    {justLoader ? (
                        <div className='min-h-screen mt-[70px] mb-10'>
                            <div className='lg:ml-[60px] ml-[10px]'>
                                <div className='titleDesign flex mt-[100px]'>
                                    <p className='text-center text-3xl'><span className='latest'>YOUR</span> CART</p>
                                    <div className='spanLine ml-2'></div>
                                </div>
                                <div className='flex flex-col'>
                                    {purchased.map((items) => (
                                        <div key={items._id} className='flex md:gap-10 mt-5 itemsHere justify-between'>
                                            <div className='flex md:none md:gap-5'>
                                                <div className=''>
                                                    <Link to={`/item/${items._id}`}>
                                                        <img src={items.image} className='clothesShown w-35 lg:w-40 md:w-40'></img></Link>
                                                </div>
                                                <div className='itemDescrip flex flex-col ml-2 md:ml-0'>
                                                    <p className='text-sm md:text-sm lg:text-2xl font-medium text-gray-700'>{items.name}</p>
                                                    <div className='flex gap-3 ml-[1px] mt-2'>
                                                        <p className='md:text-[20px]'>${items.price}</p>
                                                        <div className='sizeMap px-2 md:px-3 md:py-1'>
                                                            M
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex flex-col md:flex-row md:justify-center items-center md:items-start mt-2 ml-2 md:mt-4 md:ml-10 lg:ml-60 trashHere text-xl'>
                                                {/* <div className='itemAddded w-20 mr-1 md:mr-0'>33</div> */}
                                                <button onClick={() => handleDelete(items._id)}>
                                                    <Trash size={25} className='md:ml-20 mt-2 md:mt-[2px] cursor-pointer md:mr-20' />
                                                </button>
                                                <button onClick={() => handlePurchase(items._id)}>
                                                    <Plus size={25} className='md:ml-10 mt-2 md:mt-[2px] cursor-pointer md:mr-20' />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='flex proceedButton items-center mr-2 md:mr-0 justify-end mt-10 md:mt-6'>
                                    <button onClick={handleProceedButton} className='md:mr-[5vw] w-full md:w-auto bg-black text-white font-medium py-3 px-2 md:py-2 md:px-4 cursor-pointer'>
                                        PROCEED TO PAYMENT
                                    </button>
                                </div>
                            </div>
                            <ToastContainer />
                        </div >) : (
                        <div className="min-h-screen flex items-center justify-center mt-[70px]">
                            <div className="flex items-center gap-2">
                                {/* First dot */}
                                <div className="w-4 h-4 bg-black rounded-full animate-[bounce_1s_infinite_0ms]" />

                                {/* Second dot */}
                                <div className="w-4 h-4 bg-black rounded-full animate-[bounce_1s_infinite_200ms]" />

                                {/* Third dot */}
                                <div className="w-4 h-4 bg-black rounded-full animate-[bounce_1s_infinite_400ms]" />
                            </div>
                        </div>)
                    }
                </div>) :
                (<div className='min-h-screen flex justify-center items-center'>
                    <div className='flex flex-col justify-center items-center'>
                        <div className=''>
                            <ShoppingCart size={64} className="text-gray-400" />
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h1>
                        <Link to="/allTrend">
                            <button className="bg-[oklch(0.373_0.034_259.733)] hover:bg-[oklch(0.373_0.054_259.733)] text-white font-medium py-2 px-6 rounded-md cursor-pointer">
                                Start Shopping
                            </button>
                        </Link>
                    </div>
                </div>)
            }

        </>
    )
}

export default Cart