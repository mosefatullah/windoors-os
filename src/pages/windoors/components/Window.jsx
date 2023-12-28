import React from "react";
import DynamicComponentLoader from "./DynamicModule";

function Window({ data }) {
 let [App, setApp] = React.useState(<>{data.name}</>);

 React.useEffect(() => {
  function kjghsdkjgn() {
   setApp(
    <DynamicComponentLoader
     modulePath={`./../${data.source}`}
    />
   );
  }
  try {
   kjghsdkjgn();
  } catch (error) {
   kjghsdkjgn();
  }
 }, []);

 return <>{App}</>;
}

export default Window;
