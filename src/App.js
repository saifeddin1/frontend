import "./App.css"
import Home from "./components/Home";
import { Routes, Route, Link } from "react-router-dom";
import Profile from "./components/Profile"
import Courses from "./components/Courses"
import Timetables from "./components/Timetables"
import LoginForm from "./components/LoginForm";
import WelcomeScreen from "./components/WelcomeScreen";

function App() {
  return (
    <div className="App"  >

      <Routes>
        <Route path="login" element={<LoginForm />} />
        <Route exact path="/" element={<Home />}>
          <Route index element={<WelcomeScreen />} />
          <Route path="profile" element={<Profile />} />
          <Route path="courses" element={<Courses />} />
          <Route path="timetables" element={<Timetables />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
