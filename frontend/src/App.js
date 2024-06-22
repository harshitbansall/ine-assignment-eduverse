import "./App.css";
import MainWindow from "./components/MainWindow";
import SideMenu from "./components/SideMenu";
import TopNavbar from "./components/TopNavbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CourseInfo from "./components/CourseInfo";
import Footer from "./components/Footer";
import Login from "./components/Login";
import LoadingBar from 'react-top-loading-bar'
import React, { useState } from "react";
import SignUp from "./components/SignUp";
import LessonPage from "./components/LessonPage";


function App() {
  const [progress, setProgress] = useState(0);
  document.body.style.backgroundImage = "radial-gradient(circle, black, #020c1b , black)";
  return (
    <div>
      <BrowserRouter>
        <TopNavbar />
        <LoadingBar
          color='#75135D'
          progress={progress}
        />

        <div id="mainFrame">
          {/* <SideMenu /> */}
          <Routes>
            <Route path="/" element={<><SideMenu /><MainWindow setProgress={setProgress} pageID="featured" key="featured" /></>} />
            <Route path="/courses" element={<><SideMenu /><MainWindow setProgress={setProgress} pageID="courses" key={0} /></>} />
            <Route path="/login" element={<Login setProgress={setProgress} key="login" />} />
            <Route path="/signup" element={<SignUp setProgress={setProgress} key="signup" />} />
            <Route path="/courses/:course_id" element={<CourseInfo setProgress={setProgress} key="courseInfo" />} />
            <Route path="/courses/:course_id/lessons/:lesson_id" element={<LessonPage setProgress={setProgress} key="lessonPage" />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
