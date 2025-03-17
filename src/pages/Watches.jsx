import React, { use, useEffect, useState } from 'react';
import "./Watches.css";
// import { getWatches } from '../backendApi/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import watchVideo from "../assets/video.mp4";

const allWatches = [
    {
        id: 1,
        name: "Royal Oak Chronograph",
        category: "luxury",
        price: 25000,
        rating: 5,
        image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdhdGNofGVufDB8fDB8fHww",
        featured: true
    },
    {
        id: 2,
        name: "Nautilus Blue Dial",
        category: "luxury",
        price: 35000,
        rating: 5,
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1059&q=80",
        featured: true
    },
    {
        id: 3,
        name: "Submariner Date",
        category: "luxury",
        price: 12000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
    },
    {
        id: 4,
        name: "Speedmaster Professional",
        category: "luxury",
        price: 6000,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
    },
    {
        id: 5,
        name: "G-Shock Mudmaster",
        category: "sport",
        price: 350,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1595520407624-66b84ae7314f?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
        new: true
    },
    {
        id: 6,
        name: "Prospex Diver",
        category: "sport",
        price: 450,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80"
    },
    {
        id: 7,
        name: "Weekender Chronograph",
        category: "casual",
        price: 120,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80",
        sale: true
    },
    {
        id: 8,
        name: "Classic Leather",
        category: "casual",
        price: 180,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
    },
    {
        id: 11,
        name: "Vintage Datejust",
        category: "luxury",
        price: 8500,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHdhdGNofGVufDB8fDB8fHww"
    },
    {
        id: 12,
        name: "Fitness Tracker Pro",
        category: "smart",
        price: 1459,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHdhdGNofGVufDB8fDB8fHww",
        sale: true
    },
    {
        id: 13,
        name: "Oyster Perpetual",
        category: "smart",
        price: 1490,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1633869699811-cd4f63049b36?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHdhdGNofGVufDB8fDB8fHww",
        sale: true
    },
    {
        id: 13,
        name: "Constellation Pie-Pan",
        category: "smart",
        price: 149,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1554151447-b9d2197448f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdhdGNoZXN8ZW58MHx8MHx8fDA%3D",
        sale: true
    },
    {
        id: 13,
        name: "Fitness Tracker Pro",
        category: "smart",
        price: 149,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1619134778706-7015533a6150?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdhdGNoZXN8ZW58MHx8MHx8fDA%3D",
        sale: true
    }
];

const womenWatches = [
    {
        id: 1,
        name: "Lady-Datejust",
        category: "smart",
        price: 2009,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1623998021450-85c29c644e0d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fHdhdGNofGVufDB8fDB8fHww",
        sale: true
    },
    {
        id: 2,
        name: "Ballon Bleu de Cartier",
        category: "smart",
        price: 24311,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1592865239912-7153891acf4a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tZW4lMjB3YXRjaGVzfGVufDB8fDB8fHww",
        sale: true
    },
    {
        id: 3,
        name: "De Ville Ladymatic",
        category: "smart",
        price: 34900,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1657159810148-f6a1f3d74f7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdvbWVuJTIwd2F0Y2hlc3xlbnwwfHwwfHx8MA%3D%3D",
        sale: true
    },
    {
        id: 4,
        name: "Rendez-Vous Night & Day",
        category: "smart",
        price: 19399,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1615860756652-d1efbcb5d784?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d29tZW4lMjB3YXRjaGVzfGVufDB8fDB8fHww",
        sale: true
    },
    {
        id: 5,
        name: "Patrimony Small Model",
        category: "smart",
        price: 54599,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1658973071034-0710cd4296a4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdvbWVuJTIwd2F0Y2hlc3xlbnwwfHwwfHx8MA%3D%3D",
        sale: true
    },
    {
        id: 6,
        name: "Égérie Moon Phase",
        category: "smart",
        price: 46799,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1658973070926-4b1511f7ec83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHdvbWVuJTIwd2F0Y2hlc3xlbnwwfHwwfHx8MA%3D%3D",
        sale: true
    },
    {
        id: 6,
        name: "Calatrava Ladies",
        category: "smart",
        price: 23599,
        rating: 4.3,
        image: " https://images.unsplash.com/photo-1615860569277-929587c4ac7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW4lMjB3YXRjaGVzfGVufDB8fDB8fHww",
        sale: true
    }
]

const advancedWatches = [
    {
        id: 10,
        name: "Galaxy Watch 4",
        category: "smart",
        price: 249,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80"
    },
    {
        id: 9,
        name: "Apple Watch Series 7",
        category: "smart",
        price: 399,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
        new: true
    },
    {
        id: 9,
        name: "Samsung Galaxy Watch 6",
        category: "smart",
        price: 599,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1530518119128-ca0bd1a0643b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjB3YXRjaGVzfGVufDB8fDB8fHww",
        new: true
    }
]

