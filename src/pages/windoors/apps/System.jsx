/* Windoors Object - Info, Theme */
export default {
 info: {
  version: "1.0.1001",
  build: "1001",
  manufacturer: "Ihasway",
  system: {
   name: "SPA",
   manufacturer: "Ihasway",
   run: "Only Browser (Chrome, Firefox, Edge, Safari, Opera, etc.)",
  },
  processor: "Device Processor",
  ram: "Device RAM",
  ssd: "Cloud Storage 1GB",
 },
 theme: {
  main: {
   background:
    'url("https://4kwallpapers.com/images/walls/thumbs_3t/1455.jpg") no-repeat center fixed',
   color: "#ffffff",
  },
  taskbar: {
   color: "#ffffff",
   search: {
    background: "#ffffff",
    color: "#343A40",
   },
  },
  windows: {
   background: "#ffffff",
  },
 },
 apps: [
  {
   pkg: "chrome.windoors.com",
   name: "Chrome",
   source: "apps/installed/chrome.windoors.com/Chrome.jsx",
   icon: (
    <>
     <img src="https://cdn-icons-png.flaticon.com/512/888/888846.png" />
    </>
   ),
  },
  {
   pkg: "calculator.windoors.com",
   name: "Calculator",
   source: "apps/system/calculator.windoors.com/Calculator.jsx",
   icon: (
    <>
     <img src="https://cdn-icons-png.flaticon.com/512/548/548353.png" />
    </>
   ),
  },
 ],
 taskbar: { apps: ["chrome.windoors.com", "calculator.windoors.com"] },
};
