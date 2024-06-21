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
import HowTo from "./components/HowTo";
import SignUp from "./components/SignUp";


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
          <SideMenu />
          <Routes>
            <Route path="/" element={<MainWindow setProgress={setProgress} pageID="featured" key="featured" />} />
            <Route path="/howto" element={<HowTo setProgress={setProgress} key="how-to" />} />
            <Route path="/discover/top-250" element={<MainWindow setProgress={setProgress} pageID="top-250" key="top-250" />} />
            <Route path="/games" element={<MainWindow setProgress={setProgress} pageID="all-games" key="all-games" />} />
            <Route path="/courses" element={<MainWindow setProgress={setProgress} pageID="courses" key={0} />} />
            <Route path="/login" element={<Login setProgress={setProgress} key="login" />} />
            <Route path="/signup" element={<SignUp setProgress={setProgress} key="signup" />} />
            <Route path="/courses/:course_id" element={<CourseInfo setProgress={setProgress} key="gameInfo" />} />

            {/* <Route path="/genres/:genre_slug" element={<MainWindow setProgress={setProgress} pageID="genre-games" key="genre-games" />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
