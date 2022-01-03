import React from 'react'
import "../App.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImgMediaCard from './ImgMediaCard';
import Thumb from './course-thumb.png'
import { HomeData } from './HomeData';

const Timetables = () => {
    return (
        <div className="data timetables">

            <div className="page-header">
                <DashboardIcon id="Dicon" />
                <h2 id="txt">Timetables </h2><br />


            </div>

            <h2>This is your timetables</h2>
            <Card sx={{ maxWidth: 150 }} style={{ marginTop: '50px' }}>
                <CardMedia

                    component="img"
                    height="140"
                    image={Thumb}

                    alt="Emploie"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">

                    </Typography>
                    <Typography variant="body2" color="text.secondary">

                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => window.open("./course-thumb.png", "_blank")} >open</Button>
                    <Button size="small">Delete</Button>
                </CardActions>
            </Card>
        </div>

    )
}

export default Timetables
