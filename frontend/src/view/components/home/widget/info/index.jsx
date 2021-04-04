import React from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { HashLink } from 'react-router-hash-link';
import { getDeviceSize } from "../../../../../controller/reducer/ui";
import { AssetProperties } from "../../../../../data/constants/Asset";
import "./styles.css";


/**
 * Info Component
 * @description
 * Card containing all information about the asset. It is used by
 * 1. Dashboard with minimal = false
 * 2. AssetList with minimal = true
 * @param {Object} props.asset   Asset information
 * @param {function} props.onClose   Close Popup
 * @param {function} props.onSelectAsset   Track selected asset
 * @param {function} props.minimal   Toggle UIs
 * @component
 * @example
 * return (
 *   <Info asset={asset} onClose={onClose} onSelectAsset={onSelectAsset} minimal={true}/>
 * )
 */
function Info({ asset, onClose, minimal }) {
  const deviceSize = useSelector(getDeviceSize);
  if (!asset) return <div> </div>;
  return (
    <div className="d-flex info align-items-center">
      {!minimal && deviceSize!=="sm" && (
        <Card.Img
          src={asset.image_url}
          style={{ height: "300px", width: "300px " }}
        />
      )}
      <div className="info" style={{ width: "18rem" }}>
        <Card.Body className={deviceSize!=="sm"?" ":"p-2"}>
          <Card.Title>{asset.name}</Card.Title>
          <Card.Text>{asset.desc}</Card.Text>
          {AssetProperties.filter(({ value, label }) => asset.body[value]).map(
            ({ value, label }) => (
              <p key={value}>
                <strong>{label}</strong>: {asset.body[value]}
              </p>
            )
          )}
          {!minimal && (
            <Button
              as={HashLink}
              size={deviceSize}
              smooth
              variant="primary"
              to={`/track/${asset._id}#map`}
            >
              Track
            </Button>
          )}
          {!minimal && (
            <Button
            size={deviceSize}
              variant="outline-secondary"
              className="ml-2"
              onClick={onClose}
            >
              Close
            </Button>
          )}
        </Card.Body>
      </div>
    </div>
  );
}

export default Info;
