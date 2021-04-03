import React, { useContext } from "react";
import { Badge, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  getAssetNotifications,
  loadAssetNotifications,


  loadNotifications
} from "../../../../../controller/reducer/geo";
import { getUnseenAssetNotifications } from "../../../../../controller/reducer/ui";
import { getEmail } from "../../../../../controller/reducer/user";
import { SocketContext } from "../../../../../utils/socket";
import NotificationList from "./NotificationList";
import "./styles.css";

function NotificationArea({ dispatch, assetId }) {
  const notifications = useSelector(getAssetNotifications);
  const unseenAssetNotifications = useSelector(getUnseenAssetNotifications);
  const socket = useContext(SocketContext);
  const email = useSelector(getEmail);

  const onSeenSubmit = (e) => {
    e.preventDefault();
    unseenAssetNotifications.forEach(({ assetId, id }) => {
      socket.emit("notification", {
        assetId,
        id,
        email,
      });
    });
    if (unseenAssetNotifications.length !== 0){
      dispatch(loadAssetNotifications());
      dispatch(loadNotifications());
    }
  };

  return (
    <div className="notification-box-track">
      <h1 className="h3 font-weight-normal">
        Notifications{" "}
        {unseenAssetNotifications.length!==0 && (
          <Badge variant="light">{unseenAssetNotifications.length}</Badge>
        )}{" "}
      </h1>
      <hr />
      {(unseenAssetNotifications.length !== 0) && <Button
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
