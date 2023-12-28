import React, { useState, useEffect } from "react";

const DynamicComponentLoader = ({ modulePath }) => {
 const [Component, setComponent] = useState(null);

 useEffect(() => {
  const loadComponent = async () => {
   try {
    const module = await import(`${modulePath}`);
    setComponent(() => module.default);
   } catch (error) {
    console.log("Application error:", error);
   }
  };

  loadComponent();
 }, [modulePath]);

 if (!Component) {
  return <div>Loading...</div>;
 }

 return <Component />;
};

export default DynamicComponentLoader;
