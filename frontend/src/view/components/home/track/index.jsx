import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./style.css";
import Map from "../widget/map-track";
import {
  loadAsset,
  getAsset,
  getAssetInfo,
} from "../../../../controller/reducer/asset";
import { getLoading } from "../../../../controller/reducer/ui";
import Info from "../widget/info-track";
import DataTable from "../widget/table-track";
import AutoSearch from "../widget/search";
import DateRangeSelector from "../widget/date-range";

const Track = ({ dispatch }) => {
  const asset = useSelector(getAsset);
  const assetInfo = useSelector(getAssetInfo);
  const loading = useSelector(getLoading);

  useEffect(() => {
    if (assetInfo.id) dispatch(loadAsset());
  }, [dispatch]);

  if (!assetInfo.name || !asset) {
    return (
      <div className="track bg-light">
        <h1 className="h2 font-weight-normal m-2">Asset : None</h1>
        <AutoSearch dispatch={dispatch} />
        <hr />
        <div className="map-view">
          <Map asset={null} locArray={[]} />
        </div>
      </div>
    );
  }

  console.log("asset ", asset, "loading", loading);
  return (
    <div className="track bg-light">
      <h1 className="h2 font-weight-normal m-2">
        Asset : {assetInfo.name}
        <span className="h6 font-weight-light">{"[" + assetInfo.id + "]"}</span>
      </h1>
      <AutoSearch dispatch={dispatch} />
      <DateRangeSelector dispatch={dispatch}/> 
      <hr />
      
      <div className="map-view">
        <Map asset={asset.asset_data} locArray={asset.track} />
      </div>
      <div className="card-view ">
        <h1 className="h3 font-weight-normal">Information</h1>
        <hr />
        <Info asset={asset.asset_data} />
      </div>
      <br />
      <div className="table-view">
        <h1 className="h3 font-weight-normal">Track List</h1>
        <hr />
        <DataTable dispatch={dispatch} track={asset.track} />
      </div>
    </div>
  );
};

export default Track;
