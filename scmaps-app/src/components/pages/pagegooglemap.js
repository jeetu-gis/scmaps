import React from "react";
import GooglemapAPI from "../maps/googlemapapi/googlemapapi";

const PageGooglemap = () => {
  return (
    <React.Fragment>
      <GooglemapAPI style={{ height: "100vh" }} />
    </React.Fragment>
  );
};

export default PageGooglemap;
