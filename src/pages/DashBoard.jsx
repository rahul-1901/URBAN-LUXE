import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { dashBoardDetails } from '../backendApi/api';

const DashBoard = () => {
    const [userData, setUserData] = useState({});

    const userDetai = async () => {
        try {
            const response = await dashBoardDetails();
            setUserData(response);
        } catch (error) {
            console.log("Error here...")
        }
    }

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userEmail");
        toast.success("Logout successfull...", { autoClose: 1000, style: { backgroundColor: "#f3f4f6", color: "#000000" } })
        setTimeout(() => {
            navigate('/login');
        }, 2000)
        // if(localStorage.getItem("userToken")) {
        //     console.log(localStorage.getItem("userToken"));
        // }
        // console.log(localStorage)
    }

    useEffect(() => {
        userDetai();
    }, [])

    return (
        <div className="min-h-screen p-4 mt-50">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
                        <button className="flex items-center px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 cursor-pointer" onClick={handleLogout}>
                            <span>Logout</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500 mb-1">Name</p>
                            <p className="font-medium text-lg">{userData.name}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500 mb-1">Email</p>
                            <p className="font-medium text-lg">{userData.email}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center mb-4">
                        <h2 className="text-xl font-semibold">My Orders</h2>
                    </div>

                    <div className="overflow-x-auto shadow">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Order ID</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                                    <th className="text-right py-3 px-4 font-medium text-gray-600">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 font-medium"></td>
                                    <td className="py-3 px-4 text-gray-600"></td>
                                    <td className="py-3 px-4">
                                    </td>
                                    <td className="py-3 px-4 text-right font-medium"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default DashBoard