import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./LessonPage.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

import Cookies from "universal-cookie";


export default function LessonPage(props) {
  const [loading, setLoading] = useState(true);
  const [courseInfo, setLessonPage] = useState([]);
  let { course_id } = useParams();
  const cookies = new Cookies();

  function handleEnrollButton(course_id) {
    props.setProgress(20);

    if (cookies.get("access_token")) {
      // setLoading(true);
      const loadData = async function () {
        const { data } = await axios.post(
          "http://127.0.0.1:8000/api/enrollments",
          { course_id: course_id },
          { headers: { Authorization: "JWT " + cookies.get("access_token") } }
        );
        // setLoading(false);
        if (data.success === "true") {
          const enrollButton = document.getElementById("enrollButton");
          enrollButton.disabled = true;
          enrollButton.innerHTML = "Enrolled";
          enrollButton.classList.remove("btn-primary");
          enrollButton.classList.add("btn-success");
        } else if (data.success === "false") {
          // setUserLogged(false);
        }
      };
      loadData();
    } else {
      alert("Login first.");
      setLoading(false);
    }

    props.setProgress(100);
  };



  useEffect(() => {
    props.setProgress(20);

    const loadData = async function () {
      const { data } = await axios.get("http://127.0.0.1:8000/api/courses/" + course_id + "/content");
      setLessonPage(data.results);
      // console.log(data);
      setLoading((loading) => !loading);
      props.setProgress(100);
    };

    loadData();
  }, []);

  // document.body.style.backgroundImage =
  //   "linear-gradient(to bottom, rgba(245, 246, 252, 0.4), rgba(117, 19, 93, 0.73)), url('" +
  //   courseInfo.background_image +
  //   "')";

  // document.body.style.backgroundSize = "100%";
  // document.body.style.backgroundRepeat = "no-repeat";

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

          <button id="enrollButton" type="button" class="btn btn-primary" style={{ fontSize: "20px" }} onClick={() => handleEnrollButton(courseInfo.course_id)}>
            <img width="25" height="25" style={{ marginRight: "10px", marginTop: "-5px" }} src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/000000/external-signature-online-shopping-vitaliy-gorbachev-lineal-vitaly-gorbachev.png" alt="external-signature-online-shopping-vitaliy-gorbachev-lineal-vitaly-gorbachev" />
            Enroll for Free</button>

          <div style={{ marginTop: "20px", marginRight: "20px" }}
            id="courseAbout"
            dangerouslySetInnerHTML={{ __html: courseInfo.course_description }}
          ></div>
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist" style={{ marginTop: "20px" }}>
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">About</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Outcomes</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="pills-syllabus-tab" data-bs-toggle="pill" data-bs-target="#pills-syllabus" type="button" role="tab" aria-controls="pills-syllabus" aria-selected="false">Syllabus</button>
            </li>

          </ul>
          <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
              <div
                id="courseAbout"
                dangerouslySetInnerHTML={{ __html: courseInfo.course_about }}
              ></div>
            </div>
            <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">
              <div
                id="courseAbout"
                dangerouslySetInnerHTML={{ __html: courseInfo.course_outcomes }}
              ></div>
            </div>
            <div class="tab-pane fade" id="pills-syllabus" role="tabpanel" aria-labelledby="pills-syllabus-tab" tabindex="0">
              <ol class="list-group list-group-numbered" style={{ width: "95%" }}>
                {courseInfo.course_lessons.map((data) => (
                  <li class="list-group-item lessonLink">
                    <Link style={{textDecoration:"none", color:"white"}}>{data.name}</Link></li>


                ))}
              </ol>
            </div>

          </div>

        </div>

        <div id="courseInfoRightDIV">

          <img style={{ height: "230px", width: "100%", objectFit: "cover" }} src={courseInfo.course_image_url}></img>


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
      </div>
    );
  }
}
