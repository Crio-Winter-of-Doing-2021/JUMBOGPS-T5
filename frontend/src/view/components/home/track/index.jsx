import React, {useEffect } from "react";
import {  useSelector } from "react-redux";
import "./style.css";
import Map from "../widget/map-track";
import { loadAsset, getAsset, getAssetId } from "../../../../controller/reducer/asset";
import { getLoading } from "../../../../controller/reducer/ui";


const Track = ({dispatch }) => {

  const asset = useSelector(getAsset);
  const assetId = useSelector(getAssetId);
  const loading = useSelector(getLoading);

  useEffect(() => {
    if(assetId) dispatch(loadAsset());
  }, [dispatch]);

  console.log("asset ", asset, "loading", loading);
  return (
    <div className="track bg-light">
      <h1 className="h2 font-weight-normal">Asset ID : {assetId ? assetId : "None"}</h1>
      <hr />
      <div className="map-view">
        {(assetId && asset && asset.track )? (
          <Map asset={asset.asset_data} locArray={asset.track} />
        ) : (
          <Map asset={null} locArray={[]} />
        )}
      </div>
    </div>
  );
};

export default Track;
