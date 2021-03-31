import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getDeviceSize } from "../../../../../controller/reducer/ui";
import { AssetProperties } from "../../../../../data/constants/Asset";
import "./styles.css";

function Info({ asset }) {
  const deviceSize = useSelector(getDeviceSize);
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
            <Card.Text className={`${deviceSize!=="sm"?"display-3":"h1  font-weight-normal"}`}>{asset.name}</Card.Text>
            <br />
            <Card.Text className={`${deviceSize!=="sm"?"h1":"h4"} font-weight-light`}>{asset.desc}</Card.Text>
            <br />
            {AssetProperties.filter(
              ({ value, label }) => asset.body[value]
            ).map(({ value, label }) => (
              <p key={value} className={`${deviceSize!=="sm"?"h2":"h5"} font-weight-light`}>
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
