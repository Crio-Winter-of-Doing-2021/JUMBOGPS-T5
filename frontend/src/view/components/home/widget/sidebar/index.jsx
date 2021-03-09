import React from "react";
import { Nav } from "react-bootstrap";
import "./styles.css";

function SideBar({activeKey,onSelect,onShow}) {

  return (
    <div id="mySidenav" className="sidenav" >
      <Nav variant="pills"  activeKey={activeKey} onSelect={onSelect} className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey="1" >Dashboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2" >Track Asset</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="3" >All Assets</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  onClick={onShow}>Sign Out</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default SideBar;
