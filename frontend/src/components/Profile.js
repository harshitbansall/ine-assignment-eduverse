import React, { useEffect, useState, useLocation } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
import { TailSpin } from "react-loader-spinner";
import Cookies from "universal-cookie";

export default function Profile(props) {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  // const state = useLocation();


  useEffect(() => {
    setLoading(true);
    props.setProgress(20);

    const loadData = async function () {
      var headersData;
      if (cookies.get("access_token")) {
        headersData = { headers: { Authorization: "JWT " + cookies.get("access_token") } }
      } else {
        headersData = {}
      }
      const { data } = await axios.get("https://eduversebackend.pythonanywhere.com/api/enrollments", headersData);
      setCourses(data.results.courses);

      setLoading(false);
      props.setProgress(100);

    };

    loadData();


  }, []);



  if (loading) {
    return (
      <div id="profileMainFrame" className="container">

        <div className="center-screen">

          <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            visible={true}
          />
        </div>
      </div>
    );
  } else {
    return (

      <div id="profileMainFrame">
        <h1 id="mainWindowHeading">Enrolled Courses</h1>
        <div id="profileMainWindowGrid">
          {courses.map((data) => (

            <div
              id="courseCard"
              key={data.course_id}
              className="zoom"
            >
              <Link
                to={"/courses/" + data.course_id + "/lessons/1"}
                style={{ textDecoration: "none" }}
              >

                <div>

                  <img alt="" id="courseCardImage" src={data.course_image_url} />

                  <div style={{ marginLeft: "10px", lineHeight: "96%", marginBottom: "15px", marginRight: "10px" }}>

                    <h5 id="courseCardTitle" className="card-title">
                      {data.course_display_name}
                    </h5>
                    <br></br>
                    <span style={{ textDecoration: "none", fontSize: "13px", color: "white" }}>Skills you'll gain:</span>
                    <span style={{ textDecoration: "none", fontSize: "13px", color: "wheat", fontWeight: "200" }}> {data.course_skills}</span>

                    <br /><br /><br /><br />
                    <div style={{ position: "absolute", bottom: "0px", color: "white", width: "100%" }}>
                      <div style={{ marginBottom: "13px" }}>
                        <span style={{ color: "pink", fontSize: "17px", fontFamily: "Montserrat", marginRight:"3px"}}>{data.course_completed_lessons}/{data.course_total_lessons} </span>Lessons Completed
                      </div>

                      <div id="progressDIV" style={{ width: (data.course_completed_lessons/data.course_total_lessons)*100 - 2 + "%", height: "7px", background: "lightblue", marginLeft:"-5px" }}>
                      </div>
                    </div>





                  </div>



                </div>


              </Link>
            </div>

          ))}
        </div>
      </div >
    );
  }
}
