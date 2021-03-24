import "./style.css";
import Map from "./map";
import TypeSelector from "../widget/type";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAssets, loadAssets, setAssetType } from "../../../../controller/reducer/assets";
import { pageLoaded, getLoading } from "../../../../controller/reducer/ui";


const Dashboard = ({dispatch}) => {
  const assets = useSelector(getAssets);

  const loading = useSelector(getLoading);

  useEffect(() => {
    dispatch(pageLoaded());
  }, [dispatch]);

  // console.log("assets ", assets, "loading", loading);
  const onSelect = (assetType) => {
    dispatch(setAssetType(assetType));
    dispatch(loadAssets());
  }

  return (
    <div className="dashboard bg-light">
       <div className="type-child">
       <TypeSelector  onSelect={onSelect}/>
       </div>
   
      <div className="map-child">
        <Map assets={assets} dispatch={dispatch}/>
      </div>
    </div>
  );
};

export default Dashboard;
