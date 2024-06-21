import React from "react";
import "./HowTo.css";
export default function HowTo() {
  return (
    <div id="howToMainFrame">
      <iframe
      style={{marginLeft:"13rem", marginTop:"6rem"}}
        width="700"
        height="394"
        src="https://www.youtube.com/embed/tifKxgPFztc"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  );
}
