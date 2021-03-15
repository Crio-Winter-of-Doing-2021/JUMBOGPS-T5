import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getShowLogout,
  setshowLogoutModal,
  getTabId,
  setTabId,
  getError,
  setError
} from "../../../controller/reducer/ui";
import {
  removeUser,
  getUser,
  setRemember,
  loadUser,
  performLogout
} from "../../../controller/reducer/user";
import AssetList from "./assetlist";
import Dashboard from "./dashboard";
import "./style.css";
import Track from "./track";
import Header from "./widget/header";
import LogoutModal from "./widget/logout";
import SideBar from "./widget/sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let aid = "";

const notify = (message) => toast.dark(message, { autoClose: 3000 });

const Home = () => {
  const dispatch = useDispatch();

  const tabId = useSelector(getTabId);
  const err = useSelector(getError);


  if(err) {
    notify(err);
  }

  const handleClose = () => dispatch(setshowLogoutModal(false));
  const handleShow = () => dispatch(setshowLogoutModal(true));

  const handleSelect = (eventKey) => dispatch(setTabId(eventKey));

  const logout = ()=> dispatch(performLogout());

  let component = (
    <Dashboard dispatch={dispatch} />
  );

  if (tabId === "2") component = <Track dispatch={dispatch} ID={aid} />;
  else if (tabId === "3")
    component = <AssetList dispatch={dispatch}  />;

  return (
    <div className="home">
      <Header />
      <SideBar activeKey={tabId} onSelect={handleSelect} onShow={handleShow} />
      <div className="child">{component}</div>
      <LogoutModal onClose={handleClose} logout={logout} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Home;
