import React from 'react';
import { useSelector } from "react-redux";
import {
  Table,
  Button,
  OverlayTrigger,
  Tooltip,
  Popover,
} from "react-bootstrap";
import { getAssets, setAssetId } from "../../../../../controller/reducer/asset";
import Info from "../info";
import moment from 'moment';

const DataTable = ({dispatch,  track}) => {

    if(!track)  return <div></div>
    return (
        <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Reached</th>
          </tr>
        </thead>
        <tbody>
          {track.map((point, id) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{point.lat}</td>
                <td>{point.lon}</td>
                <td>{moment(point.timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td>
              </tr>
          ))}
        </tbody>
      </Table>
    )
}

export default DataTable;
