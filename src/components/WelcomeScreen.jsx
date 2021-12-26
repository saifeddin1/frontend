import React from 'react'
import { HomeData } from './HomeData';
import DashboardIcon from '@mui/icons-material/Dashboard';

const WelcomeScreen = ({ Loggeduser }) => {
    const [user, setUser] = React.useState(JSON.parse(sessionStorage.getItem('user')));

    return (
        <div className="data welcome">
            <div className="page-header">
                <DashboardIcon id="Dicon" />
                <h2 id="txt"> {`Welcome ${user?.username} `} </h2>
            </div>

            {

                <h1>Hello world</h1>
            }

        </div >
    )
}

export default WelcomeScreen
