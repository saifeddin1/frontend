import React, { useState, useEffect } from 'react';
import "../App.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { HomeData } from './HomeData';
import { Route, Routes, useNavigate, Outlet } from "react-router-dom";
import LoginForm from './LoginForm';
import Sidebar from './Sidebar';


function Home() {

    const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('token')));

    const [courses, setCourses] = useState()

    const [isLoading, setIsLoading] = useState(false)
    const BASE_URL = 'http://127.0.0.1:8000/api/courses/';

    const navigate = useNavigate();

    const retrieve = async () => {
        setIsLoading(true);

        try {
            const res = await fetch(BASE_URL, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            const data = await res.json()

            console.log("Data : ", data);
            console.log("Token : ", token);
            data && setCourses(data);
            console.log("Courses : ", courses);
            setIsLoading(false)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {

        if (token) {
            retrieve();
        } else {
            return navigate("/login");
        }


    }, [token])





    return (

        <div className="home">
            <Sidebar setToken={setToken} />
            <Outlet />
        </div>

    )

}
export default Home
