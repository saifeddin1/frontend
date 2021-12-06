import React from 'react';
import "../App.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { HomeData } from './HomeData';


function Home() {
    return (
        <div className="home">
            <div className="data"><DashboardIcon id="Dicon" /> <h2 id="txt">Tableau de board</h2></div>

            {HomeData.map((val, key)=> {
                return (
                    <div className="box"
                    className="row"
                    id={window.location.pathname == val.link}
                    key={key} 
                    onClick={()=> {window.location.pathname=val.link;
                    }}> 
                        <div className="box1"> <h2 className="txt1">{val.title}</h2> </div>
                    </div>
                    
                
                )
            })}
            
        </div>
    )
}

export default Home
