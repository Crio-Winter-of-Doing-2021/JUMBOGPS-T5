import moment from "moment";
import React from "react";
import { Badge, Toast } from "react-bootstrap";

const fenceUrl =
  "https://icon-library.com/images/geofence-icon/geofence-icon-7.jpg";
const routeUrl =
  "https://cdn1.iconfinder.com/data/icons/leto-blue-navigation/64/_-22-512.png";

const msg = (type, status) => {
  let message = "";
  const tag = type === "geofence" ? "Geo Fence" : "Geo Route";
  if (status === "success") message += " has entered " + tag;
  else if (status === "warning") message += " has exited " + tag;
  else message += " is still outside " + tag;
  return message;
};

const NotificationList = ({ notifications, email }) => {
  return notifications.length === 0 ? (
    <p className="h4 font-weight-light">
      No Notifications available
    </p>
  ) : (
    notifications.map(
      ({ name, type, status, timestamp, lat, lon, seen, }, index) => (
        <Toast
          key={index}
          style={{ display: "inline-block" }}
          className="ml-2 mt-2 w-1000"
        >
          <Toast.Header
            className={`bg-${status}`}
            style={{ color: "white" }}
            closeButton={false}
          >
            <strong className="mr-auto">{name} </strong>
            <small>
              {moment.duration(moment().diff(timestamp)).humanize()} ago
            </small>
          </Toast.Header>
          <Toast.Body>
            <img
              src={type === "geofence" ? fenceUrl : routeUrl}
              className="rounded mr-2 img-icon"
              alt="Geo Bound Type"
            />
            <span className="h6 font-weight-normal">
              Asset Located [{lon},{lat}] {msg(type, status)}
            </span>
            <h6 style={{ display: "inline" }}>
              {!seen && (
                <Badge variant="info" className="ml-2">
                  NEW!
                </Badge>
              )}
            </h6>
          </Toast.Body>
        </Toast>
      )
    )
  );
};

export default NotificationList;
