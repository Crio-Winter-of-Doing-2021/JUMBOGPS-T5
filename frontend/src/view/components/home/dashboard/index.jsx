import React, { useState } from "react";
import "./style.css";
import Map from "../widget/map";
import SideBar from "../widget/sidebar";
import Info from "../widget/info";

const Dashboard = () => {

  return (
    <div className="dashboard">
      <div className="map-view" > <Map /></div>
      <div className="info-view" > <Info/></div>
    </div>
  );
};

export default Dashboard;
