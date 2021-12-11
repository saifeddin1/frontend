import React, { useState } from 'react';
import Home from './Home';
import { useNavigate } from 'react-router-dom';


async function loginUser(credentials) {
    return fetch('http://127.0.0.1:8000/api-token-auth/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

const LoginForm = () => {
    const [error, setError] = useState("")
    const [userInfo, setUserInfo] = useState({ username: "", password: "" })
    const [isLogged, setIsLogged] = useState(false)

    const navigate = useNavigate();

    React.useEffect(() => {
        if (JSON.parse(sessionStorage.getItem('user'))) {
            return (navigate("/"));
        }
    }, [])

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = await loginUser(userInfo)
        fetch('http://127.0.0.1:8000/api/courses', {
            headers: {
                'Authorization': `Token ${token.token}`
            },
        })

            .then(res => res.json())
            .then(data => {
                navigate("/");
                return data
            })
            .catch(err => console.log('err2', err))

        if (token.token) {
            sessionStorage.setItem('token', JSON.stringify(token.token));
            sessionStorage.setItem('user', JSON.stringify(userInfo));
            // setToken(token.token);

            setIsLogged(true);

        } else {
            setError("Invalid credentials")
        }

    }

    return (
        <form onSubmit={handleSubmit} id="login">
            <div className="form-inner">
                <h2>login</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" onChange={handleChange} value={userInfo.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" onChange={handleChange} value={userInfo.password} />

                </div>
                <input type="submit" value="Login" id="loginbtn" />
            </div>
        </form>

    )
}

export default LoginForm
