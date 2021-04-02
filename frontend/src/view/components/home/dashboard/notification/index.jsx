import React, { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getNotifications, loadNotifications, loadNotificationsSuccess } from "../../../../../controller/reducer/geo";
import { getEmail } from "../../../../../controller/reducer/user";
import { SocketContext } from "../../../../../utils/socket";
import NotificationList from "./NotificationList";
import "./styles.css";

function NotificationArea({dispatch}) {
  const notifications = useSelector(getNotifications);
  const socket = useContext(SocketContext);
  const email = useSelector(getEmail);
  // logger(notifications);
  useEffect(() => {
    console.log(socket);
    socket.on("notification", (notification) => {
      console.log(notification);
      dispatch(loadNotificationsSuccess([notification, ...notifications]));
    });
    return () => socket.off("notification");
  }, [socket, notifications]);

  const onSeenSubmit = (e) => {
    e.preventDefault();
    let present = false;
    notifications.forEach((notification) => {
      if (!notification.seenBy.includes(email)) {
        socket.emit("notification", {
          assetId: notification.assetId,
          id: notification._id,
          email,
        });
        present  = true;
      }
    });
    if(present)    dispatch(loadNotifications());
  };

  return (
    <div className="notification-box">
      <h1 className="h3 font-weight-normal">Notifications</h1>
      <hr />
      <Button
        onClick={onSeenSubmit}
        variant="outline-primary"
        className="mr-4"
        block
      >
        Mark Seen
      </Button>
      <div className="notification-box-container">
        <NotificationList notifications={notifications} email={email} />
      </div>
    </div>
  );
}

export default NotificationArea;
