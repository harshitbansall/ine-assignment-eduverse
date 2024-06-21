import React, { useEffect, useState, useRef} from "react";
import './Footer.css';
export default function Footer() {
  const myRef = useRef();
  useEffect(() =>{
    const observer = new IntersectionObserver(([entry]) =>{
      if (entry.isIntersecting){
        entry.target.classList.remove('hidden');
        entry.target.classList.add('show');
      }
      else{
        entry.target.classList.remove('show');
        entry.target.classList.add('hidden');
      }
    });
    observer.observe(myRef.current);
  },[]);
  return (
    <div id="mainFooter" className="footer py-3 hidden" ref={myRef} >
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
