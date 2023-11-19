import React from "react";
import PropTypes from "prop-types";
import "./react-leaflet.css";
import "leaflet/dist/leaflet.css";
import turbines from "../../../data/offshore_wind.json";

import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { GeoJSON } from "react-leaflet";
import L, { divIcon } from "leaflet";

import { useMap } from "react-leaflet";
import { Marker } from "react-leaflet";
import { Popup } from "react-leaflet";

const customMarkerIcon = (name) =>
  divIcon({
    html: name,
    className: "icon",
  });

const setIcon = ({ properties }, latlng) => {
  return L.marker(latlng, {
    icon: customMarkerIcon(properties.WIND_TURBINE_ID),
  });
};

const ReactLeaflet = () => (
  <section className="map-container">
    <div className="columnleft">
      <MapContainer center={[39.571977, -75.834524]} zoom={7}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          data={turbines}
          pointToLayer={setIcon}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(feature.properties.WIND_TURBINE_ID);
          }}
        />
      </MapContainer>
    </div>
    <div className="columnright">test</div>
  </section>
);

ReactLeaflet.propTypes = {};

ReactLeaflet.defaultProps = {};

export default ReactLeaflet;
