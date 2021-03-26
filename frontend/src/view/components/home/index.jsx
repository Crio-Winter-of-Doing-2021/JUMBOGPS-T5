import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
} from "../../../controller/reducer/ui";
import { performLogout } from "../../../controller/reducer/user";
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

  const tabId = useSelector(getTabId);
  const err = useSelector(getError);
  const msg = useSelector(getToastMessage);
  const sidenav = useSelector(getShowSidenav);

  const { width } = useWindowDimensions();

  if (width > 750 && !sidenav) {
    dispatch(toggleSidenav());
  }

  if (err) {
    notify(err);
    dispatch(setError(""));
  }

  if (msg) {
    notify(msg);
    dispatch(setSuccessToast(""));
  }

  const handleClose = () => dispatch(setshowLogoutModal(false));
  const handleShow = () => dispatch(setshowLogoutModal(true));
  const handleShowSidenav = () => dispatch(toggleSidenav());
  const handleSelect = (eventKey) => dispatch(setTabId(eventKey));
  const logout = () => dispatch(performLogout());

  let component = <Dashboard dispatch={dispatch} />;

  if (tabId === "2") component = <Track dispatch={dispatch} />;
  else if (tabId === "3") component = <AssetList dispatch={dispatch} />;
  else if (tabId === "4") component = <Profile dispatch={dispatch} />;

  return (
    <div className="home ">
      <Header onSelect={handleShowSidenav} />
      <SideBar activeKey={tabId} onSelect={handleSelect} onShow={handleShow} />
      <div className="child ">{component}</div>
      <LogoutModal onClose={handleClose} logout={logout} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Home;
