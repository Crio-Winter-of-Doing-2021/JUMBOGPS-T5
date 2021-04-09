import React, { useContext } from "react";
import { Badge, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAssetNotifications } from "../../../../../controller/reducer/geo";
import {
  getUnseenAssetNotificationsCount,
  markSeenAssetNotifications,
} from "../../../../../controller/reducer/ui";
import { getEmail } from "../../../../../controller/reducer/user";
import { SocketContext } from "../../../../../utils/socket";
import NotificationList from "./NotificationList";
import "./styles.css";

function NotificationArea({ dispatch, assetId }) {
  const notifications = useSelector(getAssetNotifications);
  const unseenAssetNotificationsCount = useSelector(
    getUnseenAssetNotificationsCount
  );
  const socket = useContext(SocketContext);
  const email = useSelector(getEmail);

  const onSeenSubmit = () => {
    let unseenNotifications = notifications
      .filter((notification) => !notification.seen)
      .map((notification) => ({
        id: notification._id,
        assetId: notification.assetId,
        email,
      }));
    socket.emit("notification", unseenNotifications);
    dispatch(
      markSeenAssetNotifications(
        notifications.map((notification) => ({ ...notification, seen: true }))
      )
    );
  };

  return (
    <div className="notification-box-track">
      <h1 className="h3 font-weight-normal">
        Notifications{" "}
        {unseenAssetNotificationsCount !== 0 && (
          <Badge variant="light">{unseenAssetNotificationsCount}</Badge>
        )}{" "}
      </h1>
      <hr />
      {unseenAssetNotificationsCount !== 0 && (
        <Button
          onClick={onSeenSubmit}
          variant="outline-primary"
          className="mr-4"
          block
        >
          Mark Seen
        </Button>
      )}
      <div className="notification-box-container">
        <NotificationList notifications={notifications} email={email} />
      </div>
    </div>
  );
}

export default NotificationArea;
