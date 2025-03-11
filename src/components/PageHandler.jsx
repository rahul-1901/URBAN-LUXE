import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PageHandler = ({ setIsAuthenticated }) => {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const data = localStorage.getItem("userToken");
        if (data) {
            setIsAuthenticated(true);
            if (location.pathname === "/login") {
                navigate('/dashBoard', { replace: false })
            }
        }
    }, [location, navigate, setIsAuthenticated])

    return null;
}

export default PageHandler