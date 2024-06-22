import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./TopNavbar.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { TailSpin } from "react-loader-spinner";

function toggleTopMenu(element) {
  document.getElementById("3bars").classList.toggle("change");
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    document.getElementById("navBarMobile").style.background = "rgba(0, 0, 0, 0.8)";
    x.style.display = "none";
  } else {
    document.getElementById("navBarMobile").style.background = "rgba(0, 0, 0, 1)";
    x.style.display = "block";
  }
}

const LoginOrProfileButton = () => {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(true);
  const [userLogged, setUserLogged] = useState(false);
  const [userFullName, setUserFullName] = useState("");

  useEffect(() => {
    if (cookies.get("access_token")) {
      setLoading(true);
      const loadData = async function () {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/config",
          { headers: { Authorization: "JWT " + cookies.get("access_token") } }
        );
        setLoading(false);
        if (data.success === "true") {
          setUserLogged(true);
          setUserFullName(data.user_details.full_name);
        } else if (data.success === "false") {
          setUserLogged(false);
        }
      };
      loadData();
    } else {
      setLoading(false);
    }
  }, []);

  function logout() {
    cookies.remove("access_token");
    cookies.remove("refresh_token");
    alert("Logged Out.");
    window.location.reload();
  }

  if (loading) {
    return (
      <TailSpin
        height="40"
        width="40"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        visible={true}
      />
    );
  } else {
    if (userLogged) {
      return (
        <li id="loginButtonLI" className="nav-item dropdown">
          <a
            className="nav-link active dropdown-toggle hoverElement"
            id="loginButton"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30"
              viewBox="0 -900 960 960"
              width="38"
              style={{ marginRight: "5px", fill: "white" }}
            >
              <path d="M 222 -255 q 63 -44 125 -67.5 T 480 -346 q 71 0 133.5 23.5 T 739 -255 q 44 -54 62.5 -109 T 820 -480 q 0 -145 -97.5 -242.5 T 480 -820 q -145 0 -242.5 97.5 T 140 -480 q 0 61 19 116 t 63 109 Z m 257.814 -195 Q 422 -450 382.5 -489.686 q -39.5 -39.686 -39.5 -97.5 t 39.686 -97.314 q 39.686 -39.5 97.5 -39.5 t 97.314 39.686 q 39.5 39.686 39.5 97.5 T 577.314 -489.5 q -39.686 39.5 -97.5 39.5 Z m 0.654 370 Q 398 -80 325 -111.5 q -73 -31.5 -127.5 -86 t -86 -127.266 Q 80 -397.532 80 -480.266 T 111.5 -635.5 q 31.5 -72.5 86 -127 t 127.266 -86 q 72.766 -31.5 155.5 -31.5 T 635.5 -848.5 q 72.5 31.5 127 86 t 86 127.032 q 31.5 72.532 31.5 155 T 848.5 -325 q -31.5 73 -86 127.5 t -127.032 86 q -72.532 31.5 -155 31.5 Z M 480 -140 q 55 0 107.5 -16 T 691 -212 q -51 -36 -104 -55 t -107 -19 q -54 0 -107 19 t -104 55 q 51 40 103.5 56 T 480 -140 Z m 0 -370 q 34 0 55.5 -21.5 T 557 -587 q 0 -34 -21.5 -55.5 T 480 -664 q -34 0 -55.5 21.5 T 403 -587 q 0 34 21.5 55.5 T 480 -510 Z m 0 -77 Z m 0 374 Z" />
            </svg>
            {userFullName}
          </a>
          <ul
            className="dropdown-menu"
            aria-labelledby="loginButton"
            style={{ marginLeft: "4rem" }}
          >
            <li>
              <Link className="dropdown-item" href="/profile">
                My Profile
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="/watchlist">
                My Wishlist
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link
                className="dropdown-item"
                href="#"
                role="button"
                onClick={logout}
              >
                Logout
              </Link>
            </li>
          </ul>
        </li>
      );
    } else {
      return (
        <li id="loginButtonLI" className="nav-item">
          <Link
            id="loginButton"
            className="nav-link active onHover"
            aria-current="page"
            to="/login"
            onClick={() => {
              toggleTopMenu();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30"
              viewBox="0 -900 960 960"
              width="38"
              style={{ marginRight: "5px", fill: "white" }}
            >
              <path d="M 222 -255 q 63 -44 125 -67.5 T 480 -346 q 71 0 133.5 23.5 T 739 -255 q 44 -54 62.5 -109 T 820 -480 q 0 -145 -97.5 -242.5 T 480 -820 q -145 0 -242.5 97.5 T 140 -480 q 0 61 19 116 t 63 109 Z m 257.814 -195 Q 422 -450 382.5 -489.686 q -39.5 -39.686 -39.5 -97.5 t 39.686 -97.314 q 39.686 -39.5 97.5 -39.5 t 97.314 39.686 q 39.5 39.686 39.5 97.5 T 577.314 -489.5 q -39.686 39.5 -97.5 39.5 Z m 0.654 370 Q 398 -80 325 -111.5 q -73 -31.5 -127.5 -86 t -86 -127.266 Q 80 -397.532 80 -480.266 T 111.5 -635.5 q 31.5 -72.5 86 -127 t 127.266 -86 q 72.766 -31.5 155.5 -31.5 T 635.5 -848.5 q 72.5 31.5 127 86 t 86 127.032 q 31.5 72.532 31.5 155 T 848.5 -325 q -31.5 73 -86 127.5 t -127.032 86 q -72.532 31.5 -155 31.5 Z M 480 -140 q 55 0 107.5 -16 T 691 -212 q -51 -36 -104 -55 t -107 -19 q -54 0 -107 19 t -104 55 q 51 40 103.5 56 T 480 -140 Z m 0 -370 q 34 0 55.5 -21.5 T 557 -587 q 0 -34 -21.5 -55.5 T 480 -664 q -34 0 -55.5 21.5 T 403 -587 q 0 34 21.5 55.5 T 480 -510 Z m 0 -77 Z m 0 374 Z" />
            </svg>
            Login
          </Link>
        </li>
      );
    }
  }
};

export default function Navbar(props) {
  let navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    if (searchTerm === ""){
      alert("Search cannot be Blank.")
    }
    else{
      e.preventDefault();
      e.stopPropagation();
      navigate("/courses?q=" + searchTerm, { state: value });
    }
    

  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    setValue(event.target.value);
  };

  return (
    <div>
      <div
        id="navBarPC"
        className="navbar justify-content-start navbar-expand-lg"
      >
        <Link id="websiteHeading" className="navbar-brand" to="/">
          EduVerse
        </Link>
        <div id="searchInputBoxDIV">
          <form onSubmit={handleSubmit}>
            <input
              id="searchInputBox"
              name="q"
              type="search"
              placeholder="Search Courses"
              value={searchTerm}
              onChange={handleChange}
            />
          </form>
        </div>
        <div id="loginButtonDIV" className="navbar-nav ms-4">
          <LoginOrProfileButton />
        </div>
      </div>
      <div
        id="navBarMobile"
        className="navbar justify-content-start navbar-expand-lg"
      >
        <Link
          id="websiteHeading"
          className="navbar-brand"
          to="/"
        >
          EV
        </Link>
        <div id="searchInputBoxDIV">
          <form onSubmit={handleSubmit}>
            <input
              id="searchInputBox"
              name="q"
              type="search"
              placeholder="Search Courses"
              value={searchTerm}
              onChange={handleChange}
            />
          </form>
        </div>

        <div
          id="3bars"
          className="container3"
          onClick={() => {
            toggleTopMenu();
          }}
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <div id="myLinks">
          <div id="loginButtonDIV" className="navbar-nav ms-4">
            <LoginOrProfileButton />
          </div>
        </div>
      </div>
    </div>
  );
}
