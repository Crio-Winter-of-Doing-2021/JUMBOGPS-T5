import React from "react";
import { Card } from "react-bootstrap";
import { AssetProperties } from "../../../../../data/constants/Asset";
import "./styles.css";

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
        <Card.ImgOverlay>
          <div className="overlay">
            <Card.Title className="display-3">{asset.name}</Card.Title>
            <Card.Text className="h1 font-weight-light">{asset.desc}</Card.Text>
            <br />
            {AssetProperties.filter(
              ({ value, label }) => asset.body[value]
            ).map(({ value, label }) => (
              <p key={value} className="h2 font-weight-light">
                <strong>{label}</strong>: {asset.body[value]}
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
