import React, { useEffect, useState, useRef } from "react";
import { Link, useSearchParams, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./MainWindow.css";
import { TailSpin } from "react-loader-spinner";

export default function MainWindow(props) {
  const date = new Date();

  const [loading, setLoading] = useState(true);

  let [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  let { genre_slug } = useParams();
  // const myRef = useRef();
  var apiLink;
  var heading;
  // const params = [];
  // for (const entry of searchParams.entries()) {
  //   params.unshift(entry);
  // }



  const state = useLocation();

  if (props.pageID === "featured") {
    apiLink =
      "http://127.0.0.1:8000/api/courses";
    heading = "Featured";
  } else if (props.pageID === "top-250") {
    apiLink =
      "https://api.rawg.io/api/games?ordering=-metacritic&key=5fcdb676e5d74141ac1bb36b70f5d949";
    heading = "Top 250";
  } else if (props.pageID === "all-games") {
    apiLink =
      "https://api.rawg.io/api/games?key=5fcdb676e5d74141ac1bb36b70f5d949";
    heading = "All Games";
  } else if (props.pageID === "courses") {
    var stri = (searchParams.get("q")) ? searchParams.get("q") : searchParams.get("language")
    apiLink = "http://127.0.0.1:8000/api/courses?q=" + searchParams.get("q") + "&language=" + searchParams.get("language") + "&subject=" + searchParams.get("subject");
    heading = "Search Results for '" + stri + "'";
  } else if (props.pageID === "genre-games") {
    apiLink =
      "https://api.rawg.io/api/games?genres=" + genre_slug + "&key=5fcdb676e5d74141ac1bb36b70f5d949";
    heading = genre_slug.charAt(0).toUpperCase() + genre_slug.slice(1) + " Games";
  }


  useEffect(() => {
    setLoading(true);
    props.setProgress(20);
    const loadData = async function () {
      const { data } = await axios.get(apiLink);

      setCourses(data.results.courses);

      setLoading(false);
      props.setProgress(100);

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('hidden');
          entry.target.classList.add('show');
        }
        else {
          entry.target.classList.remove('show');
          entry.target.classList.add('hidden');
        }
      });
      // observer.observe(myRef.current);
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
              id="gameCard"
              key={data.course_id}
              className="zoom"
            >
              <Link
                to={"/courses/" + data.course_id}
                style={{ textDecoration: "none" }}
              >

                <div>

                  <img alt="" id="gameCardImage" src={data.course_image_url} />

                  <div style={{ marginLeft: "10px", lineHeight: "96%", marginBottom: "15px", marginRight: "10px" }}>

                    <h5 id="gameCardTitle" className="card-title">
                      {data.course_display_name}
                    </h5>
                    <br></br>
                    <span style={{ textDecoration: "none", fontSize: "13px", color: "white" }}>Skills you'll gain:</span>
                    <span style={{ textDecoration: "none", fontSize: "13px", color: "wheat", fontWeight: "200" }}> {data.course_skills}</span>
                    <br /><br />
                    <span style={{ color: "wheat", fontSize: "15px" }}>{data.course_description.substr(0,120)}...</span>
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
