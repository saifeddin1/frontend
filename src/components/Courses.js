import React, { useState, useEffect } from 'react'
import "../App.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';
import ImgMediaCard from './ImgMediaCard';
import { Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Thumb from '../course-thumb.png'



const Courses = () => {


    const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('token')));
    const [user, setUser] = React.useState(JSON.parse(sessionStorage.getItem('user')));
    const [profile, setProfile] = React.useState()

    const [course, setCourse] = useState({ content: null, title: "" })
    const [courses, setCourses] = useState()
    const [isHidden, setIsHidden] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const BASE_URL = 'http://127.0.0.1:8000/api/courses/';

    const PROFILE_BASE_URL = 'http://127.0.0.1:8000/api/profiles/';
    const retrieveProfile = async () => {

        try {
            const res = await fetch(PROFILE_BASE_URL, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            const data = await res.json()
            let curr = data.filter(el => el.username === user?.username)[0]
            setProfile(curr)

        }
        catch (err) {
            console.log(err)
        }
    }

    React.useEffect(() => {

        if (token) {
            retrieveProfile();
        } else {
            return navigate("/login");
        }


    }, [])

    const navigate = useNavigate();

    const retrieve = async () => {

        try {
            const res = await fetch(BASE_URL, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            const data = await res.json()

            console.log("Data : ", data);
            console.log("Token : ", token);
            data && setCourses(data);
            console.log("Courses : ", courses);
            setIsLoading(false)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setIsLoading(true);

        if (token) {
            retrieve();
            console.log("PRRRROFIKE", profile);
        } else {
            return navigate("/login");
        }


    }, [])



    function handleChange(evt) {
        const value = evt.target.value;
        setCourse({
            ...course,
            title: value
        });
    }

    function handleFile(evt) {
        const value = evt.target.files[0];
        setCourse({
            ...course,
            content: value
        });
    }

    const submitForm = (e) => {
        e.stopPropagation();

        e.preventDefault();
        // console.log(course);
        let data = new FormData();
        data.append('title', course.title)
        data.append('content', course.content)

        fetch(BASE_URL,
            {
                method: "POST",
                body: data,
                headers: {
                    'Authorization': ` ${token}`
                }
            }
        )

            .then(res => res.json())
            .then(result => { console.clear(); console.log(result); retrieve(); })
            .catch(err => console.log(err))


    }

    const deleteOne = (key) => {
        fetch(BASE_URL + key,
            {
                method: "DELETE",

                headers: {
                    'Authorization': `Token ${token}`
                }
            }
        )

            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

        setCourses(courses.filter((course) => course.id !== key))

    }





    return (
        <div className="data courses">
            <div className="page-header">
                <DashboardIcon id="Dicon" />
                <h2 id="txt">Courses </h2>
            </div>
            {profile?.role !== "student" &&
                <div style={{ display: 'flex', alignItems: 'center', marginBlock: '1rem' }}>

                    <h3>Add Course</h3>&nbsp; &nbsp; <Button variant={'contained'} onClick={() => setIsHidden(!isHidden)}>
                        {isHidden ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                    </Button>
                </div>
            }
            {
                isHidden ? "" :

                    <form onSubmit={submitForm} class="addCourse">
                        <input type="text" name="title" value={course.title} onChange={handleChange} />
                        <input type="file" accept="application/pdf" class="custom-file-input" name="content" onChange={handleFile} />
                        <Button variant="contained" type="submit">Add</Button>
                        {/* 
                <input type="submit" /> */}
                    </form>
            }

            <h2>This is your courses</h2>
            {isLoading && <p>Loading...</p>}
            <section class="cards-wrapper" >
                {
                    courses?.length > 0 &&

                    courses.map((course) => {
                        return (

                            <ImgMediaCard thumb={Thumb} profile={profile} object={course} deleteOne={deleteOne} />

                        )
                    })

                    // :
                    // "loading"
                }
            </section>


        </div >
    )
}

export default Courses
