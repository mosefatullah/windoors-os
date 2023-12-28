import React from "react";
import "./app.css";

function Chrome() {
 const [chromeUrl, setChromeUrl] = React.useState(
  "https://www.google.com/search?igu=1"
 );
 const change = (e) => {
  if (
   e.target.value.includes("http://") ||
   (e.target.value.includes("https://") && e.target.value.includes("."))
  ) {
   setChromeUrl(e.target.value);
  } else {
   setTimeout(() => {
    setChromeUrl("https://www.google.com/search?q=" + e.target.value);
   }, 1000);
  }
 };

 return (
  <>
   <div id="navbar">
    <input
     type="text"
     id="address-bar"
     placeholder="Enter URL"
     value={chromeUrl}
     onChange={change}
     onKeyDown={change}
    />
   </div>
   <iframe
    id="content"
    src={chromeUrl}
    onChange={change}
   ></iframe>
  </>
 );
}

export default Chrome;
