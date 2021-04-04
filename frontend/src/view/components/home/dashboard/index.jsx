import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAssets,
  setAssetType
} from "../../../../controller/reducer/assets";
import {
  getLoading,
  getShowSidenav
} from "../../../../controller/reducer/ui";
import { useSelectedTab } from "../../../hooks/useSelectedTab";
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
const Dashboard = () => {
  const dispatch = useDispatch();

  useSelectedTab("1");

  useEffect(() => {
    let mounted = true;
    if (mounted) dispatch(loadAssets({mounted}));
    return () => {mounted = false};
  }, [dispatch]);


  const onSelect = (assetType) => {
    dispatch(setAssetType(assetType));
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
        <Map dispatch={dispatch}/>
      </div>
      <div className="notifications-child" id="notification">
        
        <NotificationArea dispatch={dispatch}/>
      </div>
    </div>
  );
};

export default Dashboard;
