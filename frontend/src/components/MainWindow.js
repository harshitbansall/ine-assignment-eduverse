import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./MainWindow.css";
import { TailSpin } from "react-loader-spinner";

export default function MainWindow(props) {
  const [loading, setLoading] = useState(true);

  let [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  var apiLink;
  var heading;

  const state = useLocation();

  if (props.pageID === "featured") {
    apiLink = "https://eduversebackend.pythonanywhere.com/api/courses";
    heading = "Featured";
  } else if (props.pageID === "courses") {
    var q = searchParams.get("q") ? searchParams.get("q") : "";
    var language = searchParams.get("language") ? searchParams.get("language") : "";
    var subject = searchParams.get("subject") ? searchParams.get("subject") : "";
    var level = searchParams.get("level") ? searchParams.get("level") : "";
    var duration = searchParams.get("duration") ? searchParams.get("duration") : "";
    var stringList = [q, language, subject, level, duration]
    apiLink = "https://eduversebackend.pythonanywhere.com/api/courses?q=" + searchParams.get("q") + "&language=" + searchParams.get("language") + "&subject=" + searchParams.get("subject") + "&level=" + searchParams.get("level") + "&duration=" + searchParams.get("duration");
    heading = "Search Results for '" + stringList.filter(Boolean).join(", ") + "'";
  }


  useEffect(() => {
    setLoading(true);
    props.setProgress(20);

    const loadData = async function () {
      const { data } = await axios.get(apiLink);
      setCourses(data.results.courses);

      setLoading(false);
      props.setProgress(100);

    };

    loadData();


  }, [state]);



  if (loading) {
    return (
      <div id="mainWindowMainFrame" className="container">

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

      <div id="mainWindowMainFrame">
        <h1 id="mainWindowHeading">{heading}</h1>
        <div id="mainWindowGrid">
          {courses.map((data) => (

            <div
              id="courseCard"
              key={data.course_id}
              className="zoom"
            >
              <Link
                to={"/courses/" + data.course_id}
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
                    <br /><br />
                    <span style={{ color: "wheat", fontSize: "15px" }}>{data.course_description.substr(0, 120)}...</span>
                    <br /><br /><br />
                    <div style={{ position: "absolute", bottom: "15px" }}>
                      <span style={{ textDecoration: "none", fontSize: "14px", color: "white" }}>{data.course_level} • {data.course_duration}</span>
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
