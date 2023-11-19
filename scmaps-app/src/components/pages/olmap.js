import React from "react";
import Openlayers from "../maps/openlayers/openlayers";

const OlMap = () => {
  return (
    <React.Fragment>
      <Openlayers style={{ height: "100vh" }} />
    </React.Fragment>
  );
};

export default OlMap;
