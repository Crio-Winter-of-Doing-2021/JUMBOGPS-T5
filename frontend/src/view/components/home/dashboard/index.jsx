import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAssets,
  setAssetType
} from "../../../../controller/reducer/assets";
import {
  getLoading,
  getShowSidenav,
  getTabId,
  pageLoaded,
  setTabId
} from "../../../../controller/reducer/ui";
import Loader from "../widget/loader";
import TypeSelector from "../widget/type";
import Map from "./map";
import NotificationArea from "./notification";
import "./style.css";

/**
 * Dashboard Component
 * @description Shows Map with markers of all asset locations
 * @component
 * @example
 * return (
 *   <Dashboard dispatch={dispatch}/>
 * )
 */
const Dashboard = (match) => {
  const dispatch = useDispatch();
  const tabId = useSelector(getTabId);
  // logger(match.history.location.hash);

  useEffect(() => {
    if (tabId !== "1") dispatch(setTabId("1"));
  }, [tabId]);

  useEffect(() => {
    dispatch(pageLoaded());
  }, []);

  const onSelect = (assetType) => {
    dispatch(setAssetType(assetType));
    dispatch(loadAssets());
  };
  const sidenav = useSelector(getShowSidenav);

  if (useSelector(getLoading)) return <Loader />;

  return (
    <div
      className="dashboard bg-light"
      style={{ left: sidenav ? "var(--sidenav-width)" : "0px" }}
    >
      <div className="type-child">
        <TypeSelector onSelect={onSelect} />
      </div>

      <div className="map-child">
        <Map />
      </div>
      <div className="notifications-child" id="notification">
        
        <NotificationArea dispatch={dispatch}/>
      </div>
    </div>
  );
};

export default Dashboard;
