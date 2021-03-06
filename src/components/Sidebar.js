import React from 'react';
import "../App.css";
import SideBarItem from './SideBarItem';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ClassIcon from '@mui/icons-material/Class';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";



function Sidebar({ setToken }) {

    const ITEMS = [{
        title: "Home",
        icon: <HomeIcon />,
        link: "/",
    },

    {
        title: "Profile",
        icon: <PersonIcon />,
        link: "/profile",
    },

    {
        title: "Cours",
        icon: <ClassIcon />,
        link: "/courses",
    },

    {
        title: "Emplois",
        icon: <EventNoteIcon />,
        link: "/timetables",
    },


    ]

    const logout = () => {
        sessionStorage.clear();
        setToken("");
    }

    return (
        <div className="Sidebar">
            <div className="SidebarList">

                {

                    ITEMS.map((el) => {

                        return (


                            <Link to={el.link}>

                                <SideBarItem title={el.title} icon={el.icon} />
                            </Link>
                        )
                    }
                    )
                }
                <p className="logout"> <SideBarItem title={"Log out"} icon={<LogoutIcon />} onClick={logout} /></p>
            </div>
        </div>
    )



}

export default Sidebar
