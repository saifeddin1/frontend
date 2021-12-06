import "./App.css";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import { Routes, Route, Link } from "react-router-dom";
import Profile from "./components/Profile"
import Courses from "./components/Courses"
import Timetables from "./components/Timetables"

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/timetables" element={<Timetables />} />
      </Routes>
    </div>
  );
}

export default App;
