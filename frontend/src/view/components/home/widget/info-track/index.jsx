import React from "react";
import { Card, Button } from "react-bootstrap";
import "./styles.css";

const properties = ["modelNo", "companyName", "employeeId", "address"];
const propValues = ["Model Number", "Company Name", "Employee Id", "Address"];

function Info({ asset }) {
  if (!asset) return <div> </div>;
  return (
    <Card>
      <Card.Body>
        <Card.Img
          className="img"
          src={asset.image_url}
          style={{ height: "600px", width: "100%" }}
        />
          <Card.ImgOverlay > 

            <div className="overlay" >
        <Card.Title className="display-3">{asset.name}</Card.Title>
        <Card.Text className="h1 font-weight-light">{asset.desc}</Card.Text>
        <br/>
        {properties
          .map((prop, id) => ({ prop, id }))
          .filter(({ prop }) => asset.body[prop])
          .map(({ prop, id }) => (
            <p key={id} className="h2 font-weight-light">
              <strong>{propValues[id]}</strong>: {asset.body[prop]}
            </p>
          ))}
          </div>
            </Card.ImgOverlay>
      </Card.Body>
    </Card>
  );
}

export default Info;

Info.defaultProps = {
  onSelectAsset: () => {},
  onClose: () => {},
  asset: null,
};
