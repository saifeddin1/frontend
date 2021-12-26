import React, { useState, useEffect } from 'react'
import "../App.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';
import ImgMediaCard from './ImgMediaCard';
import { display } from '@mui/system';
import { IconButton, Input } from '@mui/material';


const Courses = () => {


    const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('token')));

    const [course, setCourse] = useState({ content: null, title: "" })
    const [courses, setCourses] = useState()

    const [isLoading, setIsLoading] = useState(false)
    const BASE_URL = 'http://127.0.0.1:8000/api/courses/';

    const navigate = useNavigate();

    const retrieve = async () => {
        setIsLoading(true);

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

        if (token) {
            retrieve();
        } else {
            return navigate("/login");
        }


    }, [token])



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
                    'Authorization': `Token ${token}`
                }
            }
        )

            .then(res => res.json())
            .then(data => console.log(data))
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

            <form onSubmit={submitForm} class="addCourse">
                <input type="text" name="title" value={course.title} onChange={handleChange} />
                
                <input type="file" name="content" onChange={handleFile} />
                <input type="submit" />
            </form>

            <h2>This is your courses</h2>
            {isLoading && <p>Loading...</p>}
            <section class="cards-wrapper" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                    courses?.length > 0 &&

                    courses.map((course) => {
                        return (

                            <ImgMediaCard course={course} deleteOne={deleteOne} />

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
