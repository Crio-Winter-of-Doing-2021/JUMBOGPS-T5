import React, { useContext } from "react";
import { Badge, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  getNotifications,

} from "../../../../../controller/reducer/geo";
import {  getUnseenNotificationsCount, markSeenNotifications } from "../../../../../controller/reducer/ui";
import { getEmail } from "../../../../../controller/reducer/user";
import { SocketContext } from "../../../../../utils/socket";
import NotificationList from "./NotificationList";
import "./styles.css";

function NotificationArea({ dispatch }) {
  const notifications = useSelector(getNotifications);
  const unseenNotificationsCount = useSelector(getUnseenNotificationsCount);
  const socket = useContext(SocketContext);
  const email = useSelector(getEmail);

  const onSeenSubmit = () => {
    let newNotifications = [];
    notifications.forEach((notification) => {
      if (!notification.seen) {
        socket.emit("notification", {
          assetId:notification.assetId,
          id:notification._id,
          email,
        });
      }
      newNotifications.push({ ...notification, seen: true });
    });
    dispatch(markSeenNotifications(newNotifications));
  };

  return (
    <div className="notification-box">
      <h1 className="h3 font-weight-normal">
        Notifications{" "}
        {unseenNotificationsCount!==0 && (
          <Badge variant="light">{unseenNotificationsCount}</Badge>
        )}{" "}
      </h1>
      <hr />
     { (unseenNotificationsCount !== 0) && <Button
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
