import React from "react";
import windoorsLogo from "./windoors-logo.png";

function Taskbar({ Apps, taskApps, onTaskbarAppClick }) {
 let apps_arr = [];

 let taskbarAppClick = (app) => {
  if (app) {
   onTaskbarAppClick(app);
  }
 };

 return (
  <div className="__taskbar-section px-2">
   <div className="row justify-content-between h-100">
    <div className="col-2"></div>
    <div className="col-8 overflow-hidden overflow-x-auto d-flex justify-content-center align-items-center gap-2">
     <div className="__taskbar-tab active">
      <img src={windoorsLogo} alt="Windoors Logo" />
     </div>
     <div className="__taskbar-search me-2">
      <svg
       xmlns="http://www.w3.org/2000/svg"
       width="16"
       height="16"
       fill="currentColor"
       className="bi bi-search"
       viewBox="0 0 16 16"
      >
       <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>
      <input type="search" placeholder="Search" />
     </div>
     <div className="__taskbar-apps d-flex justify-content-center align-items-center gap-3">
      {taskApps.map((l, index) => {
       Apps.map((k) => {
        if (k.pkg === l) {
         apps_arr.push(k);
        }
       });
       return (
        <div
         className="__taskbar-tab"
         key={index}
         pkg={apps_arr[index].pkg}
         name={apps_arr[index].name}
         onClick={() => taskbarAppClick(apps_arr[index])}
        >
         {apps_arr[index].icon}
        </div>
       );
      })}
     </div>
    </div>
    <div className="col-2"></div>
   </div>
  </div>
 );
}

export default Taskbar;
