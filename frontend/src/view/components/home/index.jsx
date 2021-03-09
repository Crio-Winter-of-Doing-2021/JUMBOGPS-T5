import React, { useState } from "react";
import AssetList from "./assetlist";
import Dashboard from "./dashboard";
import "./style.css";
import Track from "./track";
import Header from "./widget/header";
import LogoutModal from "./widget/LogoutModal";
import SideBar from "./widget/sidebar";

const Home = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelect = (eventKey) => setActiveKey(eventKey);
  let component = <Dashboard />;
  if (activeKey === "2") component = <Track />;
  else if (activeKey === "3") component = <AssetList />;

  return (
    <div className="home">
      <Header />
      <SideBar activeKey={activeKey} onSelect={handleSelect} onShow={handleShow}/>
      <div className="child">{component}</div>
      <LogoutModal show={show} onClose={handleClose}/>
    </div>
  );
};

export default Home;
