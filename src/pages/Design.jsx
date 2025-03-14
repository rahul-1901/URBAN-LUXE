import React, { useState, useEffect } from 'react';
import videoFashion from "../assets/clothesPage.mp4";
import "./Design.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Design = () => {
    const [showLuxury, setShowLuxury] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowLuxury(true);
        }, 1000)
    }, [])

    const handleOnClick = () => {
        toast.warn("Coming Soon...", {autoClose: 1000, position: "top-center", style: { backgroundColor: "#f3f4f6", color: "#000000" }})
    }

    return (
        <>
            {showLuxury ? (<div className='min-h-screen'>
                <div className='relative h-[100vh] mt-[70px]'>
                    <div className='absolute inset-0'>
                        <video
                            className="w-full h-full object-cover"
                            src={videoFashion}
                            autoPlay
                            loop
                            muted
                            playsInline
                        >
                        </video>
                        <div className="absolute inset-0 bg-gray-900 opacity-30"></div>
                    </div>
                    <div className="relative flex justify-center items-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="luxText flex flex-col text-center mt-0 md:mt-10">
                            <p className="text-5xl md:text-7xl font-semibold lg:text-8xl text-white">
                                Luxury Collection
                            </p>
                            <p className="mt-2 md:mt-6 text-xl md:text-3xl lg:text-4xl text-white max-w-3xl mx-auto">
                                Where Fashion Meets Comfort
                            </p>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-20 sliderTitle">
                    <h2 className="text-2xl mb-2 text-gray-600 tracking-wide uppercase">Prestigious Houses</h2>
                    <p className="mt-1 text-5xl text-gray-900">
                        World-Renowned Designers
                    </p>
                </div>
                <div className='brandSlider'>
                    <div className='slider flex'>
                        <div className='sliderImage'>
                            <p>UrbanVogue</p>
                        </div>
                        <div className='sliderImage'>
                            <p>HypeWear</p>
                        </div>
                        <div className='sliderImage'>
                            <p>ModeX</p>
                        </div>
                        <div className='sliderImage'>
                            <p>GUCCI</p>
                        </div>
                        <div className='sliderImage'>
                            <p>Velaré</p>
                        </div>
                        <div className='sliderImage'>
                            <p>Élan</p>
                        </div>
                        <div className='sliderImage'>
                            <p>Verde</p>
                        </div>
                        <div className='sliderImage'>
                            <p>Levis</p>
                        </div>
                        <div className='sliderImage'>
                            <p>Prada</p>
                        </div>

                        <div className='sliderImage'>
                            <p>UrbanVogue</p>
                        </div>
                        <div className='sliderImage'>
                            <p>HypeWear</p>
                        </div>
                        <div className='sliderImage'>
                            <p>ModeX</p>
                        </div>
                        <div className='sliderImage'>
                            <p>GUCCI</p>
                        </div>
                        <div className='sliderImage'>
                            <p>Velaré</p>
                        </div>
                        <div className='sliderImage'>
                            <p>Élan</p>
                        </div>
                        <div className='sliderImage'>
                            <p>Verde</p>
                        </div>
                        <div className='sliderImage'>
                            <p>Levis</p>
                        </div>
                        <div className='sliderImage'>
                            <p>Prada</p>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-10 sliderTitle">
                    <p className="mt-1 text-5xl text-gray-900 md:mb-10">
                        Luxury Suits
                    </p>
                </div>
                <div className='luxurySection flex flex-col gap-1 md:gap-10 mb-20 md:mb-10'>
                    <div className='flex justify-center items-center gap-4 md:gap-10 p-4 lg:p-0'>
                        <div className='overflow-hidden rounded-md' onClick={handleOnClick}>
                            <div className='luxuryItem h-80 md:h-120 lg:w-89 lg:h-130 cursor-pointer'>
                                <img
                                    className='w-full h-full rounded-md object-cover object-center'
                                    src="https://images.unsplash.com/photo-1673610178158-1c4c5b7e4d98?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHN1aXRzJTIwd29tZW58ZW58MHx8MHx8fDA%3D"
                                />
                            </div>
                        </div>
                        <div className='overflow-hidden rounded-md' onClick={handleOnClick}>
                            <div className='luxuryItem h-70 md:h-100 lg:w-78 lg:h-110 cursor-pointer overflow-hidden'>
                                <img
                                    className='w-full h-full rounded-md'
                                    src="https://images.unsplash.com/photo-1553984658-d17e19aa281a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fHN1aXRzJTIwd29tZW58ZW58MHx8MHx8fDA%3D"
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center items-center gap-4 md:gap-5 lg:gap-10 p-4 lg:p-2'>
                        <div className='overflow-hidden rounded-md' onClick={handleOnClick}>
                            <div className='luxuryItem md:h-100 lg:w-97 lg:h-130 cursor-pointer'>
                                <img
                                    className='w-full h-full rounded-md object-cover object-center'
                                    src="https://images.unsplash.com/photo-1621335829175-95f437384d7c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1lbiUyMHN1aXRzfGVufDB8fDB8fHww"
                                />
                            </div>
                        </div>
                        <div className='overflow-hidden rounded-md' onClick={handleOnClick}>
                            <div className='luxuryItem md:h-70 lg:w-60 lg:h-90 cursor-pointer'>
                                <img
                                    className='w-full h-full rounded-md object-cover object-center'
                                    src="https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVuJTIwc3VpdHN8ZW58MHx8MHx8fDA%3D"
                                />
                            </div>
                        </div>
                        <div className='overflow-hidden rounded-md' onClick={handleOnClick}>
                            <div className='luxuryItem md:h-90 lg:w-80 lg:h-110 cursor-pointer overflow-hidden'>
                                <img
                                    className='w-full h-full rounded-md'
                                    src="https://images.unsplash.com/photo-1619533394727-57d522857f89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVuJTIwc3VpdHN8ZW58MHx8MHx8fDA%3D"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-10 sliderTitle">
                    <p className="mt-1 text-5xl text-gray-900 md:mb-10">
                        Top Designs
                    </p>
                </div>
                <div className='luxurySection flex flex-col gap-10 mb-10'>
                    <div className='flex justify-center items-center gap-2 md:gap-4 lg:gap-10 p-4 md:p-5 lg:p-5'>
                        <div className='overflow-hidden rounded-sm' onClick={handleOnClick}>
                            <div className='luxuryItem md:h-130 lg:w-97 lg:h-143 cursor-pointer'>
                                <img
                                    className='w-full h-full rounded-sm object-cover object-center'
                                    src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600"
                                />
                            </div>
                        </div>
                        <div className='overflow-hidden rounded-sm' onClick={handleOnClick}>
                            <div className='luxuryItem md:h-80 lg:w-80 lg:h-110 cursor-pointer overflow-hidden'>
                                <img
                                    className='w-full h-full rounded-sm'
                                    src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                />
                            </div>
                        </div>
                        <div className='overflow-hidden rounded-sm' onClick={handleOnClick}>
                            <div className='luxuryItem md:h-100 lg:w-95 lg:h-130 cursor-pointer'>
                                <img
                                    className='w-full h-full rounded-sm object-cover object-center'
                                    src="https://images.unsplash.com/photo-1550639525-c97d455acf70?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZHJlc3N8ZW58MHx8MHx8fDA%3D"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row items-center justify-center gap-0 md:gap-5 lg:gap-10 mt-60 md:mt-50 lg:mt-5'>
                    <div className='tradition text-5xl md:text-7xl mt-[-10rem] mb-2 md:mb-0'>
                        <p>Tranditional Wear</p>
                    </div>
                    <div className='flex imageFlex justify-center items-center gap-4 mb-20'>
                        <img className='expanded w-[50px] hover:w-[280px] md:w-[80px] object-cover object-center cursor-pointer' src="https://i.pinimg.com/474x/ec/be/19/ecbe1981d674987652b20dbc1bb90f19.jpg" onClick={handleOnClick}/>
                        <img className='expanded w-[50px] md:w-[80px] hover:w-[280px] object-cover object-center cursor-pointer' src="https://i.pinimg.com/474x/ce/8c/ca/ce8cca13b86452128d15f0ecc840489d.jpg" onClick={handleOnClick}/>
                        <img className='expanded w-[50px] md:w-[80px] hover:w-[280px] object-cover object-center cursor-pointer' src="https://i.pinimg.com/474x/5f/f0/9f/5ff09f3dd039041466be765c8ea06f25.jpg" onClick={handleOnClick}/>
                        <img className='expanded w-[50px] md:w-[80px] hover:w-[280px] object-cover object-center cursor-pointer' src="https://i.pinimg.com/474x/d5/e4/b7/d5e4b7c06a92900029bdc810c20736be.jpg" onClick={handleOnClick}/>
                        <img className='expanded w-[50px] md:w-[80px] hover:w-[280px] object-cover object-center cursor-pointer' src="https://i.pinimg.com/474x/36/33/0e/36330e82189c3aed40b1d7552ce991a0.jpg" onClick={handleOnClick}/>
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

export default Design