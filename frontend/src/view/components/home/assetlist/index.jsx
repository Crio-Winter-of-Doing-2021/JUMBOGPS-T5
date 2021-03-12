import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Table,Button } from "react-bootstrap";
import { getAssets } from "../../../../controller/reducer/asset";
import { pageLoaded, getLoading } from "../../../../controller/reducer/ui";

const AssetList = ({onSelectAsset}) => {
  const dispatch = useDispatch();
  const assets = useSelector(getAssets);
  const loading = useSelector(getLoading);
  const [asset, setAsset] = useState(null);

  useEffect(() => {
    dispatch(pageLoaded());
  }, [dispatch]);

  return (
    <div className="asset-list bg-light">
      <h1 className="h2  font-weight-normal">All Assets</h1>
      <hr></hr>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Last Updated</th>
            <th>History</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset,id) => (
            <tr key={id}>
              <td>{id}</td>
              <td >{asset.name}</td>
              <td >{asset.type}</td>
              <td >{asset.lat}</td>
              <td >{asset.lon}</td>
              <td >{new Date(asset.timestamp).toUTCString()}</td>
              <td ><Button variant="outline-primary" onClick={()=>onSelectAsset(asset._id)}>Track</Button></td>
            </tr>
          ))}
          {/* <tr>
            <td>3</td>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr> */}
        </tbody>
   
      </Table>
    </div>
  );
};

export default AssetList;
