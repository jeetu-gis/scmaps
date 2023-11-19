import React from "react";
import MenuBar from "../components/navigations/menuBar";
import Footer from "../components/navigations/footer";

import "./layout.css";

const Layout = (props) => {
  return (
    <React.Fragment>
      <MenuBar />

      <main className="main-content">{props.children}</main>

      <Footer />
    </React.Fragment>
  );
};

export default Layout;
