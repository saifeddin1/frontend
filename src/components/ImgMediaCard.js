import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard({ object, deleteOne, thumb, profile }) {
    return (
        <Card sx={{ maxWidth: 150, padding: 1, margin: "15px 20px", height: 170 }} id="card">
            <CardMedia
                component="img"
                height="60"
                width="50"
                image={thumb}
            />
            <CardContent >
                <Typography gutterBottom component="p" id="courseTitle" >
                    {object?.title}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => window.open(object?.content)}>open</Button>

                {profile?.role === "admin" && <Button size="small" onClick={() => deleteOne(object?.id)}>delete</Button>}
            </CardActions>
        </Card >
    );
}
