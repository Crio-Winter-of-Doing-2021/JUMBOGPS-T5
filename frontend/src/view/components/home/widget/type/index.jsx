import React, { useState, useEffect } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import {useSelector} from "react-redux";
import {
  getAssetType,
  loadAssets,
  setAssetType,
} from "../../../../../controller/reducer/asset";

const TypeSelector = ({ dispatch }) => {
  const assetType = useSelector(getAssetType);

  const [truck, setTruck] = useState((assetType===""||assetType==="truck"));
  const [salesman, setSalesman] = useState((assetType===""||assetType==="salesman"));

  const submitTask = (truck,salesman) => {
    let assetType = "none";
    if (truck && salesman) assetType = "";
    else if (truck) assetType = "truck";
    else if (salesman) assetType = "salesman";
    console.log(truck, salesman, assetType);
    dispatch(setAssetType(assetType));
    dispatch(loadAssets());
  };


  return (
    <div className="d-flex justify-content-end align-items-center">
      <p className="p font-weight-normal align-self-end">Selected:</p>
      <ButtonGroup toggle className="m-2">
        <ToggleButton
          type="checkbox"
          variant="outline-primary"
          checked={truck}
          onChange={(e) => {
            setTruck(e.currentTarget.checked);
            submitTask(!truck,salesman);
          }}
        >
          Truck
        </ToggleButton>
      </ButtonGroup>
      <ButtonGroup toggle className="mr-2 mb-2 mt-2">
        <ToggleButton
          type="checkbox"
          variant="outline-primary"
          checked={salesman}
          onChange={(e) => {
            setSalesman(e.currentTarget.checked);
            submitTask(truck,!salesman);
          }}
        >
          Salesman
        </ToggleButton>
      </ButtonGroup>
    </div>
  );
};

export default TypeSelector;
