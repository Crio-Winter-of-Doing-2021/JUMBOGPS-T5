import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./styles.css";

function Info() {
  return (
    <Card className="text-center info">
    <Card.Header>Description</Card.Header>
    <Card.Body>
      <Card.Title>Asset Name Here</Card.Title>
      <Card.Text>
        Asset Descritption: With supporting text below as a natural lead-in to additional content.
      </Card.Text>
      <Button variant="primary">Check History</Button>
    </Card.Body>
    <Card.Footer className="text-muted">Last Updated 15 mins ago</Card.Footer>
  </Card>
  );
}

export default Info;
