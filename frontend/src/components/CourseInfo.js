import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CourseInfo.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

import Cookies from "universal-cookie";


export default function CourseInfo(props) {
  const [loading, setLoading] = useState(true);
  const [courseInfo, setCourseInfo] = useState([]);
  let { course_id } = useParams();
  const cookies = new Cookies();


  function handleButtonChange(message) {
    const enrollButton = document.getElementById("enrollButton");
    enrollButton.disabled = true;
    enrollButton.innerHTML = message;
    enrollButton.classList.remove("btn-primary");
    enrollButton.classList.add("btn-success");
  }

  function handleEnrollButton(course_id) {
    props.setProgress(20);

    if (cookies.get("access_token")) {

      const loadData = async function () {
        const { data } = await axios.post(
          "https://eduversebackend.pythonanywhere.com/api/enrollments",
          { course_id: course_id },
          { headers: { Authorization: "JWT " + cookies.get("access_token") } }
        );

        if (data.success === "true") {
          handleButtonChange("Enrolled");
          document.getElementById("gotoLessonsButton").classList.remove("hidden");
        } else if (data.success === "false") {

        }
      };
      loadData();
    } else {
      alert("You have to login to enroll for a Course.");
      setLoading(false);
    }

    props.setProgress(100);
  };



  useEffect(() => {
    props.setProgress(20);

    const loadData = async function () {
      var headers;
      if (cookies.get("access_token")) {
        headers = { headers: { Authorization: "JWT " + cookies.get("access_token") } };
      }
      else {
        headers = {}
      }
      const { data } = await axios.get("https://eduversebackend.pythonanywhere.com/api/courses/" + course_id + "/content", headers);
      setCourseInfo(data.results);
      setLoading((loading) => !loading);

      props.setProgress(100);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div id="mainCourseInfoFrame" className="container">
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
      <div id="mainCourseInfoFrame" className="container">
        <div id="courseHeadingFrame">
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
                <a id="breadCrumbLink">{courseInfo.course_display_name}</a>
              </li>
            </ol>
          </nav>
          <h1 id="courseHeading">{courseInfo.course_display_name}</h1>
          {
            (courseInfo.is_enrolled) ?
              <>
                <button id="enrollButton" type="button" className="btn btn-success" style={{ fontSize: "20px" }} disabled>Already Enrolled</button>
                <Link to={"/courses/" + courseInfo.course_id + "/lessons/1"}><button id="gotoLessonsButton" type="button" className="btn btn-primary" style={{ fontSize: "20px", marginLeft: "10px" }}>Go to Lessons</button></Link>
              </>
              :
              <>
                <button id="enrollButton" type="button" className="btn btn-primary" style={{ fontSize: "20px" }} onClick={() => handleEnrollButton(courseInfo.course_id)}>
                  <img width="25" height="25" style={{ marginRight: "10px", marginTop: "-5px" }} src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/000000/external-signature-online-shopping-vitaliy-gorbachev-lineal-vitaly-gorbachev.png" alt="external-signature-online-shopping-vitaliy-gorbachev-lineal-vitaly-gorbachev" />
                  Enroll for Free</button>
                <Link to={"/courses/" + courseInfo.course_id + "/lessons/1"}><button id="gotoLessonsButton" type="button" className="btn btn-primary hidden" style={{ fontSize: "20px", marginLeft: "10px" }}>Go to Lessons</button></Link>
              </>
          }

          <div style={{ marginTop: "20px", marginRight: "20px" }}
            id="courseAbout"
            dangerouslySetInnerHTML={{ __html: courseInfo.course_description }}
          ></div>
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist" style={{ marginTop: "20px" }}>
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">About</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Outcomes</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pills-syllabus-tab" data-bs-toggle="pill" data-bs-target="#pills-syllabus" type="button" role="tab" aria-controls="pills-syllabus" aria-selected="false">Syllabus</button>
            </li>

          </ul>
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
              <div
                id="courseAbout"
                dangerouslySetInnerHTML={{ __html: courseInfo.course_about }}
              ></div>
            </div>
            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">
              <div
                id="courseAbout"
                dangerouslySetInnerHTML={{ __html: courseInfo.course_outcomes }}
              ></div>
            </div>
            <div className="tab-pane fade" id="pills-syllabus" role="tabpanel" aria-labelledby="pills-syllabus-tab" tabindex="0">
              <ol className="list-group list-group-numbered" style={{ width: "95%" }}>
                {courseInfo.course_lessons.map((data) => (
                  <li className="list-group-item lessonLink">
                    <Link to={"/courses/" + courseInfo.course_id + "/lessons/" + data.lesson_number} style={{ textDecoration: "none", color: "white" }}>{data.name}</Link></li>


                ))}
              </ol>
            </div>

          </div>

        </div>

        <div id="courseInfoRightDIV">

          <img alt="" style={{ height: "230px", width: "100%", objectFit: "cover" }} src={courseInfo.course_image_url}></img>


          <p id="courseAbout" style={{ marginTop: "2rem", color: "wheat", fontSize: "12px" }}>Subject</p>
          <h5 id="courseAboutHeading" style={{ marginTop: "-18px" }}>
            {courseInfo.course_subject}
          </h5>
          <p id="courseAbout" style={{ marginTop: "1.2rem", color: "wheat", fontSize: "12px" }}>Skills Attainable</p>
          <h5 id="courseAboutHeading" style={{ marginTop: "-18px" }}>
            {courseInfo.course_skills}
          </h5>
          <p id="courseAbout" style={{ marginTop: "1.2rem", color: "wheat", fontSize: "12px" }}>Mastery Level</p>
          <h5 id="courseAboutHeading" style={{ marginTop: "-18px" }}>
            {courseInfo.course_level}
          </h5>
          <p id="courseAbout" style={{ marginTop: "1.2rem", color: "wheat", fontSize: "12px" }}>Instructors</p>
          <h5 id="courseAboutHeading" style={{ marginTop: "-18px" }}>
            {courseInfo.course_instructors}
          </h5>
          <p id="courseAbout" style={{ marginTop: "1.2rem", color: "wheat", fontSize: "12px" }}>Duration</p>
          <h5 id="courseAboutHeading" style={{ marginTop: "-18px" }}>
            {courseInfo.course_duration}
          </h5>


        </div>
      </div >
    );
  }
}
