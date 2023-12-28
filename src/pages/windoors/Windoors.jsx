import React, { useEffect, useState } from "react";
import "./bootstrap.min.css";
import "./style.css";

/* Components */
import Taskbar from "./components/Taskbar";
import Window from "./components/Window";
import windoors from "./apps/System";

/*
    Online Operating System (Non-Native) :-
        * OS Name : Windoors
        * Version : 1.0.1001 Build 1001
        * OS Manufacturer : Ihasway
*/

function Windoors() {
 let [windows, setWindow] = useState([]);

 let matchPage = (a) => {
  document.querySelectorAll(".__desktop-window-page").forEach((e) => {
   a(e);
  });
 };
 let matchTab = (a) => {
  document.querySelectorAll(".__taskbar-apps .__taskbar-tab").forEach((e) => {
   a(e);
  });
 };

 const window = {
  open: (app) => {
   let isAppOpened = false;
   let windowPage = (
    <>
     <div
      className="__desktop-window-page card"
      pkg={app.pkg}
      name={app.name}
      style={{
       width: `100%`,
       height: `100%`,
       borderRadius: 0,
       zIndex: 900,
      }}
      onClick={() => {
       matchPage((e) => {
        e.style.zIndex = "800";
        e.classList.remove("focused");
        if (
         e.getAttribute("name") === app.name &&
         e.getAttribute("pkg") === app.pkg
        ) {
         e.style.zIndex = "900";
         e.classList.add("focused");
        }
       });
       matchTab((e) => {
        e.classList.remove("opened");
        if (
         e.getAttribute("name") === app.name &&
         e.getAttribute("pkg") === app.pkg
        ) {
         e.classList.add("opened");
        }
       });
      }}
     >
      <div
       className="__page-header card-header"
       onMouseDown={(e) => {
        e.preventDefault();

        let previousPosX = e.clientX;
        let previousPosY = e.clientY;

        let windowPage = e.target.parentElement.parentElement.parentElement;

        if (windowPage.classList.contains("minimized-half")) {
         onmouseup = () => {
          onmouseup = null;
          onmousemove = null;
         };

         onmousemove = (e) => {
          e.stopPropagation();
          e.preventDefault();

          let currentPosX = e.clientX;
          let currentPosY = e.clientY;

          let diffX = currentPosX - previousPosX;
          let diffY = currentPosY - previousPosY;

          let currentWindowPosX = windowPage.style.marginLeft;
          let currentWindowPosY = windowPage.style.marginTop;

          let newWindowPosX = parseInt(currentWindowPosX) + diffX;
          let newWindowPosY = parseInt(currentWindowPosY) + diffY;

          // stop if the window is out of the screen
          if (newWindowPosX < -400) {
           newWindowPosX = -400;
          }
          if (newWindowPosY < 0) {
           newWindowPosY = 0;
          }
          if (
           newWindowPosX >
           window.innerWidth - windowPage.offsetWidth + 400
          ) {
           newWindowPosX = window.innerWidth - windowPage.offsetWidth + 400;
          }
          if (newWindowPosY > window.innerHeight - windowPage.offsetHeight) {
           newWindowPosY = window.innerHeight - windowPage.offsetHeight;
          }

          windowPage.style.marginLeft = `${newWindowPosX}px`;
          windowPage.style.marginTop = `${newWindowPosY}px`;

          previousPosX = currentPosX;
          previousPosY = currentPosY;
         };
        }
       }}
      >
       <div className="d-flex align-items-center">
        <div className="dot red ms-2"></div>
        <div className="dot amber"></div>
        <div className="dot green"></div>
        <div className="w-100 d-flex align-items-center">
         <div className="head ms-auto">
          {app.icon} <span>{app.name}</span>
         </div>
         <div className="ms-auto">
          <button
           onClick={() => {
            matchTab((e) => {
             if (
              e.getAttribute("name") === app.name &&
              e.getAttribute("pkg") === app.pkg
             ) {
              setTimeout(() => {
               e.classList.remove("opened");
              }, 10);
             }
            });
            matchPage((k) => {
             if (
              k.getAttribute("name") === app.name &&
              k.getAttribute("pkg") === app.pkg
             ) {
              k.classList.add("minimized");
             }
            });
           }}
          >
           <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-dash"
            viewBox="0 0 16 16"
           >
            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
           </svg>
          </button>
          <button
           onClick={() => {
            matchPage((e) => {
             if (
              e.getAttribute("name") === app.name &&
              e.getAttribute("pkg") === app.pkg
             ) {
              if (!e.classList.contains("minimized-half")) {
               e.style.width = "50%";
               e.style.height = "70%";
               e.style.marginLeft = "1rem";
               e.style.marginTop = "1rem";
               e.style.borderRadius = "0.375rem";
               e.classList.add("focused");
               e.classList.add("minimized-half");
              } else {
               e.style.width = "100%";
               e.style.height = "100%";
               e.style.marginLeft = "0";
               e.style.marginTop = "0";
               e.style.borderRadius = "0";
               e.classList.add("focused");
               e.classList.remove("minimized-half");
              }
             }
            });
           }}
          >
           <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-fullscreen"
            viewBox="0 0 16 16"
           >
            <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z" />
           </svg>
          </button>
          <button
           onClick={(e) => {
            matchTab((e) => {
             if (
              e.getAttribute("name") === app.name &&
              e.getAttribute("pkg") === app.pkg
             ) {
              e.classList.remove("active");
              e.classList.remove("opened");
             }
            });
            matchPage((e) => {
             if (
              e.getAttribute("name") === app.name &&
              e.getAttribute("pkg") === app.pkg
             ) {
              e.classList.add("minimized");
              setTimeout(() => {
               e.parentNode.removeChild(e);
              }, 1000);
             }
            });
           }}
          >
           <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x"
            viewBox="0 0 16 16"
           >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
           </svg>
          </button>
         </div>
        </div>
       </div>
      </div>
      <div className="card-body p-0">
       <Window data={app} />
      </div>
      <div
       className="__resizing"
       onMouseDown={(e) => {
        e.preventDefault();

        let previousPosX = e.clientX;
        let previousPosY = e.clientY;

        let windowPage = e.target.parentElement;

        if (windowPage.classList.contains("minimized-half")) {
         onmouseup = () => {
          onmouseup = null;
          onmousemove = null;
         };

         onmousemove = (e) => {
          e.preventDefault();

          let currentPosX = e.clientX;
          let currentPosY = e.clientY;

          let diffX = currentPosX - previousPosX;
          let diffY = currentPosY - previousPosY;

          let currentWindowPosX = windowPage.style.width;
          let currentWindowPosY = windowPage.style.height;

          let newWindowPosX = parseInt(currentWindowPosX) + diffX;
          let newWindowPosY = parseInt(currentWindowPosY) + diffY;

          if (newWindowPosX < 500) {
           newWindowPosX = 500;
          }
          if (newWindowPosY < 300) {
           newWindowPosY = 300;
          }
          if (newWindowPosX > window.innerWidth - 400) {
           newWindowPosX = window.innerWidth - 400;
          }
          if (newWindowPosY > window.innerHeight - 100) {
           newWindowPosY = window.innerHeight - 100;
          }

          windowPage.style.width = `${newWindowPosX}px`;
          windowPage.style.height = `${newWindowPosY}px`;

          previousPosX = currentPosX;
          previousPosY = currentPosY;
         };
        }
       }}
      ></div>
     </div>
    </>
   );

   /**** DO NOT MODIFY THE FOLLOWING CODES *****/

   let windowPageAdd = () => {
    isAppOpened = true;
    setWindow([...windows, windowPage]);
    matchTab((e) => {
     e.classList.remove("opened");
     if (
      e.getAttribute("name") === app.name &&
      e.getAttribute("pkg") === app.pkg
     ) {
      e.classList.add("active");
      e.classList.add("opened");
     }
    });
   };

   matchTab((x) => {
    if (
     x.getAttribute("name") === app.name &&
     x.getAttribute("pkg") === app.pkg
    ) {
     matchPage((e) => {
      if (
       e.getAttribute("name") === x.getAttribute("name") &&
       e.getAttribute("pkg") === x.getAttribute("pkg")
      ) {
       isAppOpened = true;
       if (e.classList.contains("minimized")) {
        e.classList.remove("minimized");
        matchPage(
         (g) => ((g.style.zIndex = "800"), g.classList.remove("focused"))
        );
        e.style.zIndex = "900";
        e.classList.add("focused");
        x.classList.add("opened");
       } else {
        if (x.classList.contains("opened")) {
         matchTab((et) => {
          if (
           et.getAttribute("name") === app.name &&
           et.getAttribute("pkg") === app.pkg
          ) {
           setTimeout(() => {
            et.classList.remove("opened");
           }, 10);
          }
         });
         matchPage((kt) => {
          if (
           kt.getAttribute("name") === app.name &&
           kt.getAttribute("pkg") === app.pkg
          ) {
           kt.classList.add("minimized");
          }
         });
        } else {
         matchPage(
          (g) => ((g.style.zIndex = "800"), g.classList.remove("focused"))
         );
         e.style.zIndex = "900";
         e.classList.add("focused");
         x.classList.add("opened");
        }
       }
      }
     });
    } else x.classList.remove("opened");
   });

   if (!isAppOpened) {
    windowPageAdd();
   }

   /********************/
  },
 };
 /* Windoors Theme - Changing & Updating */
 useEffect(() => {
  let d = document,
   w = windoors,
   wt = w.theme;
  let $_main = d.querySelector(".__windoors-window");
  let $_taskbar = d.querySelector(".__taskbar-section");
  let $_taskbar_search = d.querySelector(".__taskbar-search");
  let $_desktop_window_page = d.querySelectorAll(".__desktop-window-page");

  let css = (e, c) => {
   if (!e || !c) return;
   if (c === undefined) return;
   Object.assign(e.style, c);
  };

  let initWindoors = () => {
   css($_main, {
    background: wt.main.background,
    color: wt.main.color,
   });
   css($_taskbar, {
    color: wt.taskbar.color,
   });
   css($_taskbar_search, {
    background: wt.taskbar.search.background,
    color: wt.taskbar.search.color,
   });
   $_desktop_window_page.forEach((e) => {
    css(e, {
     background: wt.windows.background,
    });
   });
  };

  let contextInit = () => {
   document.addEventListener(
    "contextmenu",
    function (e) {
     e.preventDefault();
     let r = document.querySelector(".__context-menu");
     r.classList.add("show");
     r.style.left = `${e.clientX}px`;
     r.style.top = `${e.clientY}px`;
    },
    false
   );
   function hideContext(e) {
    e.preventDefault();
    document.querySelector(".__context-menu").classList.remove("show");
   }
   setTimeout(() => {
    document.addEventListener("click", hideContext, false);
    document.addEventListener("mousedown", hideContext, false);
   }, 1000);
   document.addEventListener("scroll", hideContext, false);
   document.addEventListener("keydown", hideContext, false);
   window.addEventListener("blur", hideContext, false);
   window.addEventListener("resize", hideContext, false);
  };

  try {
   initWindoors();
   //contextInit();
  } catch (e) {}
 }, []);

 return (
  <div className="__windoors-window">
   {/* DESKTOP WINDOW */}
   <div className="__desktop-window">
    <div className="__context-menu">
     <div>View</div>
     <div>Refresh</div>
     <div>Sort by</div>
     <div>Group by</div>
     <div>New</div>
     <div>Display settings</div>
     <div>Personalize</div>
     <div>Settings</div>
    </div>
    {/* DESKTOP WINDOW PAGES */}
    <div className="__desktop-window-pages">
     {windows.map((window) => {
      return <>{window}</>;
     })}
    </div>
   </div>
   {/* TASKBAR SECTION */}
   <Taskbar
    Apps={windoors.apps}
    taskApps={windoors.taskbar.apps}
    onTaskbarAppClick={(x) => window.open(x)}
   />
  </div>
 );
}

export default Windoors;
