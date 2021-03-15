import React, { useEffect } from "react";
import "./style.css";
import DataTable from "../widget/table";
import { pageLoaded } from "../../../../controller/reducer/ui";
import TypeSelector from "../widget/type";

const AssetList = ({ dispatch }) => {


  useEffect(() => {
    dispatch(pageLoaded());
  }, [dispatch]);

  return (
    <div className="asset-list bg-light">
      <h1 className="h2  font-weight-normal">All Assets</h1>
      <hr></hr>
      <TypeSelector  dispatch={dispatch}/>
      <DataTable dispatch={dispatch}  />
    </div>
  );
};

export default AssetList;
