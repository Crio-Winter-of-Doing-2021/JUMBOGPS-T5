import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { getAsset } from "../../../../../controller/reducer/ui";
import { useSelector } from "react-redux";
import "./styles.css";

function Info({asset}) {
  // const asset = useSelector(getAsset);

  return (
    <Card className="text-center info">
    <Card.Header>Description</Card.Header>
    <Card.Body> 
      <Card.Title>{asset ? asset.name : "Asset Name"}</Card.Title>
      <Card.Text>
        {asset ? asset.desc : "Asset Desc"}
      </Card.Text>
      <Button variant="primary">Check History</Button>
    </Card.Body>
    <Card.Footer className="text-muted">{asset ? asset.timestamp : "Asset Time"}</Card.Footer>
  </Card>
  );
}

export default Info;
