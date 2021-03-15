import React from "react";
import { Card, Button, } from "react-bootstrap";
import "./styles.css";

const properties = ["modelNo", "companyName", "employeeId", "address"];
const propValues = ["Model Number", "Company Name", "Employee Id", "Address"];

function Info({ asset, onClose, onSelectAsset, minimal }) {
  if (!asset) return <div> </div>;
  return (
    <div className="d-flex align-items-center">
      {!minimal && <Card.Img
        src={asset.image_url}
        style={{ height: "300px", width: "300px " }}
      />}
      <div className="info" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{asset.name}</Card.Title>
          <Card.Text>{asset.desc}</Card.Text>
          {properties
            .map((prop, id) => ({ prop, id }))
            .filter(({ prop }) => asset.body[prop])
            .map(({ prop, id }) => (
              <p key={id}>
                <strong>{propValues[id]}</strong>: {asset.body[prop]}
              </p>
            ))}
          {!minimal && <Button variant="primary" onClick={() => onSelectAsset(asset._id)}>
            Track
          </Button>}
         {!minimal &&  <Button
            variant="outline-secondary"
            className="ml-2"
            onClick={onClose}
          >
            Close
          </Button>}
        </Card.Body>
      </div>
    </div>
  );
}

export default Info;

Info.defaultProps = {
  minimal : false,
  onSelectAsset : ()=>{},
  onClose : ()=>{},
  asset : null
}
