import "./style.css";
import Map from "../widget/map";
import TypeSelector from "../widget/type";
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

  return (
    <div className="dashboard bg-light">
       <div className="type-child">
       <TypeSelector  dispatch={dispatch}/>
       </div>
   
      <div className="map-child">
        <Map assets={assets} dispatch={dispatch}/>
      </div>
    </div>
  );
};

export default Dashboard;
