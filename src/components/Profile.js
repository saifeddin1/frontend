import React, { useState, useEffect } from 'react'
import "../App.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { HomeData } from './HomeData';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('token')));

    const [profile, setProfile] = useState({ content: null, title: "" })
    const [profiles, setProfiles] = useState()
    const [isHidden, setIsHidden] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const BASE_URL = 'http://127.0.0.1:8000/api/profiles/';

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
            data && setProfiles(data);
            console.log("Profiles : ", profiles);
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
        } else {
            return navigate("/login");
        }

    }, [])

    function handleChange(evt) {
        const value = evt.target.value;
        setProfile({
            ...profile,
            title: value
        });
    }

    function handleFile(evt) {
        const value = evt.target.files[0];
        setProfile({
            ...profile,
            content: value
        });
    }

    const submitForm = (e) => {
        e.stopPropagation();

        e.preventDefault();
        // console.log(course);
        let data = new FormData();
        data.append('first_name', profile.first_name)
        

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
    return (

        <div className="data profile">
            <div className="page-header">
                <DashboardIcon id="Dicon" />
                <h2 id="txt">Profile </h2>

                
                
            </div>

        </div>
    )
 
}

export default Profile
