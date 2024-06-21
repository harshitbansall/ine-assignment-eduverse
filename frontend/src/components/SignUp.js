import React, { useEffect, useState, useRef } from "react";
import "./SignUp.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp(props) {
  let navigate = useNavigate();
  const cookies = new Cookies();
  const myRef = useRef();
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("hidden");
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
      entry.target.classList.add("hidden");
    }
  });

  async function mainSignup() {
    var firstNameInput = document.getElementById("firstNameField").value;
    var lastNameInput = document.getElementById("lastNameField").value;
    var emailInput = document.getElementById("emailInputBoxSignupPage").value;
    var passwordInput = document.getElementById(
      "passwordInputBoxSignupPage"
    ).value;

    if (firstNameInput == "") {
      document.getElementById("alertBox").style.opacity = "1";
      document.getElementById("alertBox").innerHTML =
        "Please provide First Name.";
      return;
    }

    if (emailInput == "") {
      document.getElementById("alertBox").style.opacity = "1";
      document.getElementById("alertBox").innerHTML = "Please provide E-mail.";
      return;
    }
    if (!emailInput.includes("@")) {
      document.getElementById("alertBox").style.opacity = "1";
      document.getElementById("alertBox").innerHTML =
        "Please provide valid E-mail.";
      return;
    }
    if (passwordInput == "") {
      document.getElementById("alertBox").style.opacity = "1";
      document.getElementById("alertBox").innerHTML =
        "Please provide Password.";
      return;
    }

    props.setProgress(20);
    const { data } = await axios.post(
      // "https://hbansal28.pythonanywhere.com/api/v1/token/obtain",
      "http://127.0.0.1:8000/api/v1/signup",
      {
        full_name: firstNameInput + " " + lastNameInput,
        email: emailInput,
        password: passwordInput,
      }
    );

    if (data.success === "true") {
      cookies.set("access_token", data.access, { path: "/" });
      cookies.set("refresh_token", data.refresh, { path: "/" });

      props.setProgress(100);
      alert("Created Account and Logged In");
      navigate("/");
      window.location.reload();
    } else if (data.success === "false") {
      document.getElementById("alertBox").style.opacity = "1";
      document.getElementById("alertBox").innerHTML = data.message;
      props.setProgress(100);
    }
  }

  useEffect(() => {
    props.setProgress(20);
    setTimeout(() => {
      props.setProgress(100);
    }, 500);
    observer.observe(myRef.current);
  }, []);

  return (
    <div id="signUpWindowMainFrame">
      <center>
        <div id="signUpBox" className="card hidden" ref={myRef}>
          <h2 className="text-center mt-3 mb-3" style={{ color: "white" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              viewBox="0 -900 960 960"
              width="38"
              style={{ fill: "white" }}
            >
              <path d="M 222 -255 q 63 -44 125 -67.5 T 480 -346 q 71 0 133.5 23.5 T 739 -255 q 44 -54 62.5 -109 T 820 -480 q 0 -145 -97.5 -242.5 T 480 -820 q -145 0 -242.5 97.5 T 140 -480 q 0 61 19 116 t 63 109 Z m 257.814 -195 Q 422 -450 382.5 -489.686 q -39.5 -39.686 -39.5 -97.5 t 39.686 -97.314 q 39.686 -39.5 97.5 -39.5 t 97.314 39.686 q 39.5 39.686 39.5 97.5 T 577.314 -489.5 q -39.686 39.5 -97.5 39.5 Z m 0.654 370 Q 398 -80 325 -111.5 q -73 -31.5 -127.5 -86 t -86 -127.266 Q 80 -397.532 80 -480.266 T 111.5 -635.5 q 31.5 -72.5 86 -127 t 127.266 -86 q 72.766 -31.5 155.5 -31.5 T 635.5 -848.5 q 72.5 31.5 127 86 t 86 127.032 q 31.5 72.532 31.5 155 T 848.5 -325 q -31.5 73 -86 127.5 t -127.032 86 q -72.532 31.5 -155 31.5 Z M 480 -140 q 55 0 107.5 -16 T 691 -212 q -51 -36 -104 -55 t -107 -19 q -54 0 -107 19 t -104 55 q 51 40 103.5 56 T 480 -140 Z m 0 -370 q 34 0 55.5 -21.5 T 557 -587 q 0 -34 -21.5 -55.5 T 480 -664 q -34 0 -55.5 21.5 T 403 -587 q 0 34 21.5 55.5 T 480 -510 Z m 0 -77 Z m 0 374 Z" />
            </svg>
            <br />
            Sign Up
          </h2>
          <div className="row g-3 mx-1 mb-3">
            <div className="col-sm-6">
              <label id="labelSignUp" className="form-label">
                First name
              </label>
              <input type="text" className="form-control" id="firstNameField" />
            </div>
            <div className="col-sm-6">
              <label id="labelSignUp" className="form-label">
                Last name
              </label>
              <input type="text" className="form-control" id="lastNameField" />
            </div>
          </div>
          <div className="input-group px-3 mb-3">
            <span className="input-group-text">@</span>
            <input
              id="emailInputBoxSignupPage"
              type="text"
              autoComplete="email"
              className="form-control"
              placeholder="E-mail"
              aria-label="Email"
            />
          </div>
          <div className="input-group mb-4 px-3">
            <input
              id="passwordInputBoxSignupPage"
              type="password"
              autoComplete="current-password"
              className="form-control"
              placeholder="Password"
              aria-label="Password"
            />
          </div>
          <div
            id="alertBox"
            style={{
              opacity: "0",
              color: "red",
              marginBottom: "1rem",
              background: "black",
            }}
          >
            Please
          </div>
          <button
            id="loginButtonSignupPage"
            type="button"
            className="btn btn-warning mx-3 mb-3"
            onClick={mainSignup}
          >
            Sign Up
          </button>
        </div>
      </center>
    </div>
  );
}
