import React from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getTrackTabId } from "../../../../../controller/reducer/ui";

function Tabs({ onSelect }) {
  const tabId = useSelector(getTrackTabId);
  return (
    <Nav variant="pills" className="flex-column flex-md-row" activeKey={tabId} onSelect={onSelect} >
      <Nav.Item > 
        <Nav.Link eventKey="1">Normal</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="2">Heatmap</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="3">Geo Fence</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="4">Geo Route</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Tabs;
