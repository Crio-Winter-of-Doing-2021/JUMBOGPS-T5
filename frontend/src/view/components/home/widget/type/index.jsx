import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getAssetType } from "../../../../../controller/reducer/assets";
import logger from "../../../../../utils/logger";
import Toggle from "../toggle";

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
    <div className="d-flex justify-content-end align-items-center">
      <p className="p font-weight-normal align-self-end">Selected:</p>
      <Toggle
        value={truck}
        title={"truck"}
        onChange={(e) => {
          setTruck(e.currentTarget.checked);
          submitTask(!truck, salesman);
        }}
      />
      <Toggle
        value={salesman}
        title={"Salesman"}
        onChange={(e) => {
          setSalesman(e.currentTarget.checked);
          submitTask(truck, !salesman);
        }}
      />
    </div>
  );
};

export default TypeSelector;
