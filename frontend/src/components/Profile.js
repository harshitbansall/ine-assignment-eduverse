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
      const { data } = await axios.get("http://127.0.0.1:8000/api/enrollments", headersData);
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
        <div id="mainWindowGrid">
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
                    {/* <br /><br />
                    <span style={{ color: "wheat", fontSize: "15px" }}>{data.course_description.substr(0, 120)}...</span> */}
                    <br /><br /><br />
                    <div style={{ position: "absolute", bottom: "15px" }}>
                      <span style={{ textDecoration: "none", fontSize: "14px", color: "white" }}>{data.course_level} • {data.course_duration}</span>
                    </div>



                    {/* <p style={{ fontSize: "10px" }}>{data.course_description}</p> */}

                  </div>



                </div>

                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
              </Link>
            </div>

          ))}
        </div>
      </div >
    );
  }
}
