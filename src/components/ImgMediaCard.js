import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Thumb from './course-thumb.png'

export default function ImgMediaCard({ course, deleteOne }) {
    return (
        <Card sx={{ maxWidth: 150, padding: 2, margin: "5px 20px", height: 170 }} id="card">
            <CardMedia
                component="img"
                height="60"
                width="50"
                image={Thumb}
            />
            <CardContent >
                <Typography gutterBottom variant="h6" component="div">
                    {course.title}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => deleteOne(course.id)}>delete</Button>
                <Button size="small" onClick={() => window.open(course.content)}>open</Button>
                {console.log(course.content)}

            </CardActions>
        </Card >
    );
}
