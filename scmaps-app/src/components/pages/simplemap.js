import React from "react";
import ReactLeaflet from "../maps/react-leaflet/react-leaflet";

const SimpleMap = () => {
  return (
    <React.Fragment>
      <ReactLeaflet style={{ height: "100vh" }} />
    </React.Fragment>
  );
};

export default SimpleMap;

/*
            <Pricing />
            <Testimonials />

*/
