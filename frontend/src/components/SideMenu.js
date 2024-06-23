import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SideMenu.css";

export default function SideMenu() {



  let navigate = useNavigate();

  function handleClick(key, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    navigate("/courses" + url.search);
  }

  var subjectArray = [
    "Data Science",
    "Computer Science",
    "Business",
    "Information Technology",
    "Health"
  ]

  var languageArray = [
    "English",
    "French",
    "Spanish"
  ]
  var levelArray = [

    "Beginner",
    "Intermediate",
    "Advanced",
    "Mixed"
  ];
  var durationArray = [
    "< 2 hours",
    "1-4 Weeks",
    "1-3 Months",
    "3-6 Months",
    "6-12 Months",

  ]
  return (
    <div id="mainSideBar">
      <ul>
        <li className="mb-1">
          <Link
            id="sideBarUL"
            to="/"
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
          >
            Courses
          </Link>
        </li>
        <li className="mb-1">
          <button
            id="sideBarUL"
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#subjects-collapse"
            aria-expanded="true"
          >
            Subjects
          </button>
          <div className="collapse show" id="subjects-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              {subjectArray.map((data) => (
                <li id="sideBarLI">

                  <span id="sideBarA" onClick={() => handleClick("subject", data)} className="">
                    {data}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            id="sideBarUL"
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#languages-collapse"
            aria-expanded="true"
          >
            Languages
          </button>
          <div className="collapse show" id="languages-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              {languageArray.map((data) => (
                <li id="sideBarLI">

                  <span id="sideBarA" onClick={() => handleClick("language", data)} className="">
                    {data}
                  </span>
                </li>
              ))}

            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            id="sideBarUL"
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#levels-collapse"
            aria-expanded="true"
          >
            Levels
          </button>
          <div className="collapse show" id="levels-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              {levelArray.map((data) => (
                <li id="sideBarLI">
                  <span id="sideBarA" onClick={() => handleClick("level", data)} className="">
                    {data}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            id="sideBarUL"
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#durations-collapse"
            aria-expanded="true"
          >
            Duration
          </button>
          <div className="collapse show" id="durations-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              {durationArray.map((data) => (
                <li id="sideBarLI">
                  <span id="sideBarA" onClick={() => handleClick("duration", data)} className="">
                    {data}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}
