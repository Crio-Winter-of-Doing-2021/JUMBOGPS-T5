import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setAssetInfo } from "../../../../controller/reducer/asset";
import { loadAssets, setAssetType } from "../../../../controller/reducer/assets";
import { getLoading, getShowSidenav, pageLoaded } from "../../../../controller/reducer/ui";
import Loader from "../widget/loader";
import TypeSelector from "../widget/type";
import "./style.css";
import DataTable from "./table";

/**
 * Asset List Component
 * @description Shows List of all assets in a table
 * @component
 * @example
 * return (
 *   <AssetList dispatch={dispatch}/>
 * )
 */
const AssetList = ({ dispatch }) => {
  useEffect(() => {
    dispatch(pageLoaded());
  }, [dispatch]);

  const onSelectTypeSelector = (assetType) => {
    dispatch(setAssetType(assetType));
    dispatch(loadAssets());
  };

  const onSelectTableItem = (id, name) => {
    dispatch(setAssetInfo({ id, name }));
  };
  const sidenav = useSelector(getShowSidenav);
  if (useSelector(getLoading)) return <Loader />;

  return (
    <div
      className="asset-list bg-light"
      style={{ left: sidenav ? "200px" : "0px" }}
    >
      <h1 className="h2  font-weight-normal">All Assets</h1>
      <hr></hr>
      <TypeSelector onSelect={onSelectTypeSelector} />
      <DataTable onSelect={onSelectTableItem} />
    </div>
  );
};

export default AssetList;
