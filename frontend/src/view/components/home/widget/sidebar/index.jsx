import React from "react";
import { Nav } from "react-bootstrap";
import "./styles.css";
import dashboardIcon from '../../../../../assets/icons/dashboard.png';
import trackIcon from '../../../../../assets/icons/track.png';
import tableIcon from '../../../../../assets/icons/table.png';
import logoutIcon from '../../../../../assets/icons/logout.png';

function SideBar({ activeKey, onSelect, onShow }) {
  return (
    <div id="mySidenav" className="sidenav bg-secondary">
      <Nav
        variant="tabs"
        activeKey={activeKey}
        onSelect={onSelect}
        className="flex-column"
      >
        <Nav.Item>
          <Nav.Link eventKey="1">
            <img
              className="icon"
              src={dashboardIcon}
            />
            <p className=" h5 font-weight-light">Dashboard </p>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2">
            <img
              className="icon"
              src={trackIcon}
            />
            <p className=" h5 font-weight-light">Track Asset</p>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="3">
            <img
              className="icon"
              src={tableIcon}
            />
            <p className=" h5 font-weight-light">All Assets</p>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={onShow}>
            <img
              className="icon"
              src={logoutIcon}
            />
            <p className="h5 font-weight-light">Logout</p>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default SideBar;
