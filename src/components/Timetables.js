import React, { useState, useEffect } from 'react'
import "../App.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import ImgMediaCard from './ImgMediaCard';
import Thumb from '../timetable.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Timetables = () => {

    const [timetable, setTimetable] = useState({ content: null, classe: null })
    const [timetables, setTiemtables] = useState()
    const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('token')));
    const [isHidden, setIsHidden] = useState(true)

    const BASE_URL = 'http://127.0.0.1:8000/api/timetables/';

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
            data && setTiemtables(data);
            // console.log("Courses : ", timetables);
            // setIsLoading(false)
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


    }, [])



    // function handleChange(evt) {
    //     const value = evt.target.value;
    //     setTimetable({
    //         ...timetable,
    //         title: value
    //     });
    // }

    function handleFile(evt) {
        const value = evt.target.files[0];
        setTimetable({
            ...timetable,
            content: value
        });
    }

    const submitForm = (e) => {
        e.stopPropagation();

        e.preventDefault();
        // console.log(course);
        let data = new FormData();
        // data.append('title', course.title)
        data.append('content', timetable.content)

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

        setTiemtables(timetables.filter((timetable) => timetable.id !== key))

    }


    return (
        <div className="data timetables">
            <div className="page-header">
                <DashboardIcon id="Dicon" />
                <h2 id="txt">Timetables </h2><br />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBlock: '1rem' }}>

                <h3>Add Timetable</h3>&nbsp; &nbsp; <Button variant={'contained'} onClick={() => setIsHidden(!isHidden)}>
                    {isHidden ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                </Button>
            </div>
            {
                isHidden ? "" :
                    <form onSubmit={submitForm} class="addCourse">
                        <input type="file" accept="application/pdf" class="custom-file-input" name="content" onChange={handleFile} />
                        <Button variant="contained" type="submit">Add</Button>
                        {/* 
<input type="submit" /> */}
                    </form>
            }


            <h2>This is your timetables</h2>
            <section class="cards-wrapper" >
                {
                    timetables?.length > 0 &&
                    timetables.map((timetable) => {
                        return (
                            <ImgMediaCard thumb={Thumb} object={timetable} deleteOne={deleteOne} />
                        )
                    })
                }
            </section>
        </div>

    )
}

export default Timetables
