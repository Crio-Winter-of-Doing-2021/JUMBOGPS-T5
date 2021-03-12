import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import Map from "../widget/map-track";
import { loadAsset, getAsset } from "../../../../controller/reducer/asset";
import { getLoading } from "../../../../controller/reducer/ui";

// const ID = '604b71881c5f7c3410f11f16';

const Track = ({ ID }) => {
  const dispatch = useDispatch();
  const asset = useSelector(getAsset);

  const loading = useSelector(getLoading);

  useEffect(() => {
    dispatch(loadAsset(ID));
  }, [dispatch]);

  console.log("asset ", asset, "loading", loading);
  return (
    <div className="track bg-light">
      <h1 className="h2 font-weight-normal">Asset ID : {ID ? ID : "None"}</h1>
      <hr />
      <div className="map-view">
        {(ID && asset && asset.track )? (
          <Map asset={asset.asset_data} locArray={asset.track.track} />
        ) : (
          <Map asset={null} locArray={[]} />
        )}
      </div>
    </div>
  );
};

export default Track;
