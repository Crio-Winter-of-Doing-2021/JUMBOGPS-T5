import React from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import dashboardIcon from "../../../../../assets/icons/dashboard.png";
import logoutIcon from "../../../../../assets/icons/logout.png";
import profileIcon from "../../../../../assets/icons/profile.png";
import tableIcon from "../../../../../assets/icons/table.png";
import trackIcon from "../../../../../assets/icons/track.png";
import { getShowSidenav } from "../../../../../controller/reducer/ui";
import { Link } from "react-router-dom";
import "./styles.css";
import { getAssetInfo } from "../../../../../controller/reducer/asset";

/**
 * Side Navigation Component
 * @param {string} props.activeKey   Active Key of sidenav
 * @param {function} props.onSelect   selects nav tab
 * @param {function} props.onShow   toggle Logout modal
 * @component
 * @example
 * return (
 *   <SideBar activeKey={activeKey} onSelect={onSelect} onShow={onShow}/>
 * )
 */
function SideBar({ activeKey, onSelect, onShow }) {
  const show = useSelector(getShowSidenav);
  const assetId = useSelector(getAssetInfo).id;
  return (
    <div
      id="sidenav"
      className="sidenav bg-secondary"
      style={{ width: show ? "var(--sidenav-width)" : "0px" }}
    >
      <Nav
        variant="tabs"
        activeKey={activeKey}
        onSelect={onSelect}
        className="flex-column"
      >
        <Nav.Item>
          <Nav.Link as={Link} to="/" eventKey="1">
            <img className="icon" src={dashboardIcon} alt="dashboard"/>
            <p className="h5 font-weight-light">Dashboard </p>     
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`/track/${assetId ? assetId : "none"}`} eventKey="2">
            <img className="icon" src={trackIcon} alt="track"/>
            <p className=" h5 font-weight-light">Track Asset</p>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/asset-list" eventKey="3">
            <img className="icon" src={tableIcon} alt="asset list"/>
            <p className=" h5 font-weight-light">All Assets</p>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/profile" href="/profile" eventKey="4">
            <img className="icon" src={profileIcon} alt="profile"/>
            <p className=" h5 font-weight-light">Profile</p>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={onShow}>
            <img className="icon" src={logoutIcon} alt="signout"/>
            <p className="h5 font-weight-light">Logout</p>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default SideBar;
