import React from 'react'
import { HomeData } from './HomeData';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from "react-router-dom";
import ClassIcon from '@mui/icons-material/Class';
import EventNoteIcon from '@mui/icons-material/EventNote';

const WelcomeScreen = ({ Loggeduser }) => {
    const ITEMS = [{
    
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
    const [user, setUser] = React.useState(JSON.parse(sessionStorage.getItem('user')));

    return (
        <div className="data welcome">
            <div className="page-header">
                <DashboardIcon id="Dicon" />
                <h2 id="txt"> {`Welcome ${user?.username} `} </h2>
            </div>

            {

                <div className='box'>
                     {
                    ITEMS.map((el) => {

                        return (
                            <Link to={el.link}>
                                <div className='box1'>
                                <p className='txt1'>{el.title}</p>
                                </div>
                                
                            </Link>
                        )
                    }
                    )
                }
                </div>
            }

        </div >
    )
}

export default WelcomeScreen
