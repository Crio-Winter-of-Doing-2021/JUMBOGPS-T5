import React, { useContext, useEffect, useCallback } from "react";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getNotifications } from "../../../../../controller/reducer/geo";
import {
  getUnseenNotificationsCount,
  markSeenNotifications,
} from "../../../../../controller/reducer/ui";
import { getEmail } from "../../../../../controller/reducer/user";
import { SocketContext } from "../../../../../utils/socket";
import NotificationList from "./NotificationList";
import "./styles.css";

function NotificationArea({ dispatch }) {
  const notifications = useSelector(getNotifications);
  const unseenNotificationsCount = useSelector(getUnseenNotificationsCount);
  const socket = useContext(SocketContext);
  const email = useSelector(getEmail);

  const onSeenSubmit = useCallback(() => {
    let unseenNotifications = notifications
      .filter((notification) => !notification.seen)
      .map((notification) => ({
        id: notification._id,
        assetId: notification.assetId,
        email,
      }));
    socket.emit("notification", unseenNotifications);
    dispatch(
      markSeenNotifications(
        notifications.map((notification) => ({ ...notification, seen: true }))
      )
    );
  }, [dispatch, notifications, email, socket]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (unseenNotificationsCount !== 0) onSeenSubmit();
    }, 10000);
    return () => clearTimeout(timer);
  }, [notifications, unseenNotificationsCount, onSeenSubmit]);

  return (
    <div className="notification-box">
      <h1 className="h3 font-weight-normal">
        Notifications{" "}
        {unseenNotificationsCount !== 0 && (
          <Badge variant="light">{unseenNotificationsCount}</Badge>
        )}{" "}
      </h1>
      <hr />
      <div className="notification-box-container">
        <NotificationList notifications={notifications} email={email} />
      </div>
    </div>
  );
}

export default NotificationArea;
