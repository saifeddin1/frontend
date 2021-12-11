import React from 'react'
import "../App.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { HomeData } from './HomeData';

const Timetables = () => {
    return (
        <div className="data timetables">
            <div className="page-header">
                <DashboardIcon id="Dicon" />
                <h2 id="txt">Timetables </h2>
            </div>
            <h2>This is your timetables</h2>

        </div>
    )
}

export default Timetables
