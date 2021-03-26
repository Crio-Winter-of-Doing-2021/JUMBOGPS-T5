import moment from "moment";
import React from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getNotifications } from "../../../../../controller/reducer/geo";
import "./styles.css";


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
      {notifications.length===0 && (
        <h1 className="h4 font-weight-light">
          No Notifications available for this Asset
        </h1>
      )}
    </ListGroup>
  );
}

export default Notifications;
