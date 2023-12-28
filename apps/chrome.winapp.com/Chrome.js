import React from "react";

const Chrome = () => {
 return (
  <html lang="en">
   <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Simple Browser Demo</title>
    <style>
     {`
            body {
                margin: 0;
                padding: 0;
                overflow: hidden;
            }

            #navbar {
                background-color: #333;
                color: white;
                display: flex;
                justify-content: space-between;
                padding: 10px;
            }

            #address-bar {
                flex: 1;
                margin-right: 10px;
            }

            #go-button {
                background-color: #4CAF50;
                color: white;
                border: none;
                padding: 5px 10px;
                cursor: pointer;
            }

            #content {
                height: calc(100vh - 40px);
                width: 100%;
                border: none;
            }
          `}
    </style>
   </head>
   <body>
    <div id="navbar">
     <input type="text" id="address-bar" placeholder="Enter URL" />
     <button id="go-button">Go</button>
    </div>
    <iframe id="content" src="https://www.google.com" frameBorder="0"></iframe>

    <script>
     {`
            const goButton = document.getElementById('go-button');
            const addressBar = document.getElementById('address-bar');
            const contentFrame = document.getElementById('content');

            goButton.addEventListener('click', () => {
                const url = addressBar.value;
                contentFrame.src = url;
            });
          `}
    </script>
   </body>
  </html>
 );
};

export default Chrome;
