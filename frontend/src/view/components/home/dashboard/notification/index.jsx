import React, { useContext } from "react";
import { Badge, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  getNotifications,
  loadNotifications
} from "../../../../../controller/reducer/geo";
import { getUnseenNotifications } from "../../../../../controller/reducer/ui";
import { getEmail } from "../../../../../controller/reducer/user";
import { SocketContext } from "../../../../../utils/socket";
import NotificationList from "./NotificationList";
import "./styles.css";

function NotificationArea({ dispatch }) {
  const notifications = useSelector(getNotifications);
  const unseenNotifications = useSelector(getUnseenNotifications);
  const socket = useContext(SocketContext);
  const email = useSelector(getEmail);

  const onSeenSubmit = (e) => {
    e.preventDefault();
    unseenNotifications.forEach(({ id, assetId }) => {
      socket.emit("notification", {
        assetId,
        id,
        email,
      });
    });
    if (unseenNotifications.length !== 0) dispatch(loadNotifications());
  };

  return (
    <div className="notification-box">
      <h1 className="h3 font-weight-normal">
        Notifications{" "}
        {unseenNotifications.length!==0 && (
          <Badge variant="light">{unseenNotifications.length}</Badge>
        )}{" "}
      </h1>
      <hr />
     { (unseenNotifications.length !== 0) && <Button
        onClick={onSeenSubmit}
        variant="outline-primary"
        className="mr-4"
        block
      >
        Mark Seen
      </Button>}
      <div className="notification-box-container">
        <NotificationList notifications={notifications} email={email} />
      </div>
    </div>
  );
}

export default NotificationArea;
