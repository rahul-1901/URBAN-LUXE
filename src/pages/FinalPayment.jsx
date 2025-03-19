import React, { use, useEffect, useState } from 'react'
import { deleteUserClothes, purchasedItems } from '../backendApi/api';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Wallet, Truck } from 'lucide-react';
import "./Cart.css";
import 'react-toastify/dist/ReactToastify.css';
import upi from "../assets/upi.png";
import razorpay from "../assets/razor.png";
import cod from "../assets/cod.png";

const FinalPayment = () => {
    const [purchased, setPurchased] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [subTotal, setSubTotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [orderStatus, setOrderStatus] = useState(false);
    const [justLoader, setJustLoader] = useState(false);

    const navigate = useNavigate();

    const fetchPurchased = async () => {
        try {
            const response = await purchasedItems();
            setPurchased(response);
            setTimeout(() => {
                setJustLoader(true);
            }, 1000)

            let total = 0;
            response.forEach((item) => {
                total += item.price;
            })
            setSubTotal(total);
            // console.log(total);

            // console.log(response)
        } catch (error) {
            console.log("Error fetching from frontend side...")
        }
    }

    useEffect(() => {
        if (subTotal > 1000) {
            setShipping(0);
        } else {
            const shippingPrice = Math.round((subTotal * 8) / 100);
            setShipping(shippingPrice);
            // conso7le.log(shippingPrice);
        }
    }, [subTotal])

    const handleOrderStatus = () => {
        if (!localStorage.getItem("orderStatus")) {
            setOrderStatus(false);
        } else if (localStorage.getItem("orderStatus") === "placed") {
            setOrderStatus(true);
        }
        // console.log(localStorage.getItem("orderStatus"))
    }

    const handleOrderPlaced = () => {
        localStorage.setItem("orderStatus", "placed");
        setTimeout(() => {
            navigate("/orderPlaced");
        }, 500)
    }

    const isFreeShipping = subTotal >= 1000;

    useEffect(() => {
        fetchPurchased();
        handleOrderStatus();
    }, [])

    return (
        <>
            {orderStatus ? (
                <div className='min-h-screen'>
                    {justLoader ? (
                        <div className='min-h-screen mt-[100px]'>
                            <div className='lg:ml-[50px] ml-[10px]'>
                                <div className='titleDesign flex mt-10'>
                                    <p className='text-center text-3xl'><span className='latest'>Your</span> Purchase</p>
                                    <div className='spanLine ml-2'></div>
                                </div>
                                <div className='flex flex-col'>
                                    {purchased.map((items) => (
                                        <div key={items._id} className='flex md:gap-10 mt-5 itemsHere justify-between'>
                                            <div className='flex md:none md:gap-10'>
                                                <div className=''>
                                                    <Link to={`/item/${items._id}`}>
                                                        <img src={items.image} className='clothesShown w-30 lg:w-35 md:w-38'></img></Link>
                                                </div>
                                                <div className='itemDescrip flex flex-col ml-2 md:ml-0'>
                                                    <p className='text-sm md:text-xl lg:text-2xl font-medium text-gray-700'>{items.name}</p>
                                                    <div className='flex gap-3 ml-[1px] mt-2'>
                                                        <p className='md:text-[20px]'>${items.price}</p>
                                                        <div className='sizeMap px-2 md:px-3 md:py-1'>
                                                            M
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex flex-col md:flex-row md:justify-center items-center md:items-start mt-2 ml-2 md:mt-4 md:ml-10 lg:ml-60 trashHere text-xl'>
                                                <div className='itemAddded w-20 mr-1 md:mr-10'>22</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="min-h-screen flex items-center justify-center mt-[70px]">
                            <div className="flex items-center gap-2">
                                {/* First dot */}
                                <div className="w-4 h-4 bg-black rounded-full animate-[bounce_1s_infinite_0ms]" />

                                {/* Second dot */}
                                <div className="w-4 h-4 bg-black rounded-full animate-[bounce_1s_infinite_200ms]" />

                                {/* Third dot */}
                                <div className="w-4 h-4 bg-black rounded-full animate-[bounce_1s_infinite_400ms]" />
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className='min-h-screen mt-[70px] mb-10'>
                    <div className={`w-full ${isFreeShipping ? 'bg-green-100' : 'bg-amber-100'} transition-all duration-300`}>
                        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-center">
                                <div className={`flex-shrink-0 flex items-center ${isFreeShipping ? 'text-green-600' : 'text-amber-600'} mt-2`}>
                                    <Truck className="h-5 w-5 mr-1.5" />
                                    <p className="font-medium text-sm sm:text-base">
                                        {isFreeShipping
                                            ? "Congratulations! You availed our FREE shipping!"
                                            : `Free shipping above ₹1000! Add ₹${1000 - subTotal} more to qualify.`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lg:ml-[50px] ml-[10px]'>
                        <div className='titleDesign flex mt-10'>
                            <p className='text-center text-3xl'><span className='latest'>Order</span> Summary</p>
                            <div className='spanLine ml-2'></div>
                        </div>
                        <div className='flex flex-col'>
                            {purchased.map((items) => (
                                <div key={items._id} className='flex md:gap-10 mt-5 itemsHere justify-between'>
                                    <div className='flex md:none md:gap-10'>
                                        <div className=''>
                                            <Link to={`/item/${items._id}`}>
                                                <img src={items.image} className='clothesShown w-30 lg:w-35 md:w-38'></img></Link>
                                        </div>
                                        <div className='itemDescrip flex flex-col ml-2 md:ml-0'>
                                            <p className='text-sm md:text-xl lg:text-2xl font-medium text-gray-700'>{items.name}</p>
                                            <div className='flex gap-3 ml-[1px] mt-2'>
                                                <p className='md:text-[20px]'>${items.price}</p>
                                                <div className='sizeMap px-2 md:px-3 md:py-1'>
                                                    M
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col md:flex-row md:justify-center items-center md:items-start mt-2 ml-2 md:mt-4 md:ml-10 lg:ml-60 trashHere text-xl'>
                                        <div className='itemAddded w-20 mr-1 md:mr-10'>22</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='mt-[30px] flex flex-col justify-center items-center'>
                        <div className='flex flex-col items-center'>
                            <h2 className="text-xl font-medium text-gray-700 flex items-center gap-2">
                                CART TOTALS
                            </h2>
                            <div className='w-[55vw] md:w-[40vw] lg:w-[20vw] h-[0.5px] bg-gray-200'>
                            </div>
                        </div>
                        <div className="mt-4 space-y-3 w-[80%] md:w-[70%] lg:w-[40%]">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">$ {subTotal}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Shipping Fee</span>
                                <span className="font-medium">$ {shipping}</span>
                            </div>

                            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                <span className="text-gray-800 font-medium">Total</span>
                                <span className="font-bold text-lg">$ {subTotal + shipping}</span>
                            </div>
                            <div className="flex justify-between items-center pt-1">
                                <span className="text-gray-800 font-medium text-xl">Payment Method</span>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row items-center gap-5 mt-2'>
                            <label
                                className={`border rounded-md py-2 px-5 w-full flex items-center cursor-pointer transition-all ${paymentMethod === 'UPI'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="UPI"
                                    checked={paymentMethod === 'UPI'}
                                    onChange={() => setPaymentMethod('UPI')}
                                    className="mr-3 h-4 w-4 text-blue-600"
                                />
                                <div className="flex items-center text-blue-500 font-semibold">
                                    <img src={upi} className='w-[80px]'></img>
                                </div>
                            </label>
                            <label
                                className={`border rounded-md py-3 px-5 w-full flex items-center cursor-pointer transition-all ${paymentMethod === 'Razorpay'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="razorpay"
                                    checked={paymentMethod === 'Razorpay'}
                                    onChange={() => setPaymentMethod('Razorpay')}
                                    className="mr-3 h-4 w-4 text-blue-600"
                                />
                                <div className="flex items-center text-blue-500 font-semibold">
                                    <img src={razorpay} className='w-[80px] py-[2.5px]'></img>
                                </div>
                            </label>
                            <label
                                className={`border rounded-md py-2 px-5 flex items-center cursor-pointer transition-all ${paymentMethod === 'COD'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="COD"
                                    checked={paymentMethod === 'COD'}
                                    onChange={() => setPaymentMethod('COD')}
                                    className="mr-3 h-4 w-4 text-blue-600"
                                />
                                <div className="flex items-center py-[6.3px] text-blue-500 font-semibold">
                                    COD(CASH)
                                </div>
                            </label>
                        </div>
                        <button onClick={() => handleOrderPlaced()} className='mt-5 md:mt-7 bg-black w-[80vw] md:w-[55vw] lg:w-[35vw] text-white py-3 cursor-pointer rounded-md'>PLACE ORDER</button>
                    </div>
                    <ToastContainer />
                </div >
            )}
        </>
    )
}

export default FinalPayment