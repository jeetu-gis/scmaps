import React, { useState, useEffect, useRef, useMemo } from "react";

import PropTypes from "prop-types";
import "./react-leaflet.css";
import "leaflet/dist/leaflet.css";
import turbines from "../../../data/offshore_wind.json";

import { MapContainer, useMapEvents } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { GeoJSON } from "react-leaflet";
import L, { divIcon } from "leaflet";

import { useMap } from "react-leaflet";
import { Marker } from "react-leaflet";
import { Popup } from "react-leaflet";

import * as turf from "@turf/turf";

const customMarkerIcon = (name) =>
  divIcon({
    html: "",
    className: "icon",
  });

const poly = [
  [46.13417, -64.3359375],
  [42.1634034, -72.6855469],
  [38.0653924, -76.2011719],
  [34.2345124, -77.6074219],
  [32.7688005, -77.2558594],
  [34.5970415, -74.0039063],
  [37.2303284, -70.8398438],
  [40.5805847, -66.2695313],
  [43.1971673, -63.4570313],
  [45.1510533, -62.7539063],
  [46.0122238, -63.984375],
  [46.13417, -64.3359375],
];
function LocationMarker() {
  const [position, setPosition] = useState(null);
  var latlons = [];
  var startpolygon = false;
  const map = useMap();
  var latlngs = [
    [46.13417, -64.3359375],
    [42.1634034, -72.6855469],
    [38.0653924, -76.2011719],
    [34.2345124, -77.6074219],
    [32.7688005, -77.2558594],
    [34.5970415, -74.0039063],
    [37.2303284, -70.8398438],
    [40.5805847, -66.2695313],
    [43.1971673, -63.4570313],
    [45.1510533, -62.7539063],
    [46.0122238, -63.984375],
    [46.13417, -64.3359375],
  ];

  var polygon = L.polygon(latlngs, { color: "GREEN" }).addTo(map);

  /* const drawPolygon = useMapEvents({
    click(e) {
      console.log("click", e.latlng);
      latlons.push(e.latlng);
    },
    doubleclick(e) {
      console.log("doubleclick", e.latlng);
      latlons.push(e.latlng);
      startpolygon = true;
    },
  }); */

  //   return (
  //     <button name="drawPolygon" type="button" onClick={drawPolygon}>
  //       Draw Polygon
  //     </button>
  //   );
}
const setIcon = ({ properties }, latlng) => {
  return L.marker(latlng, {
    icon: customMarkerIcon(properties.WIND_TURBINE_ID),
  });
};
function turfArea() {
  var polygon = turf.polygon([poly]);

  var area = turf.area(polygon);

  document.getElementById("area").textContent = "Area in square meters:" + area;
}

function turfCentroid() {
  var polygon = turf.polygon([poly]);

  var cen = turf.centroid(polygon);

  document.getElementById("area").textContent =
    "centroid:" +
    cen.geometry.coordinates[0] +
    "," +
    cen.geometry.coordinates[1];
}
function turfdistance() {
  var from = turf.point([46.13417, -64.3359375]);
  var to = turf.point([32.7688005, -77.2558594]);
  var options = { units: "miles" };

  var distance = turf.distance(from, to, options);

  document.getElementById("area").textContent = "distance in miles:" + distance;
}

function turfsample() {
  //var points = turf.randomPoint(100, { bbox: [-64, 30, -60, 45] });

  var sample = turf.sample(turbines, 34);
  console.log(sample);

  document.getElementById("area").textContent =
    "samples collected:" + sample.features.length;
}

function EditReactLeaflet() {
  const [center, setCenter] = useState({ lat: 39.571977, lng: -75.834524 });
  const ZOOM_LEVEL = 7;
  const [mapLayers, setMapLayers] = useState([]);
  const mapRef = useRef();

  /* function drawPolygon() {
    var startpolygon = false;
    var latlons = [];
    var DD = useMapEvents({
      click(e) {
        console.log("click", e.latlng);
        latlons.push(e.latlng);
      },
      doubleclick(e) {
        console.log("doubleclick", e.latlng);
        latlons.push(e.latlng);
        startpolygon = true;
      },
    });
  } */
  return (
    <section className="map-container">
      <div className="columnleft">
        <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON data={turbines} pointToLayer={setIcon} />
          <LocationMarker />
        </MapContainer>
      </div>
      <div className="columnright">
        <form>
          <button name="getArea" type="button" onClick={turfArea}>
            Get Area
          </button>
          <button name="tdistance" type="button" onClick={turfdistance}>
            Destination Distance
          </button>
          <button name="tcentroid" type="button" onClick={turfCentroid}>
            get centroid
          </button>
          <button name="tsampling" type="button" onClick={turfsample}>
            Sampling
          </button>
        </form>
        <div id="info-box">
          <span id="area"></span>
        </div>
      </div>
    </section>
  );
}

EditReactLeaflet.propTypes = {};

EditReactLeaflet.defaultProps = {};

export default EditReactLeaflet;

//https://openlayers.org/data/vector/ecoregions.json
