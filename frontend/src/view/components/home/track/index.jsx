import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import Map from "../widget/map-track";
import { loadAsset, getAsset} from '../../../../controller/reducer/asset';
import { getLoading } from '../../../../controller/reducer/ui';

const Track = () => {
  const dispatch = useDispatch();
  const asset = useSelector(getAsset);

  const loading = useSelector(getLoading);
  
  useEffect(() => {
      dispatch(loadAsset());
  }, [dispatch]);

  console.log('asset ',asset,'loading',loading);

  return (
    <div className="track">
      <div className="map-view" > <Map /></div>
    </div>
  );
};

export default Track;
