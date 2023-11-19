import React, { useState, useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import GeoJSON from "ol/format/GeoJSON";
import { transform } from "ol/proj";
import { TopoJSON } from "ol/format";
import { toStringXY } from "ol/coordinate";
import hydrogedemand from "../../../data/Hydrogen_Demand_and_Resources.json";
import ecoregions from "../../../data/ecoregions.json";
// Styling

function OpenlayersWrapper(props) {
  // set intial state

  const [map, setMap] = useState();
  const mapElement = useRef();
  const mapRef = useRef();
  mapRef.current = map;

  useEffect(() => {
    const vectorLayer = new VectorLayer({
      background: "#1a2b39",
      source: new VectorSource({
        url: "https://openlayers.org/data/vector/ecoregions.json",
        format: new GeoJSON(),
      }),
      /*  source: new VectorSource({
        format: new GeoJSON(),
        addFeatures: new GeoJSON().readFeatures(ecoregions),
      }), */
      style: {
        "fill-color": ["string", ["get", "COLOR"], "#eee"],
      },
    });
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: transform([-105.562776, 47.049039], "EPSG:4326", "EPSG:3857"),
        zoom: 4,
      }),
      controls: [],
    });

    setMap(initialMap);

    const featureOverlay = new VectorLayer({
      source: new VectorSource(),
      map: map,
      style: {
        "stroke-color": "rgba(255, 255, 255, 0.7)",
        "stroke-width": 2,
      },
    });

    let highlight;

    const displayFeatureInfo = function (pixel) {
      const feature = initialMap.forEachFeatureAtPixel(
        pixel,
        function (feature) {
          return feature;
        }
      );

      const info = document.getElementById("info");
      if (feature) {
        info.innerHTML =
          feature.get("ECO_NAME") + " | " + feature.get("BIOME_NAME") ||
          "&nbsp;";
      } else {
        info.innerHTML = "&nbsp;";
      }

      if (feature !== highlight) {
        if (highlight) {
          featureOverlay.getSource().removeFeature(highlight);
        }
        if (feature) {
          featureOverlay.getSource().addFeature(feature);
        }
        highlight = feature;
      }
    };
    initialMap.on("click", function (evt) {
      displayFeatureInfo(evt.pixel);
    });
    initialMap.on("pointermove", function (evt) {
      if (evt.dragging) {
        return;
      }
      const pixel = initialMap.getEventPixel(evt.originalEvent);
      displayFeatureInfo(pixel);
    });
  }, []);

  // render component
  return (
    <div>
      <div className="columnleft">
        <div ref={mapElement} className="map-container"></div>
      </div>
      <div className="columnright">
        <span id="info"></span>
      </div>
    </div>
  );
}

export default OpenlayersWrapper;
