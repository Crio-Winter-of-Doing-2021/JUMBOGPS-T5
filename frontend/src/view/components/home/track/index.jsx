import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import {
  getAsset,
  getAssetInfo,

  loadAsset
} from "../../../../controller/reducer/asset";
import {
  getAssetsLength,
  loadAssets
} from "../../../../controller/reducer/assets";
import {
  setGeoFence,
  setGeoRoute,
  updateGeoFence,
  updateGeoRoute
} from "../../../../controller/reducer/geo";
import {
  getLoading,
  getShowSidenav,
  getTabId,
  setTabId,
  setTrackTabId
} from "../../../../controller/reducer/ui";
import logger from "../../../../utils/logger";
import Loader from "../widget/loader";
import Notifications from "../widget/notifications";
import DateRangeSelector from "./date-range";
import Info from "./info";
import Map from "./map";
import AutoSearch from "./search";
import "./style.css";
import DataTable from "./table";
import Tabs from "./tabs";
import csvIcon from "../../../../assets/icons/table.svg";

const headers = [
  { label: "Latitude", key: "lat" },
  { label: "Longitude", key: "lon" },
  { label: "Time", key: "timestamp" },
];

/**
 * Track Component
 * @description
 * For a particular asset:
 * 1. shows map locating all previous location
 * 2. shows information about it.
 * 3. shows Table data for  previous locations
 * 4. allows user to choose date range for locations
 * 5. allows user to geofence and/or georoute the asset
 * @component
 * @example
 * return (
 *   <Track dispatch={dispatch}/>
 * )
 */
const Track = ({ match }) => {
  const dispatch = useDispatch();
  const asset = useSelector(getAsset);
  const noOfAssets = useSelector(getAssetsLength);
  const assetInfo = useSelector(getAssetInfo);
  const tabId = useSelector(getTabId);

  const setGeoFenceData = (data) => dispatch(setGeoFence(data));
  const setGeoRouteData = (data) => dispatch(setGeoRoute(data));
  const submitGeoFence = () => dispatch(updateGeoFence());
  const submitGeoRoute = () => dispatch(updateGeoRoute());
  const onSelectTab = (key) => dispatch(setTrackTabId(key));

  useEffect(() => {
    if (
      match.params.id !== "none" ||
      (match.params.id !== "none" && match.params.id !== assetInfo.id)
    ) {
      dispatch(loadAsset(match.params.id));
    }
    if (tabId !== "2") dispatch(setTabId("2"));
    if (noOfAssets === 0) dispatch(loadAssets());
  }, [match.params.id]);

  const sidenav = useSelector(getShowSidenav);
  if (useSelector(getLoading)) return <Loader />;

  if (match.params.id === "none" || !asset.asset_data) {
    return (
      <div
        className="track bg-light"
        style={{ left: sidenav ? "200px" : "0px" }}
      >
        <h1 className="h2 font-weight-normal m-2">Asset : None</h1>
        <AutoSearch dispatch={dispatch} />
        <hr />
        <div className="map-view">
          <Map asset={null} locArray={[]} />
        </div>
      </div>
    );
  }

  logger("asset ", asset);
  return (
    <div className="track bg-light" style={{ left: sidenav ? "200px" : "0px" }}>
      <h1 className="h2 font-weight-normal m-2">
        Asset : {assetInfo.name}
        <span className="h6 font-weight-light">{"[" + assetInfo.id + "]"}</span>
      </h1>
      <Row>
        <Col lg={6}>
          <AutoSearch dispatch={dispatch} />
        </Col>
        <Col lg={6}>
          <DateRangeSelector dispatch={dispatch} />
        </Col>
      </Row>
      <hr />
      <div className="d-flex justify-content-center " id="track" >
        <Tabs onSelect={onSelectTab} />
      </div>

      <div className="map-view">
        <Map
          asset={asset.asset_data}
          locArray={asset.track}
          setGeoFence={setGeoFenceData}
          setGeoRoute={setGeoRouteData}
          submitGeoFence={submitGeoFence}
          submitGeoRoute={submitGeoRoute}
        />
      </div>
      <div className="card-view" id="notifications">
        <h1 className="h3 font-weight-normal">Notifications</h1>
        <hr />
        <Notifications />
      </div>
      <br />
      <div className="card-view " id="information">
        <h1 className="h3 font-weight-normal">Information</h1>
        <hr />
        <Info asset={asset.asset_data} />
      </div>
      <br />
      <div className="table-view" id="table">
        <h1 className="h3 font-weight-normal">Track List<CSVLink
          data={asset.track}
          headers={headers}
          filename={`${asset.asset_data.name}.csv`}
          className="btn btn-dark btn-csv"
          target="_blank"
        >
          <img src={csvIcon} className="mr-2 mb-1" alt="csv icon"/>CSV
        </CSVLink></h1>
        
        <hr />
        <DataTable dispatch={dispatch} track={asset.track} />
      </div>
    </div>
  );
};

export default Track;
