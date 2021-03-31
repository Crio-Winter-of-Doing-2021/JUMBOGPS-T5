import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getAssetType } from "../../../../../controller/reducer/assets";
import logger from "../../../../../utils/logger";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import "./styles.css";
import { getDeviceSize } from "../../../../../controller/reducer/ui";

/**
 * Type Selector Component
 * @description
 * Select Types of Asset to be shown
 * @param {function} props.onSelect   selects asset type
 * @component
 * @example
 * return (
 *   <TypeSelector onSelect={onSelect} />
 * )
 */
const TypeSelector = ({ onSelect }) => {
  const assetType = useSelector(getAssetType);
  const deviceSize = useSelector(getDeviceSize);

  const [truck, setTruck] = useState(assetType === "" || assetType === "truck");
  const [salesman, setSalesman] = useState(
    assetType === "" || assetType === "salesman"
  );

  const submitTask = (truck, salesman) => {
    let assetType = "none";
    if (truck && salesman) assetType = "";
    else if (truck) assetType = "truck";
    else if (salesman) assetType = "salesman";
    logger(truck, salesman, assetType);
    onSelect(assetType);
  };

  return (
    <div className="type-div d-flex justify-content-end align-items-center">
      <p className="p font-weight-normal align-self-end">Selected:</p>

      <ButtonGroup toggle className="m-2">
        <ToggleButton
          type="checkbox"
          variant="outline-dark"
          size={deviceSize}
          checked={truck}
          onChange={(e) => {
            setTruck(e.currentTarget.checked);
            submitTask(!truck, salesman);
          }}
        >
          Truck
        </ToggleButton>
      </ButtonGroup>
      <ButtonGroup toggle className="m-2">
        <ToggleButton
          type="checkbox"
          variant="outline-dark"
          size={deviceSize}
          checked={salesman}
          onChange={(e) => {
            setSalesman(e.currentTarget.checked);
            submitTask(truck, !salesman);
          }}
        >
          Salesman
        </ToggleButton>
      </ButtonGroup>
    </div>
  );
};

export default TypeSelector;