const Watches = () => {
    // const [getAllWatches, setGetAllWatches] = useState([]);

    // const fetchAllWatches = async () => {
    //     try {
    //         const response = await getWatches();
    //         setGetAllWatches(response);
    //     } catch (error) {
    //         console.log("frontend error watches")
    //     }
    // }

    // useEffect(() => {
    //     fetchAllWatches();
    // }, [])

    const [showWatches, setShowWatches] = useState(false);

    const handlePurchase = () => {
        toast.warn("Coming Soon...", { autoClose: 1000, position: "top-center", style: { backgroundColor: "#f3f4f6", color: "#000000" } })
    }

    useEffect(() => {
        setTimeout(() => {
            setShowWatches(true);
        }, 1000)
    }, [])

    return (
        <div>
            {showWatches ? (
                <div className='bg-white'>
                    <div className="relative h-[100vh] mt-[70px]">
                        <div className="absolute inset-0">
                            <video
                                className="w-full h-full object-cover"
                                src={watchVideo}
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                        </div>
                        <div className="relative flex justify-center items-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="textClass flex flex-col text-center mt-0 md:mt-10">
                                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-gray-300">
                                    Our Watch Collection
                                </h1>
                                <p className="mt-6 text-sm md:text-xl text-gray-300 max-w-3xl mx-auto">
                                    Discover timepieces for every style, occasion, and budget.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2 animateAppear">Premium Collection</h2>
                        <div className="flex flex-wrap justify-around gap-10 mb-20 mt-4">
                            {allWatches.slice(0, 4).map((items) => (
                                <div className='h-[300px] w-[220px] overflow-hidden rounded-md  animateAppear'>
                                    <div className='overflow-hidden rounded-md' onClick={handlePurchase}>
                                        <div className='imageWatches w-full min-h-70 bg-red-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-60 lg:aspect-none cursor-pointer'>
                                            <img
                                                src={items.image}
                                                className='w-full min-h-70 object-center object-cover'
                                            ></img>
                                        </div>
                                    </div>
                                    <div className='flex justify-between p-1'>
                                        <h3 className='text-gray-700 text-sm'>{items.name}</h3>
                                        <p className='text-sm font-medium text-gray-900'>${items.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2 mt-10 animateAppear">Men's Collection</h2>
                        <div className='flex flex-wrap justify-around mb-20'>
                            {allWatches.slice(7, 12).map((item) => (
                                <div className='container mt-10 h-63 w-80 overflow-hidden animateAppear'>
                                    <div className='card w-full h-full overflow-hidden'>
                                        <div className='cardImg overflow-hidden h-54 cursor-pointer' onClick={handlePurchase}>
                                            <img
                                                src={item.image}
                                                className='w-full h-full object-center object-cover'
                                            ></img>
                                        </div>
                                        <div className='cardInfo'>
                                            <p className='apnCard'><span>${item.price}</span></p>
                                        </div>
                                        <div className='cardInfo1'>
                                            <p><span className=''>{item.name}</span></p>
                                        </div>
                                        <div className='curve_one'></div>
                                        <div className="curve_two"></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2 mt-10 animateAppear">Women's Collection</h2>
                        <div className='flex flex-wrap justify-around gap-8 mb-20'>
                            {womenWatches.slice(0, 7).map((item) => (
                                <div className='h-[310px] w-[250px] animateAppear overflow-hidden rounded-md transition-all duration-300 ease-out transform hover:-rotate-y-12 hover:shadow-2xl cursor-pointer' onClick={handlePurchase}>
                                    <div className='overflow-hidden rounded-md'>
                                        <div className='imageWatches w-full min-h-70 bg-red-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-60 lg:aspect-none cursor-pointer'>
                                            <img
                                                src={item.image}
                                                className='w-full min-h-70 object-center object-cover'
                                            ></img>
                                        </div>
                                    </div>
                                    <div className='flex justify-between p-1'>
                                        <h3 className='text-gray-700 text-sm'>{item.name}</h3>
                                        <p className='text-sm font-medium text-gray-900'>${item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2 mt-10 animateAppear">Wearable Tech</h2>
                        <div className='flex flex-wrap justify-around mb-15'>
                            {advancedWatches.slice(0, 3).map((item) => (
                                <div className='container mt-10 h-63 w-80 overflow-hidden  animateAppear'>
                                    <div className='card w-full h-full overflow-hidden'>
                                        <div className='cardImg overflow-hidden h-54 cursor-pointer' onClick={handlePurchase}>
                                            <img
                                                src={item.image}
                                                className='w-full h-full object-center object-cover'
                                            ></img>
                                        </div>
                                        <div className='cardInfo'>
                                            <p className='apnCard'><span>${item.price}</span></p>
                                        </div>
                                        <div className='cardInfo1'>
                                            <p><span className=''>{item.name}</span></p>
                                        </div>
                                        <div className='curve_one'></div>
                                        <div className="curve_two"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <ToastContainer />
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
    );
};

export default Watches;
