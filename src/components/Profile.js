import React, { useState, useEffect } from 'react'
import "../App.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';

const Profile = ({ profile, setProfile, user, setUser, token, setToken }) => {



    const BASE_URL = 'http://127.0.0.1:8000/api/profiles/';

    // useEffect(() => {
    //     console.log(profile);
    // }, [])
    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.stopPropagation();

        e.preventDefault();
        // console.log(course);


        fetch(BASE_URL + profile.id + '/',
            {
                method: "PUT",
                body: JSON.stringify(profile),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': ` ${token}`
                }

            }
        )

            .then(res => res.json())
            .then(result => { console.clear(); console.log(result); })
            .catch(err => console.log(err))


    }



    return (

        <div className="data profile">
            <div className="page-header">
                <DashboardIcon id="Dicon" />
                <h2 id="txt">Profile </h2>
            </div>

            <form style={{ display: "flex", flexDirection: "column", "paddingInline": "3rem" }} onSubmit={handleSubmit}>

                <label>
                    First Name
                </label>
                <input type="text" value={profile?.first_name} name="first_name" onChange={handleChange} />
                <label>
                    Last Name
                </label>
                <input type="text" value={profile?.last_name} name="last_name" onChange={handleChange} />
                <label>
                    CIN
                </label>
                <input type="text" value={profile?.cin} name="cin" onChange={handleChange} />

                <label>
                    Birthdate
                </label>
                <input type="date" value={profile?.birthdate} name="birthdate" onChange={handleChange} />
                <label>
                    Email
                </label>
                <input type="text" value={profile?.email} name="email" onChange={handleChange} />
                {
                    profile?.role === "student" &&
                    <label>
                        Classe &nbsp; <strong>{profile?.profile_classe}</strong>
                    </label>
                }


                <input type="submit" value="Modifier" style={{ padding: '1rem', backgroundColor: "#cef" }} />
            </form>

        </div>
    )

}

export default Profile
