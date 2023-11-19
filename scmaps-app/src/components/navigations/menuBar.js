import React from "react";

import "./menuBar.css";
import logo from "../../logo.png";

const MenuBar = () => {
  return (
    <nav className="header">
      <div className="nav-wrapper">
        <a className="logo" href="/">
          <img src={logo} alt="RVA JS 2023" />
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>

        <ul className="menu">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/SimpleMap">Leaflet</a>
          </li>
          <li>
            <a href="/EditlfMap">Turf-Leaflet</a>
          </li>
          <li>
            <a href="/OlMap">Openlayers</a>
          </li>
          <li>
            <a href="/PageGooglemap">GoogleMaps</a>
          </li>
          <li>
            <a href="/AboutUs">About Me</a>
          </li>
          <li>
            <a href="/ContactUs">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MenuBar;
