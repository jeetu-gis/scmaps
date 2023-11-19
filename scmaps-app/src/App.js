import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./components/pages/home";
import SimpleMap from "./components/pages/simplemap";
import EditlfMap from "./components/pages/editreactleaflet";
import OlMap from "./components/pages/olmap";
import PageGooglemap from "./components/pages/pagegooglemap";
import ContactUs from "./components/pages/contactus";
import AboutUs from "./components/pages/aboutus";

import "./App.css";

function App() {
  return (
    <div className="body-wrap">
      <Router>
        <Layout>
          <Routes>
            <Route path={"/SimpleMap"} element={<SimpleMap />}></Route>
            <Route path={"/EditlfMap"} element={<EditlfMap />}></Route>
            <Route path={"/OlMap"} element={<OlMap />}></Route>
            <Route path={"/PageGooglemap"} element={<PageGooglemap />}></Route>
            <Route path={"/ContactUs"} element={<ContactUs />}></Route>
            <Route path={"/AboutUs"} element={<AboutUs />}></Route>
            <Route path={"/"} element={<Home />}></Route>
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
