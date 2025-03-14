import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import "./Home.css";
import { Loader2, Star } from 'lucide-react';
import { bestSellers, getClothes } from '../backendApi/api';
import "../components/animate.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [isShaking, setIsShaking] = useState(false);
    const [clothes, setClothes] = useState([]);
    const [showitems, setShowitems] = useState(false);
    const [bestSeller, setBestSeller] = useState([]);

    const navigate = useNavigate();
    const itemsFetched = async () => {
        try {
            const response = await getClothes();
            setTimeout(() => {
                setClothes(response);
                setShowitems(true);
            }, 1500);
        } catch (error) {
            console.error("Can't show on home...");
        }
    }

    const fetchBestsellers = async () => {
        try {
            const response_sec = await bestSellers();
            setBestSeller(response_sec);
        } catch (error) {
            console.log("Error showing bestSellers on home...")
        }
    }

    useEffect(() => {
        itemsFetched();
        fetchBestsellers();
    }, [])

    return (
        <>
            {showitems ? (
                <div>
                    <div className='startPart flex md:bg-[69%_25%] bg-center mt-[70px] h-[100vh]'>
                        <div className='attention text-white z-200 flex flex-col items-center md:mt-10'>
                            <h1 className='md:text-5xl text-4xl text-gray-100'>Summer Collection</h1>
                            <p className='md:text-2xl text-xl text-gray-100'>Discover the latest trends</p>
                            <motion.button
                                onClick={() => {
                                    setIsShaking(true);
                                    setTimeout(() =>
                                        setIsShaking(false), 1000);
                                    setTimeout(() => {
                                        navigate("/allTrend")
                                    }, 500)
                                }}
                                animate={isShaking ? { x: [-5, 5, -5, 5, 0] } : {}}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className='mt-3 cursor-pointer rounded-sm'
                            >
                                Shop Now
                            </motion.button>
                        </div>
                        <div className='blurLayer flex top-0 left-0' />
                    </div>

                    <div className='diffSection flex flex-wrap mt-24 gap-12'>
                        <Link to="/comming">
                            <div className='redSec animateAppear'>
                                <div className='firstBlur flex flex-col'>
                                    {/* <p className='text-xl'>Luxury Collection</p> */}
                                    <Link to="/comming">
                                        <p className='text-xl'>Shop</p>
                                    </Link>
                                </div>
                            </div>
                        </Link>
                        <Link to="/luxury">
                            <div className='secSec animateAppear'>
                                <div className='first1Blur flex flex-col'>
                                    {/* <p className='text-xl'>Luxury Collection</p> */}
                                    <Link to="/luxury">
                                        <a className='text-xl underLine'>Shop</a>
                                    </Link>
                                </div>
                            </div>
                        </Link>
                        <Link to="/watches">
                            <div className='thirdSec animateAppear'>
                                <div className='first2Blur flex flex-col'>
                                    {/* <p className='text-xl'>Luxury Collection</p> */}
                                    <Link to="/watches">
                                        <a className='text-xl'>Shop</a>
                                    </Link>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className=''>
                        <div className='boundLine flex animateAppear'>
                            <p className='text-center text-3xl'><span className='latest'>LATEST</span> COLLECTIONS</p>
                            <div className='spanLine ml-2'></div>
                        </div>
                        <div className='clothesCollection flex-wrap px-10'>
                            {clothes.slice(0, 8).map((dress) => (
                                <div className='dress mt-7 animateAppear' key={dress._id}>
                                    <Link to={`/item/${dress._id}`}>
                                        <div className='cloth'>
                                            <img src={dress.image} className='image'></img>
                                        </div>
                                    </Link>
                                    <p className='text-sm'>{dress.name}</p>
                                    <p className='font-bold'>${dress.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='newSeason flex flex-wrap mt-35 mb-25 md:p-12 p-10'>
                        <div className='leftSide flex flex-col md:p-10 md:w-[52%]'>
                            <p className='new1 text-4xl animateAppear'>New Season Arrival</p>
                            <p className='new2 text-2xl mt-3 animateAppear'>Get ready for the changing season with our latest collection. Up to 40% off on selected items.</p>
                            <Link className='w-[170px]' onClick={(e) => e.preventDefault()}>
                                <motion.button
                                    onClick={() => {
                                        setIsShaking(true);
                                        setTimeout(() => {
                                            setIsShaking(false);
                                            window.location.href = "/comming";
                                        }, 700);
                                    }}
                                    animate={isShaking ? { x: [-5, 5, -5, 5, 0] } : {}}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                    className='mt-3 cursor-pointer p-3 mt-8 animateAppear'
                                >
                                    Explore Collection
                                </motion.button>
                            </Link>

                        </div>
                        <div className='seasonImg mt-10 md:mt-0 w-[100%] md:w-[48%] md:h-[400px] h-[250px] animateAppear' />
                    </div>

                    <div className=''>
                        <div className='boundLine flex animateAppear'>
                            <p className='text-center text-3xl'><span className='latest'>BEST</span> SELLERS</p>
                            <div className='spanLine ml-2'></div>
                        </div>
                        <div className='clothesCollection mt-10 flex-wrap'>
                            {bestSeller.slice(0, 4).map((bestItems) => (
                                <div className='dress animateAppear' key={bestItems._id}>

                                    <Link to={`/item/${bestItems._id}`}>
                                        <div className='cloth'>
                                            <img src={bestItems.image} className='image'></img>
                                        </div>
                                    </Link>
                                    <p>{bestItems.name}</p>
                                    <p className='font-bold'>${bestItems.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='mt-45 bg-gray-50 p-5'>
                        <div className='flex customerRe md:mt-10 mt-8 animateAppear'>
                            <p className='md:text-4xl text-3xl'>
                                What Our Customers Say
                            </p>
                        </div>
                        <div className='flex flex-wrap allReview mt-10 mb-10 gap-10'>
                            <div className='firstReview flex flex-col md:h-[190px] p-5 rounded-[10px] bg-white animateAppear'>
                                <div className="flex mt-2 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 md:w-5 h-4 md:h-5 fill-current text-yellow-400" />
                                    ))}
                                </div>
                                <p className='text-gray-500'>"Exceptional quality and style.
                                    The attention to detail and customer service is outstanding.
                                    Will definitely shop here again!"</p>
                                <p className='mt-2 ml-1'>-Rahul Yadav</p>
                            </div>
                            <div className='firstReview flex flex-col md:h-[190px] p-2 rounded-[10px] bg-white animateAppear'>
                                <div className="flex mt-2 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 md:w-5 h-4 md:h-5 fill-current text-yellow-400" />
                                    ))}
                                </div>
                                <p className='text-gray-500'>"Absolutely love the quality and craftsmanship! 
                                    Every piece feels premium, and the customer service was beyond helpful. 
                                    Will be a returning customer!"</p>
                                <p className='mt-2 ml-1'>-Dakshita Sharma</p>
                            </div>
                            <div className='firstReview flex flex-col md:h-[190px] p-2 rounded-[10px] bg-white animateAppear'>
                                <div className="flex mt-2 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 md:w-5 h-4 md:h-5 fill-current text-yellow-400" />
                                    ))}
                                </div>
                                <p className='text-gray-500'>"Exceeded my expectations! 
                                    The material feels luxurious, and the design is flawless. 
                                    Plus, the team was super responsive. 
                                    Definitely a five-star experience!"</p>
                                <p className='mt-2 ml-1'>-Disha</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-wrap lastBox md:mt-25 mt-20 gap-10 mb-30'>
                        <div className='menBox md:h-[300px] h-[180px] animateAppear'>
                            <Link to="/allTrend" className='aa'>
                                <button className='px-7 py-3 cursor-pointer font-semibold'>Shop</button>
                            </Link>
                            <div className='boxBlur'></div>
                        </div>
                        <div className='womenBox md:h-[300px] h-[180px] animateAppear'>
                            <Link to="/allTrend" className='aa'>
                                <button className='px-7 py-3 cursor-pointer font-semibold'>Shop</button>
                            </Link>
                            <div className='boxBlur'></div>
                        </div>
                    </div>
                    <ToastContainer/>
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
        </>
    )
}

export default Home;