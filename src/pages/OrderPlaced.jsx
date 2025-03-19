import React, { useEffect, useState } from 'react';
import { finalOrderPage, purchasedItems } from '../backendApi/api';
import { Package, Truck, CreditCard, Calendar, CheckCircle } from 'lucide-react';
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderPlaced = () => {
    const [finalOrderDetails, setFinalOrderDetails] = useState([]);
    const [bought, setBought] = useState([]);
    const [showLoader, setShowLoader] = useState(false);

    const fetchOrderdetails = async () => {
        try {
            const response = await finalOrderPage();
            setFinalOrderDetails(response);
            setTimeout(() => {
                setShowLoader(true);
            }, 600)
            // console.log(response)
        } catch (error) {
            console.log("Error...");
        }
    }

    const fetchPurchased = async () => {
        try {
            const response = await purchasedItems();
            setBought(response);
            // console.log(response)
        } catch (error) {
            console.log("Error fetching from frontend side...")
        }
    }


    const orderDate = () => {
        const date = new Date();
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    }

    const deliveryDate = () => {
        const date = new Date();
        return `${date.getDate() + 5}-${date.getMonth() + 1}-${date.getFullYear()}`
    }

    const wordsValue = () => {
        if (bought.length > 1) {
            return "items"
        } else if (bought.length === 1) {
            return "item"
        }
    }

    useEffect(() => {
        fetchOrderdetails();
        fetchPurchased();
    }, [])

    return (
        <>
            {showLoader ? (
                <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 mt-10 mb-5">
                    <div className="bg-white rounded-xl shadow-md max-w-2xl w-full overflow-hidden">

                        <div className="bg-green-50 p-6 border-b border-green-100">
                            <div className="flex items-center">
                                <CheckCircle className="text-green-500 mr-3" size={28} />
                                <div>
                                    <h1 className="text-2xl font-semibold text-gray-800">Order Placed Successfully</h1>
                                    <p className="text-gray-600">Thank you for your purchase!</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <p className="text-sm text-gray-500">Order Number</p>
                                    <p className="font-medium">#ORD-{new Date().getFullYear()}-{Math.round(Math.random() * (5000 - 2222 + 1)) + 2222}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Order Date</p>
                                    <p className="font-medium">{orderDate()}</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-start">
                                    <Package className="text-gray-400 mr-3 mt-1" size={20} />
                                    <div>
                                        <p className="text-sm text-gray-500">Items Purchased</p>
                                        <p className="font-medium"> {bought.length} {wordsValue()}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Truck className="text-gray-400 mr-3 mt-1" size={20} />
                                    <div>
                                        <p className="text-sm text-gray-500">Shipping Address</p>
                                        <p className="font-medium">{finalOrderDetails.houseAddress}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Calendar className="text-gray-400 mr-3 mt-1" size={20} />
                                    <div>
                                        <p className="text-sm text-gray-500">Estimated Delivery</p>
                                        <p className="font-medium">{deliveryDate()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 mt-8">
                                <a className='flex-1' href='https://www.google.com/maps/search/iit+jodhpur/@26.4750698,73.1156574,331m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoASAFQAw%3D%3D' target='_blank'>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white w-full font-medium py-2 px-6 rounded-lg cursor-pointer">
                                        Track Order
                                    </button>
                                </a>
                                <Link to="/finalPayment" className='flex-1'>
                                    <button className="text-white font-medium py-2 px-6 rounded-lg bg-[oklch(0.373_0.034_259.733)] hover:bg-[oklch(0.373_0.054_259.733)] w-full cursor-pointer">
                                        View Order Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
                            <p className="text-sm text-gray-500">
                                Need help? <a href="#" className="text-blue-600 hover:underline">Contact our support team</a>
                            </p>
                        </div>
                    </div>
                    <ToastContainer/>
                </div>
            ) : (
                <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl font-bold text-gray-800 mb-10">Processing Your Order</h1>
                        <div className="relative w-32 h-32 mb-10">
                            <div className="absolute inset-0">
                                <div className="w-full h-full rounded-full border-8 border-gray-200"></div>
                                <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-green-500 border-t-transparent animate-spin"></div>
                            </div>
                        </div>

                        <p className="text-xl text-gray-600 text-center max-w-md">
                            Please wait while we process your order...
                        </p>
                    </div>
                    <ToastContainer/>
                </div>
            )}
        </>
    )
}

export default OrderPlaced;