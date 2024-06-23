import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./LessonPage.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

import Cookies from "universal-cookie";


export default function LessonPage(props) {
  const [loading, setLoading] = useState(true);
  const [lessonData, setLessonPage] = useState([]);
  let { course_id, lesson_number } = useParams();
  const cookies = new Cookies();
  useEffect(() => {
    props.setProgress(20);

    const loadData = async function () {
      const { data } = await axios.get("http://127.0.0.1:8000/api/courses/" + course_id + "/lessons");
      setLessonPage(data.results);
      setLoading((loading) => !loading);
      props.setProgress(100);
    };

    loadData();





  }, []);

  // if (!loading){
  //   var x = document.getElementById("lesson_1");
  // console.log(x)
  // // x.classList.add("active")
  // }
  // else{
  //   console.log("hello")
  // }

  if (loading) {
    return (
      <div id="mainLessonPageFrame" className="container">
        <div className="center-screen">
          <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div id="mainLessonPageFrame" className="container">
        <div id="lessonHeadingFrame">
          <nav id="breadCrumbMain" aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" id="breadCrumbLink">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Link to="/courses" id="breadCrumbLink">
                  Courses
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Link to={"/courses/" + course_id} id="breadCrumbLink">
                  {lessonData.course_display_name}
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <a id="breadCrumbLink">Lessons</a>
              </li>
            </ol>
          </nav>
          <div className="d-flex align-items-start" style={{ width: "100%", marginTop: "30px" }}>
            {/* <p>{(lesson_number === 1) ? "nav-link active" : "nav-link"}</p> */}
            <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              {lessonData.course_lessons.map((data) => (

                <button style={{ fontSize: "17px" }} className={(data.lesson_number === parseInt(lesson_number)) ? "nav-link active" : "nav-link"} id={"lesson_" + data.lesson_number} data-bs-toggle="pill" data-bs-target={"#v-pills-" + data.lesson_number} type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">{data.lesson_name}</button>
              ))}
            </div>
            <div className="tab-content" id="v-pills-tabContent" style={{ width: "100%" }}>
              {lessonData.course_lessons.map((data) => (
                <div className={(data.lesson_number === parseInt(lesson_number)) ? "tab-pane show active" : "tab-pane"} id={"v-pills-" + data.lesson_number} role="tabpanel" aria-labelledby="v-pills-home-tab">
                  <div style={{ color: "white" }} dangerouslySetInnerHTML={{ __html: data.lesson_description }}></div>
                  <br /><br />
                  <center>
                    <button id="enrollButton" type="button" class="btn btn-primary" style={{ fontSize: "20px" }}>
                      <img width="25" height="25" style={{ marginRight: "10px", marginTop: "-5px" }} src="https://img.icons8.com/material-outlined/24/task-completed.png" alt="task-completed" />
                      Mark as Completed</button>
                  </center>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    );
  }
}
