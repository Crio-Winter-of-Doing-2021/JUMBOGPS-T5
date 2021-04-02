import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setAssetInfo } from "../../../../controller/reducer/asset";
import {
  getAssets,
  loadAssets,
  setAssetType,
} from "../../../../controller/reducer/assets";
import {
  getDeviceSize,
  getLoading,
  getShowSidenav,
  getTabId,
  pageLoaded,
  setTabId,
} from "../../../../controller/reducer/ui";
import Loader from "../widget/loader";
import TypeSelector from "../widget/type";
import "./style.css";
import DataTable from "./table";
import { CSVLink } from "react-csv";
import csvIcon from "../../../../assets/icons/table.svg";


const headers = [
  { label: "Asset Name", key: "name" },
  { label: "Type", key: "type" },
  { label: "Current Latitude", key: "lat" },
  { label: "Current Longitude", key: "lon" },
  { label: "Time", key: "timestamp" },
  { label: "Model Number", key: "body.modelNo" },
  { label: "Company Name", key: "body.companyName" },
  { label: "Employee ID", key: "body.employeeId" },
  { label: "Address", key: "body.address" },
  { label: "Description", key: "desc" },
  { label: "Image", key: "image_url" },
];

/**
 * Asset List Component
 * @description Shows List of all assets in a table
 * @component
 * @example
 * return (
 *   <AssetList dispatch={dispatch}/>
 * )
 */
const AssetList = ({}) => {
  const dispatch = useDispatch();
  const assets = useSelector(getAssets);
  const deviceSize = useSelector(getDeviceSize);
  
  useEffect(() => {
    dispatch(pageLoaded());
  }, [dispatch]);

  const onSelectTypeSelector = (assetType) => {
    dispatch(setAssetType(assetType));
    dispatch(loadAssets());
  };

  const tabId = useSelector(getTabId);
  useEffect(() => {
    if (tabId !== "3") dispatch(setTabId("3"));
  }, [tabId]);

  const sidenav = useSelector(getShowSidenav);
  if (useSelector(getLoading)) return <Loader />;

  return (
    <div
      className="asset-list bg-light"
      style={{ left: sidenav ? "var(--sidenav-width)" : "0px" }}
    >
      <h1 className="h2  font-weight-normal">All Assets</h1>
      <hr></hr>
      {assets && (
        <CSVLink
          data={assets}
          headers={headers}
          filename={"data.csv"}
          className={`btn${deviceSize==="sm"?"-sm":""} btn-dark btn-csv`}
          target="_blank"
        >
          <img src={csvIcon} className="mr-2 mb-1" alt="csv icon"/>CSV
        </CSVLink>
      )}
      <TypeSelector onSelect={onSelectTypeSelector} />
      <DataTable />
    </div>
  );
};

export default AssetList;
