import moment from "moment";
import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getDeviceSize } from "../../../../../controller/reducer/ui";

const DataTable = ({  track }) => {
  const deviceSize = useSelector(getDeviceSize);
  if (!track) return <div></div>;
  return (
    <Table striped bordered hover variant="light" size={deviceSize}>
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
            <td>
              {moment(point.timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a")}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;
