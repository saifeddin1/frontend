import "./App.css"
import React from 'react'
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile"
import Courses from "./components/Courses"
import Timetables from "./components/Timetables"
import LoginForm from "./components/LoginForm";
import WelcomeScreen from "./components/WelcomeScreen";
import { useNavigate } from 'react-router-dom';

function App() {
  const [token, setToken] = React.useState(JSON.parse(sessionStorage.getItem('token')));
  const [user, setUser] = React.useState(JSON.parse(sessionStorage.getItem('user')));

  const [profile, setProfile] = React.useState()

  const BASE_URL = 'http://127.0.0.1:8000/api/profiles/';
  const navigate = useNavigate()
  const retrieveProfile = async () => {

    try {
      const res = await fetch(BASE_URL, {
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


  return (
    <div className="App"  >

      <Routes>
        <Route path="login" element={<LoginForm />} />
        <Route exact path="/" element={<Home />}>
          <Route index element={<WelcomeScreen />} />
          <Route path="profile" element={<Profile token={token} setToken={setToken} user={user} setUser={setUser} profile={profile} setProfile={setProfile} />} />
          <Route path="courses" element={<Courses user={user} setUser={setUser} profile={profile} setProfile={setProfile} />} />
          <Route path="timetables" element={<Timetables profile={profile} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
