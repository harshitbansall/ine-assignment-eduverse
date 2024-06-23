import React, { useEffect} from "react";
import './Footer.css';
export default function Footer() {
  useEffect(() =>{
  },[]);
  return (
    <div id="mainFooter" className="footer py-3" >
      <div id="mainFooterInside1">
        <div id="mainFooterInside2">
          <span style={{color:"white"}}>
            Ⓒ EduVerse 2024
          </span>
        </div>
        <div>
          <span style={{color:"white"}}>
            Designed and Built with ❤️ by{" "}
            <a
              className="hoverElement"
              style={{textDecoration:"none",
           color:"white"}}
              href="https://harshitbansall.github.io/"
            >
              Harshit Bansal
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
