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
    <Card className="card-box">
        <Card.Img
        className="img-pic"
          src={asset.image_url}
        />
      <Card.Body>
            <Card.Text className={`${"h1 font-weight-normal"}`}>{asset.name}</Card.Text>
            <br />
            <Card.Text className={`${deviceSize!=="sm"?"h3":"h4"} font-weight-light`}>{asset.desc}</Card.Text>
            <br />
            {AssetProperties.filter(
              ({ value, label }) => asset.body[value]
            ).map(({ value, label }) => (
              <p key={value} className={`${deviceSize!=="sm"?"h4":"h5"} font-weight-light`}>
                <strong>{label}</strong>: {asset.body[value]}
              </p>
            ))}
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
