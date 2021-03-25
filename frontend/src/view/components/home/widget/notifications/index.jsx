import React from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getNotifications } from "../../../../../controller/reducer/geo";
import "./styles.css";
import moment from "moment";

const message = (item) => {
  return (
    `Asset crossed Geo ${item.type === "geofence" ? "Fence" : "Route"}` +
    ` [ latitude: ${item.lat}, longitude: ${item.lon} ]` +
    ` at ${moment(item.timestamp).format("dddd, MMMM Do YYYY, h:mm:ss a")} `
  );
};

function Notifications({}) {
  const notifications = useSelector(getNotifications);

  return (
    <ListGroup className="box">
      {notifications &&
        notifications.map((item, id) => (
          <ListGroup.Item key={id}>{message(item)}</ListGroup.Item>
        ))}
      {/* <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item> */}
    </ListGroup>
  );
}

export default Notifications;
