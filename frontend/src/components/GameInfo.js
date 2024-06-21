import React, { useEffect, useState, useRef} from "react";
import { useParams } from "react-router-dom";
import "./GameInfo.css";
import axios from "axios";
import { Link } from "react-router-dom";
// import { usePromiseTracker } from "react-promise-tracker";
// import { trackPromise } from "react-promise-tracker";
import { TailSpin } from "react-loader-spinner";
import { after } from "underscore";


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

function GameScreenshots() {
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [gameSSInfo, setGameSSInfo] = useState([]);
  let { game_slug } = useParams();

  const onComplete = after(gameSSInfo.length, () => {
    setLoading2(false);
  });
  useEffect(() => {
    
    const loadData = async function () {
      const { data } = await axios.get(
        "https://api.rawg.io/api/games/" +
          game_slug +
          "/screenshots?key=5fcdb676e5d74141ac1bb36b70f5d949"
      );

      setGameSSInfo(data.results);
      setLoading((loading) => !loading);
    };
    loadData();
  }, []);
  if (loading && loading2) {
    return (
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
    );
  } else {
    return (
      <div className="row gy-2">
        {/* {loading2 && <span>Loading ...</span>} */}
        {gameSSInfo.map((data) => (
          <div className="col-6" key={data.id}>
            <img
              id="gameScreenshotImage"
              className="zoom"
              src={data.image}
              onLoad={onComplete}
            ></img>
          </div>
        ))}
      </div>
    );
  }
}

export default function GameInfo(props) {
  const [loading, setLoading] = useState(true);
  const [gameInfo, setGameInfo] = useState([]);
  let { game_slug } = useParams();
  // const myRef = useRef();

  function GetGameTorrents() {
    props.setProgress(20);
    const loadData = async function () {
      const { data } = await axios.get(
        "http://127.0.0.1:8000/api/v1/getGameTorrents?name=" + gameInfo.name
        // "https://hbansal28.pythonanywhere.com/api/v1/getGameTorrents?name=" + gameInfo.name
      );
      document.getElementById("gameTorrentsDIV").innerHTML = data;
      // setTorrentsLoading((loading) => !loading);

      props.setProgress(100);
    };
    // const [torrentsLoading, setTorrentsLoading] = useState(true);
    // const [torrentsData, setTorrentsData] = useState([]);
    // document.getElementById('gameTorrentsDIV').innerHTML = <div className="center-screen">Hello</div>;
    // document.getElementById('gameTorrentsDIV').innerHTML = '<div className="center-screen"><TailSpin height="80" width="80" color="#4fa94d" ariaLabel="tail-spin-loading" radius="1" visible={true}/></div>';
    loadData();
  }

  // const observer = new IntersectionObserver(([entry]) =>{
  //   if (entry.isIntersecting){
  //     entry.target.classList.remove('hidden');
  //     entry.target.classList.add('show');
  //   }
  //   else{
  //     entry.target.classList.remove('show');
  //     entry.target.classList.add('hidden');
  //   }
  // });

  useEffect(() => {
    props.setProgress(20);
    
    const loadData = async function () {
      const { data } = await axios.get("https://api.rawg.io/api/games/" +game_slug +"?key=5fcdb676e5d74141ac1bb36b70f5d949");
      setGameInfo(data);
      // console.log(data);
      setLoading((loading) => !loading);
      props.setProgress(100);
    };

    loadData();
  }, []);

  document.body.style.backgroundImage =
    "linear-gradient(to bottom, rgba(245, 246, 252, 0.4), rgba(117, 19, 93, 0.73)), url('" +
    gameInfo.background_image +
    "')";

  document.body.style.backgroundSize = "100%";
  document.body.style.backgroundRepeat = "no-repeat";

  if (loading) {
    return (
      <div id="mainGameInfoFrame" className="container">
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
      <div id="mainGameInfoFrame" className="container">
        <div id="gameHeadingFrame">
          <nav id="breadCrumbMain" aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" id="breadCrumbLink">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Link to="/games" id="breadCrumbLink">
                  Games
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <a id="breadCrumbLink">{gameInfo.name}</a>
              </li>
            </ol>
          </nav>
          <h1 id="gameHeading">{gameInfo.name}</h1>
          <h3 id="gameAboutHeading">About</h3>
          <div
            id="gameAbout"
            dangerouslySetInnerHTML={{ __html: gameInfo.description }}
          ></div>
          {/* <div>
            <h3 id="gameAboutHeading">Downloads</h3>
            <button onClick={GetGameTorrents}>Download Game</button>
            <div id="gameTorrentsDIV"></div>
          </div> */}
        </div>

        <div id="gameInfoRightDIV">
          {/* <iframe style={{width:"100%", marginBottom: "1rem",height:"200px"}} src="https://www.youtube.com/embed/hvoD7ehZPcM?start=9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe> */}
          <h3 id="gameAboutHeading" style={{ marginBottom: "1rem" }}>
            Screenshots
          </h3>
          <div id="gameInfoScreenShotDIV">
            <GameScreenshots />
          </div>

          <h5 id="gameAboutHeading" style={{ marginTop: "2rem" }}>
            Release Date
          </h5>
          <p id="gameAbout">{gameInfo.released}</p>
          <div>
            <h5 id="gameAboutHeading" style={{ marginTop: "2rem" }}>
              Platforms
            </h5>
            <nav id="platformBreadcrumb" aria-label="breadcrumb">
              <ol className="breadcrumb">
                {gameInfo.platforms.map((data) => (
                  <li
                    className="breadcrumb-item active"
                    aria-current="page"
                    key={data.platform.id}
                  >
                    <Link
                      to={"/platforms/" + data.platform.slug}
                      id="breadCrumbLink"
                    >
                      {data.platform.name}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}
