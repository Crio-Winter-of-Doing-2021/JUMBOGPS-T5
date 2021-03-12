import React from "react";
import { Nav } from "react-bootstrap";
import "./styles.css";

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
              src="https://cdn.iconscout.com/icon/premium/png-256-thumb/dashboard-maps-2728134-2263575.png"
            />
            <p className=" h5 font-weight-light">Dashboard </p>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2">
            <img
              className="icon"
              src="https://cdn.iconscout.com/icon/premium/png-512-thumb/route-location-track-1705468-1446011.png"
            />
            <p className=" h5 font-weight-light">Track Asset</p>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="3">
            <img
              className="icon"
              src="https://cdn3.iconfinder.com/data/icons/miscellaneous-1-line/64/datatable_table_excel_sheet_database_sql-512.png"
            />
            <p className=" h5 font-weight-light">All Assets</p>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={onShow}>
            <img
              className="icon"
              src="http://iconsetc.com/icons-watermarks/flat-circle-white-on-red/bfa/bfa_sign-out/bfa_sign-out_flat-circle-white-on-red_512x512.png"
            />
            <p className="h5 font-weight-light">Logout</p>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default SideBar;
