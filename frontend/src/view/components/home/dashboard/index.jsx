import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAssets,
  setAssetType,
  getAssets,
} from "../../../../controller/reducer/assets";
import {
  getLoading,
  getShowSidenav,
  pageLoaded,
} from "../../../../controller/reducer/ui";
import Loader from "../widget/loader";
import TypeSelector from "../widget/type";
import Map from "./map";
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
const Dashboard = ({}) => {
  const dispatch = useDispatch();
  const assets = useSelector(getAssets);

  useEffect(() => {
    dispatch(pageLoaded());
  }, [dispatch]);

  const onSelect = (assetType) => {
    dispatch(setAssetType(assetType));
    dispatch(loadAssets());
  };
  const sidenav = useSelector(getShowSidenav);

  if (useSelector(getLoading)) return <Loader />;

  return (
    <div
      className="dashboard bg-light"
      style={{ left: sidenav ? "200px" : "0px" }}
    >
      <div className="type-child">
        <TypeSelector onSelect={onSelect} />
      </div>

      <div className="map-child">
        <Map />
      </div>

    </div>
  );
};

export default Dashboard;
