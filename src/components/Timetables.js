import React from 'react'
 import "../App.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { HomeData } from './HomeData';

const Timetables = () => {
    return (
        <div>
             <div className="home">
            timetables
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
        </div>
    )
}

export default Timetables
