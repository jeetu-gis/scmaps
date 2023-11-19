import React, { useState, useEffect, useRef, useMemo } from "react";
import styled from "styled-components";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import {
  DirectionsService,
  DirectionsRenderer,
  Marker,
  Autocomplete,
  InfoWindow,
} from "@react-google-maps/api";

import superchargers from "../../../data/superchargersdata.json";
import { defaultPadding } from "ol/render/canvas";

var mainmap;
const columnStyle1 = {
  float: "left",
  width: "80%",
  padding: "10px",
  height: "100vh",
};
const columnStyle2 = {
  float: "left",
  width: "20%",
  padding: "10px",
  height: "100vh",
};
const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 37.534585,
  lng: -77.430575,
};

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(true);

  const checkHandler = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      mainmap.data.addGeoJson(superchargers);
    } else {
      mainmap.data.forEach((feature) => mainmap.data.remove(feature));
    }
  };
  return (
    <div>
      <input
        type="checkbox"
        id="checkbox"
        checked={isChecked}
        onChange={checkHandler}
      />
      <label htmlFor="checkbox">Toggle Superchargers </label>
    </div>
  );
};
const libraries = ["drawing", "places", "geometry"];
function GooglemapWrapper() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR API KEY",
    libraries: libraries,
  });
  const [map, setMap] = React.useState(null);
  //directions
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const originRef = useRef();
  const destiantionRef = useRef();

  const onLoad = React.useCallback(function callback(map) {
    map.setZoom(5);
    setMap(map);
    mainmap = map;
    map.data.addGeoJson(superchargers);

    //mouse evants
    // Set mouseover event for each feature.
    map.data.addListener("mouseover", (event) => {
      document.getElementById("info-box").textContent =
        " Name:" +
        event.feature.getProperty("name") +
        " Status:" +
        event.feature.getProperty("status") +
        " Stalls:" +
        event.feature.getProperty("stallCount") +
        " Power KW:" +
        event.feature.getProperty("powerKilowatt");
      let add = event.feature.getProperty("address");
      let str = "";
      let zip = "";
      let city = "";
      let state = "";

      Object.keys(add).map((key) => {
        console.log(key);
        console.log(add[key]);

        if (key == "street") {
          str = add[key];
        }

        if (key == "city") {
          city = add[key];
        }
        if (key == "state") {
          state = add[key];
        }
        if (key == "zip") {
          zip = add[key];
        }
        document.getElementById("address").textContent =
          str + " " + city + " " + state + " " + zip;

        destiantionRef.current.value =
          str + " " + city + " " + state + " " + zip;
      });
    });
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  // Directions
  async function getDirections() {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new DirectionsRenderer();

    //directionsRenderer.setMap(mainMap);
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    console.log(results);
    setDirectionsResponse(results);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return isLoaded ? (
    <div>
      <div style={columnStyle1}>
        <MapContainer>
          <GoogleMap
            id="map"
            mapContainerStyle={containerStyle}
            center={center}
            zoom={6}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </MapContainer>
      </div>
      <div style={columnStyle2}>
        <div>
          <Checkbox />
        </div>
        <form>
          <p>Please enter from and to below:</p>
          <Autocomplete>
            <input
              type="text"
              name="Origin"
              className="form-control"
              placeholder="Origin"
              ref={originRef}
            />
          </Autocomplete>
          <Autocomplete>
            <input
              type="text"
              name="Destication"
              className="form-control"
              placeholder="Destication"
              ref={destiantionRef}
            />
          </Autocomplete>
          <button name="submit" type="button" onClick={getDirections}>
            Search
          </button>
          <button name="clear" type="button" onClick={clearRoute}>
            Clear
          </button>
        </form>
        <form>
          <div>
            <span id="info-box"></span>
          </div>
          <div>
            <span id="address"></span>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default GooglemapWrapper;
