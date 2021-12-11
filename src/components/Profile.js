import React from 'react'
import "../App.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { HomeData } from './HomeData';

const Profile = () => {
    return (

        <div className="data profile">
            <div className="page-header">
                <DashboardIcon id="Dicon" />
                <h2 id="txt">Profile </h2>
            </div>
            <h2>This is your profile</h2>

        </div>
    )
}

export default Profile
