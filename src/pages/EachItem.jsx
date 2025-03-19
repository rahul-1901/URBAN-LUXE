import React, { useEffect, useState } from 'react';
import { itemById, purchaseItems } from '../backendApi/api';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Loader2 } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../backendApi/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EachItem = () => {
    const [itemShow, setItemShow] = useState(null);
    const { id } = useParams();
    const [selectedSize, setSelectedSize] = useState('');
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    const fetchedItem = async () => {
        try {
            const response = await itemById(id);
            setTimeout(() => {
                setItemShow(response);
            }, 2000);
            // console.log(response);
        } catch (error) {
            console.error("Error...");
        }
    }

    // const handlePurchase = async(id) => {
    //     const token = localStorage.getItem("userToken");
    //     try {
    //         const response = await axios.post(`${API_BASE_URL}/api/user/clothes/${id}`, {}, {
    //             headers: {Authorization: `Bearer ${token}`}
    //         });
    //         console.log(response.data);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const handlePurchase = async (id) => {
        try {
            const response = await purchaseItems(id);
            if (!localStorage.getItem("userToken")) {
                throw new Error("Login to purchase items...", { cause: "Not logined" })
            } else if (response.success === false || !localStorage.getItem("userToken")) {
                // return toast.error(response.message);
                throw new Error(response.message);
            } else {
                toast.success(response.message, { autoClose: 1000, style: { backgroundColor: "#f3f4f6", color: "#000000" } })
                // console.log(response.purchasedClothes)
            }
        } catch (error) {
            toast.error(error.message, { autoClose: 1000, style: { backgroundColor: "#f3f4f6", color: "#000000" } });
        }
    }

    useEffect(() => {
        fetchedItem();
    }, [id])

    const getRandom = Math.floor(Math.random() * (90 - 0 + 1)) + 0;
    const realPrice = itemShow ? itemShow.price + getRandom : "Loading...";
    // console.log(realPrice);
    const discountPercentage = itemShow ? (realPrice - itemShow.price) / (itemShow.price) : "Loading...";
    // console.log(discountPercentage * 100)
    const randomPurchase = Math.floor(Math.random() * (560 - 300 + 1)) + 300;

    return (
        <div className="min-h-screen mt-[70px]">
            {itemShow ? (
                <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
                        <div className="hidden md:block md:col-span-1">
                            <div className="bg-gray-100 overflow-hidden">
                                <img
                                    src={itemShow.image}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-5">
                            <div className="aspect-[3/4] bg-gray-100 rounded-md overflow-hidden">
                                <img
                                    src={itemShow.image}
                                    alt="Men's Shirt"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-5 flex flex-col mt-6 md:mt-0">
                            <h1 className="text-2xl md:text-2xl text-gray-700 font-semibold">{itemShow.name}</h1>

                            <div className="flex items-center mt-4">
                                <div className="flex">
                                    {[...Array(4)].map((_, i) => (
                                        <Star key={i} className="w-4 md:w-5 h-4 md:h-5 fill-current text-orange-400" />
                                    ))}
                                    <Star className="w-4 md:w-5 h-4 md:h-5 fill-current text-gray-200" />
                                </div>
                                <span className="ml-2 text-sm text-gray-600">({randomPurchase})</span>
                            </div>

                            <div className="mt-4 flex items-center gap-2">
                                <p className="text-2xl md:text-3xl font-semibold text-gray-900">${itemShow.price}</p>
                                <span className='text-xl line-through text-gray-500 font-semibold mt-1'>${realPrice}</span>
                                <span className='text-xl font-semibold mt-1 text-green-700'>{Math.floor(discountPercentage * 100)}% off</span>
                            </div>

                            <p className="mt-4 md:mt-6 text-sm md:text-base text-gray-600 leading-relaxed">
                                {itemShow.description}
                            </p>

                            <div className="mt-6 md:mt-8">
                                <h3 className="text-base font-medium text-gray-900">Select Size</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`py-2 px-4 text-sm cursor-pointer font-medium rounded ${selectedSize === size
                                                ? 'border-2 border-orange-500 cursor-pointer'
                                                : 'border border-gray-200 hover:border-gray-300 cursor-pointer'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => handlePurchase(itemShow._id)}
                                className="mt-6 md:mt-8 w-full md:w-48 bg-black text-white py-3 px-6 rounded hover:bg-gray-900 transition-colors text-sm font-medium cursor-pointer">
                                ADD TO CART
                            </button>
                            <div className="mt-6 md:mt-8 space-y-2 text-sm md:text-base text-gray-600">
                                <p>100% Original product.</p>
                                <p>Cash on delivery is available on this product.</p>
                                <p>Easy return and exchange policy within 7 days.</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="min-h-screen flex items-center justify-center">
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
            <ToastContainer />
        </div>
    );
}

export default EachItem;