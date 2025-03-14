import React, { useEffect, useState } from 'react';
import { Shield, Clock, Headphones, Users, Heart, Package } from 'lucide-react';
import aboutUs from "../assets/aboutUs.png";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const bulletPoints = [
    {
        icon: Shield,
        title: 'Quality Assurance',
        description: 'Every product in our collection undergoes rigorous quality checks'
    },
    {
        icon: Clock,
        title: 'Fast Delivery',
        description: 'Quick and reliable shipping to your doorstep'
    },
    {
        icon: Headphones,
        title: '24/7 Support',
        description: 'Our dedicated team is always here to help you'
    }
]

const About = () => {

    const ourNumbers = [
        { number: '10K+', label: 'Happy Customers' },
        { number: '5K+', label: 'Products' },
        { number: '99%', label: 'Satisfaction Rate' },
        { number: '24/7', label: 'Support' }
    ]

    const [loader, setLoader] = useState(false);

    const loaderCheck = () => {
        try {
            setTimeout(() => {
                setLoader(true);
            }, 1000)
        } catch (error) {
            console.error("Error on aboutPage...")
        }
    }

    useEffect(() => {
        loaderCheck();
    }, [])
    return (
        <>
            {loader ? (
                <div className="min-h-screen bg-white mt-[70px]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className='flex items-center animateAppear'>
                                    <p className='text-3xl'><span className='latest'>ABOUT</span> US</p>
                                    <div className='spanLine ml-2'></div>
                                </div>
                                <p className="text-lg text-gray-600 leading-relaxed animateAppear">
                                    <span className='font-semibold'>URBAN LUXE</span> was born out of a passion for innovation and a desire to revolutionize the way people shop online.
                                    Our journey began with a simple idea: to provide a platform where customers can easily discover, explore,
                                    and purchase a wide range of products from the comfort of their homes.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed animateAppear">
                                    We believe in revolutionizing the way people shop online. Our platform is built on the foundation
                                    of providing seamless, enjoyable shopping experiences that bring joy to our customers' lives.
                                </p>
                                <div className="flex items-center gap-4 animateAppear">
                                    <Heart className="h-6 w-6 text-indigo-600" />
                                    <p className="text-gray-700">Passionate about customer satisfaction</p>
                                </div>
                                <div className="flex items-center gap-4 animateAppear">
                                    <Users className="h-6 w-6 text-indigo-600" />
                                    <p className="text-gray-700">Building long lasting relationships</p>
                                </div>
                            </div>
                            <div className="relative animateAppear">
                                <img
                                    src={aboutUs}
                                    alt="About*Us"
                                    className="rounded-lg shadow-xl"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 py-16">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 animateAppear">Why Choose Us</h2>
                                <p className="mt-4 text-lg text-gray-600 animateAppear">
                                    We're committed to providing the best possible shopping experience
                                </p>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8">
                                {bulletPoints.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 animateAppear"
                                    >
                                        <item.icon className="h-12 w-12 text-indigo-600 mb-4" />
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="py-16 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                {ourNumbers.map((stat, index) => (
                                    <div key={index} className="text-center animateAppear">
                                        <p className="text-4xl font-bold text-gray-700 mb-2">{stat.number}</p>
                                        <p className="text-gray-600">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="py-16 mb-10">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 animateAppear">Join Our Journey</h2>
                                <p className="mt-4 text-lg text-gray-600 animateAppear">
                                    Be part of our growing community of satisfied customers
                                </p>
                            </div>

                            <div className="flex justify-center mt-[-20px]">
                                <Link to="/" className='linkComp'>
                                    <button className="px-6 py-4 bg-gray-700 text-white rounded-full hover:bg-gray-900 transition-colors duration-300 flex items-center gap-2 animateAppear cursor-pointer">
                                        <Package className="h-5 w-5" />
                                        Start Shopping
                                    </button>
                                </Link>
                            </div>
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
    );
};

export default About;