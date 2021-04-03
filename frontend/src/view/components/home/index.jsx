import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addNotification } from "../../../controller/reducer/geo";
import {
  getError,
  getShowSidenav,
  getTabId,
  getToastMessage,
  setError,
  setshowLogoutModal,
  setSuccessToast,
  setTabId,
  toggleSidenav,
  setDeviceSize,
  hideSidenav,
  pageLoaded,
} from "../../../controller/reducer/ui";
import { performLogout } from "../../../controller/reducer/user";
import logger from "../../../utils/logger";
import { SocketContext } from "../../../utils/socket";
import useWindowDimensions from "../../hooks/windowDimension";
import AssetList from "./assetlist";
import Dashboard from "./dashboard";
import Profile from "./profile";
import "./style.css";
import Track from "./track";
import Header from "./widget/header";
import LogoutModal from "./widget/logout";
import SideBar from "./widget/sidebar";

/**
 * Notify toast message to user
 * @param {string} message
 */
const notify = (message) => toast.dark(message, { autoClose: 3000 });

/**
 * Home Component
 * @description
 * Homepage for user when signed it. It has header and sidebar component for
 * navigation among Dashboard, Track AssetList and  Profile component. It also has
 * signout option.
 * @component
 * @example
 * return (
 *   <Home />
 * )
 */
const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const tabId = useSelector(getTabId);
  const err = useSelector(getError);
  const msg = useSelector(getToastMessage);
  const sidenav = useSelector(getShowSidenav);

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width > 750) {
      if (!sidenav) dispatch(toggleSidenav());
      dispatch(setDeviceSize("md"));
    } else dispatch(setDeviceSize("sm"));
  }, [width]);

  useEffect(() => {
    if (err) {
      notify(err);
      dispatch(setError(""));
    }
  }, [err]);

  useEffect(() => {
    if (msg) {
      notify(msg);
      dispatch(setSuccessToast(""));
    }
  }, [msg]);

  useEffect(() => {
    dispatch(pageLoaded());
    // logger("logged")
  }, []);

  const socket = useContext(SocketContext);
  useEffect(() => {
    console.log(socket);
    socket.on("notification", (notification) => {
      console.log(notification);
      dispatch(addNotification(notification));
    });
    return () => socket.off("notification");
  }, [socket]);

  const handleClose = () => dispatch(setshowLogoutModal(false));
  const handleShow = () => dispatch(setshowLogoutModal(true));
  const handleShowSidenav = () => dispatch(toggleSidenav());
  const handleTouch = () => dispatch(hideSidenav());
  const handleSelect = (eventKey) => dispatch(setTabId(eventKey));

  const logout = () => dispatch(performLogout());

  return (
    <Router>
      <div className="home ">
        <Header onSelect={handleShowSidenav} />
        <SideBar
          activeKey={tabId}
          onSelect={handleSelect}
          onShow={handleShow}
        />
        <div
          className="child "
          onTouchStart={handleTouch}
          style={{ marginLeft: sidenav ? "var(--sidenav-width)" : "0px" }}
        >
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/track/:id" exact component={Track} />
            <Route path="/asset-list" exact component={AssetList} />
            <Route
              path="/profile"
              exact
              component={Profile}
              onSelect={() => dispatch(setTabId("4"))}
            />
          </Switch>
        </div>
        <LogoutModal onClose={handleClose} logout={logout} />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
};

export default Home;
