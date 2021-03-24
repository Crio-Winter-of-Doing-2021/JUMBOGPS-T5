import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./style.css";
import Map from "./map";
import {
  loadAsset,
  getAsset,
  getAssetInfo,
  getGeoJSON,
} from "../../../../controller/reducer/asset";
import { getLoading, setTrackTabId } from "../../../../controller/reducer/ui";
import Info from "./info";
import DataTable from "./table";
import AutoSearch from "./search";
import DateRangeSelector from "./date-range";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import Toggle from "../widget/toggle";
import Tabs from "./tabs";
import { setGeoFence, setGeoRoute, updateGeoFence,updateGeoRoute } from "../../../../controller/reducer/geo";
import Notifications from "../widget/notifications";

const Track = ({ dispatch }) => {
  const asset = useSelector(getAsset);
  const assetInfo = useSelector(getAssetInfo);
  const geoJSON = useSelector(getGeoJSON);
  const loading = useSelector(getLoading);

  const [visualize, setVisualize] = useState(false);
  const [bound, setBound] = useState(false);

  const setGeoFenceData = (data) => dispatch(setGeoFence(data));
  const setGeoRouteData = (data) => dispatch(setGeoRoute(data));
  const submitGeoFence = () => {
    dispatch(updateGeoFence());
  }
  const submitGeoRoute = () => {
    dispatch(updateGeoRoute());
  }
  const onSelectTab = (key) => dispatch(setTrackTabId(key));
  

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
      <DateRangeSelector dispatch={dispatch} />
      <hr />
      <div className="d-flex justify-content-center ">
      <Tabs  onSelect={onSelectTab}/>
      </div>

      <div className="map-view">
        <Map
          asset={asset.asset_data}
          geoJSON={visualize ? geoJSON : null}
          locArray={asset.track}
          bound={bound}
          setGeoFence={setGeoFenceData}
          setGeoRoute={setGeoRouteData}
          submitGeoFence={submitGeoFence}
          submitGeoRoute={submitGeoRoute}
        />
      </div>
      <div className="card-view ">
        <h1 className="h3 font-weight-normal">Notifications</h1>
        <hr />
        <Notifications/>
      </div>
      <br />
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
