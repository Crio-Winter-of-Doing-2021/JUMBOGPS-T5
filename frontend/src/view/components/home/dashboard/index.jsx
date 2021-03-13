import "./style.css";
import Map from "../widget/map";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAssets } from "../../../../controller/reducer/asset";
import { pageLoaded, getLoading } from "../../../../controller/reducer/ui";

const Dashboard = ({dispatch}) => {
  const assets = useSelector(getAssets);

  const loading = useSelector(getLoading);

  useEffect(() => {
    dispatch(pageLoaded());
  }, [dispatch]);

  // console.log("assets ", assets, "loading", loading);

  let alat = 0;
  let alon = 0;
  assets.forEach((asset) => {
    alat += parseFloat(asset.lat);
    alon += parseFloat(asset.lon);
  });
  if (assets.length) {
    alat /= assets.length;
    alon /= assets.length;
  }


  return (
    <div className="dashboard bg-light">
      <div className="map-child">
        <Map assets={assets} loc={(alat, alon)} dispatch={dispatch}/>
      </div>
    </div>
  );
};

export default Dashboard;
