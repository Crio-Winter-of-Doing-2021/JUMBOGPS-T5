import "./style.css";
import Map from "../widget/map";
import SideBar from "../widget/sidebar";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Info from "../widget/info";
import { getAssets } from "../../../../controller/reducer/asset";
import { pageLoaded, getLoading } from "../../../../controller/reducer/ui";

const Dashboard = ({onSelectAsset}) => {
  const dispatch = useDispatch();
  const assets = useSelector(getAssets);

  const loading = useSelector(getLoading);

  const [asset, setAsset] = useState(null);

  useEffect(() => {
    dispatch(pageLoaded());
  }, [dispatch]);

  console.log("assets ", assets, "loading", loading);

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

  const onSelect = (asset) => setAsset(asset);

  return (
    <div className="dashboard bg-light">
      <div className="map-child">
        <Map assets={assets} loc={(alat, alon)} onSelect={onSelect} onSelectAsset={onSelectAsset}/>
      </div>
      {/* <div className="info-view">
        <Info asset={asset} />
      </div> */}
    </div>
  );
};

export default Dashboard;
