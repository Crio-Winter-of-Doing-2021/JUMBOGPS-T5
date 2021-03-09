import React, { useState } from "react";
import "./style.css";
import Map from "../widget/map";
import SideBar from "../widget/sidebar";
import Info from "../widget/info";

const Track = () => {

  return (
    <div className="track">
      <div className="map-view" > <Map /></div>
    </div>
  );
};

export default Track;
