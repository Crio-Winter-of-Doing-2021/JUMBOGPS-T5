import React, { useState, useEffect } from "react";
import AssetList from "./assetlist";
import Dashboard from "./dashboard";
import "./style.css";
import Track from "./track";
import Header from "./widget/header";
import LogoutModal from "./widget/LogoutModal";
import SideBar from "./widget/sidebar";

let aid = '';

const Home = () => {
  const [activeKey, setActiveKey] = useState("1");
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelect = (eventKey) => setActiveKey(eventKey);
  const onSelectAsset = (assetId) => {
    aid = assetId;
    setActiveKey("2");
  }

  let component = <Dashboard onSelectAsset={onSelectAsset}/>;
  
  if (activeKey === "2") component = <Track ID={aid}/>;
  else if (activeKey === "3") component = <AssetList onSelectAsset={onSelectAsset}/>;



  return (
    <div className="home">
      <Header />
      <SideBar
        activeKey={activeKey}
        onSelect={handleSelect}
        onShow={handleShow}
      />
      <div className="child">{component}</div>
      <LogoutModal show={show} onClose={handleClose} />
    </div>
  );
};

export default Home;
