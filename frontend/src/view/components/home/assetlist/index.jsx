import React, { useEffect } from "react";
import "./style.css";
import DataTable from "./table";
import { pageLoaded } from "../../../../controller/reducer/ui";
import TypeSelector from "../widget/type";
import { loadAssets, setAssetType } from "../../../../controller/reducer/assets";
import { setAssetInfo } from "../../../../controller/reducer/asset";

const AssetList = ({ dispatch }) => {


  useEffect(() => {
    dispatch(pageLoaded());
  }, [dispatch]);

  const onSelectTypeSelector = (assetType) => {
    dispatch(setAssetType(assetType));
    dispatch(loadAssets());
  }

  const onSelectTableItem = (id,name) => {
    dispatch(setAssetInfo({id,name}))
  }

  return (
    <div className="asset-list bg-light">
      <h1 className="h2  font-weight-normal">All Assets</h1>
      <hr></hr>
      <TypeSelector  onSelect={onSelectTypeSelector}/>
      <DataTable onSelect={onSelectTableItem}  />
    </div>
  );
};

export default AssetList;
