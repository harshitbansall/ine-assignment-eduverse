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


  var genreArray = [
    "Action",
    "Strategy",
    "Shooter",
    "Adventure",
    "Racing",
  ];
  return (
    <div id="mainSideBar">
      <ul>
        <li className="mb-1">
          <Link
            id="sideBarUL"
            to="/"
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
          >
            {/* <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="20" style={{fill:"white",marginRight:"5px"}}><path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z"/></svg> */}
            Home
          </Link>
          {/* <div className="collapse show" id="home-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a id="sideBarA" href="#" className="">Overview</a></li>
            <li><a id="sideBarA" href="#" className="">Updates</a></li>
            <li><a id="sideBarA" href="#" className="">Reports</a></li>
          </ul>
        </div> */}
        </li>
        <li className="mb-1">
          <button
            id="sideBarUL"
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#dashboard-collapse"
            aria-expanded="true"
          >
            {/* <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -1000 960 960" width="20" style={{fill:"white",marginRight:"5px"}}><path d="m346-60-76-130-151-31 17-147-96-112 96-111-17-147 151-31 76-131 134 62 134-62 77 131 150 31-17 147 96 111-96 112 17 147-150 31-77 130-134-62-134 62Zm91-287 227-225-45-41-182 180-95-99-46 45 141 140Z"/></svg> */}
            Subjects
          </button>
          <div className="collapse show" id="dashboard-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li id="sideBarLI">
                <input type="checkbox" />
                <span id="sideBarA" onClick={() => handleClick("subject", "Data Science")} className="">
                  Data Science
                </span>
              </li>
              <li id="sideBarLI">
                <input type="checkbox" />
                <span id="sideBarA" onClick={() => handleClick("subject", "Computer Science")} className="">
                  Computer Science
                </span>
              </li>
              <li id="sideBarLI">
                <input type="checkbox" />
                <span id="sideBarA" onClick={() => handleClick("subject", "Business")} className="">
                  Business
                </span>
              </li>
              {/* <li><a href="/" className="link-dark d-inline-flex text-decoration-none rounded">Annually</a></li> */}
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            id="sideBarUL"
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#orders-collapse"
            aria-expanded="true"
          >
            Languages
          </button>
          <div className="collapse show" id="orders-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li id="sideBarLI">
                <input type="checkbox" />
                <span id="sideBarA" onClick={() => handleClick("language", "English")} className="">
                  English
                </span>
              </li>
              <li id="sideBarLI">
                <input type="checkbox" />
                <span id="sideBarA" onClick={() => handleClick("language", "French")} className="">
                  French
                </span>
              </li>
              <li id="sideBarLI">
                <input type="checkbox" />
                <span id="sideBarA" onClick={() => handleClick("language", "Spanish")} className="">
                  Spanish
                </span>
              </li>
              {/* <li><a id="sideBarA" href="/" className="">Returned</a></li> */}
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            id="sideBarUL"
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#genres-collapse"
            aria-expanded="true"
          >
            Genres
          </button>
          <div className="collapse show" id="genres-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              {genreArray.map((data) => (
                <li key={data} id="sideBarLI">
                  <Link
                    id="sideBarA"
                    // onClick={(e) => handleSubmit2(data)}
                    to={{ pathname: "/genres/" + data.toLowerCase(), state: data }}

                    className=""
                  >
                    {data}
                  </Link>
                </li>
              ))}

              {/* <li>
                <Link id="sideBarA" to="/games/strategy" className="">
                  Strategy
                </Link>
              </li>
              <li>
                <Link id="sideBarA" to="/discover/top-250" className="">
                  Shooter
                </Link>
              </li>
              <li>
                <a id="sideBarA" href="/" className="">
                  Adventure
                </a>
              </li>
              <li>
                <a id="sideBarA" href="/" className="">
                  Racing
                </a>
              </li>
              <li>
                <a id="sideBarA" href="/" className="">
                  Sports
                </a>
              </li> */}
              {/* <li><a id="sideBarA" href="/" className="">Returned</a></li> */}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}
