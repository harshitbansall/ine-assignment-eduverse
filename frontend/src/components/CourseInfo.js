import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./CourseInfo.css";
import axios from "axios";
import { Link } from "react-router-dom";
// import { usePromiseTracker } from "react-promise-tracker";
// import { trackPromise } from "react-promise-tracker";
import { TailSpin } from "react-loader-spinner";

import Cookies from "universal-cookie";


// const observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('show');
//     }
//     else
//     {entry.target.classList.remove('show');}
//   })
// })

// const hiddenElements = document.querySelectorAll('.hidden');
// hiddenElements.forEach((el) => observer.observe(el));

// function CourseScreenshots() {
//   const [loading, setLoading] = useState(true);
//   const [loading2, setLoading2] = useState(true);
//   const [courseSSInfo, setCourseSSInfo] = useState([]);
//   let { course_slug } = useParams();

//   const onComplete = after(courseSSInfo.length, () => {
//     setLoading2(false);
//   });
//   useEffect(() => {

//     const loadData = async function () {
//       const { data } = await axios.get(
//         "https://api.rawg.io/api/courses/" +
//           course_slug +
//           "/screenshots?key=5fcdb676e5d74141ac1bb36b70f5d949"
//       );

//       setCourseSSInfo(data.results);
//       setLoading((loading) => !loading);
//     };
//     loadData();
//   }, []);
//   if (loading && loading2) {
//     return (
//       <div className="center-screen">
//         <TailSpin
//           height="80"
//           width="80"
//           color="#4fa94d"
//           ariaLabel="tail-spin-loading"
//           radius="1"
//           wrapperStyle={{}}
//           wrapperClass=""
//           visible={true}
//         />
//       </div>
//     );
//   } else {
//     return (
//       <div className="row gy-2">
//         {/* {loading2 && <span>Loading ...</span>} */}
//         {courseSSInfo.map((data) => (
//           <div className="col-6" key={data.id}>
//             <img
//               id="courseScreenshotImage"
//               className="zoom"
//               src={data.image}
//               onLoad={onComplete}
//             ></img>
//           </div>
//         ))}
//       </div>
//     );
//   }
// }

export default function CourseInfo(props) {
  const [loading, setLoading] = useState(true);
  const [courseInfo, setCourseInfo] = useState([]);
  let { course_id } = useParams();
  const cookies = new Cookies();

  function handleEnrollButton(course_id) {
    props.setProgress(20);

    if (cookies.get("access_token")) {
      setLoading(true);
      const loadData = async function () {
        const { data } = await axios.post(
          "http://127.0.0.1:8000/api/enrollments",
          {course_id:course_id},
          { headers: { Authorization: "JWT " + cookies.get("access_token") }}
        );
        setLoading(false);
        if (data.success === "true") {
          alert("Done");
          // setUserLogged(true);
          // setUserFullName(data.user_details.full_name);
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
      setCourseInfo(data.results);
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

          <button type="button" class="btn btn-primary" style={{ fontSize: "20px" }} onClick={()=>handleEnrollButton(courseInfo.course_id)}>
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

          </div>

        </div>

        <div id="courseInfoRightDIV">
          {/* <iframe style={{width:"100%", marginBottom: "1rem",height:"200px"}} src="https://www.youtube.com/embed/hvoD7ehZPcM?start=9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe> */}
          {/* <h3 id="courseAboutHeading" style={{ marginBottom: "1rem" }}>
            Screenshots
          </h3> */}
          <div id="courseInfoScreenShotDIV">
            <img style={{ height: "230px", width: "100%", objectFit: "cover" }} src={courseInfo.course_image_url}></img>
          </div>

          <h5 id="courseAboutHeading" style={{ marginTop: "2rem" }}>
            {courseInfo.course_level}
          </h5>
          <p id="courseAbout">{courseInfo.released}</p>
          <div>
            <h5 id="courseAboutHeading" style={{ marginTop: "2rem" }}>
              Platforms
            </h5>
            <nav id="platformBreadcrumb" aria-label="breadcrumb">
              <ol className="breadcrumb">
                { }
              </ol>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}
