import ReactMapGL, { Marker, Popup } from "react-map-gl";
import React, { useState, useEffect } from "react";
import "./styles.css";
import { loadAssetCard } from "../../../../../controller/reducer/ui";

const LAT = 37.7577;
const LON = -122.4376;

function Map({ assets, loc, onSelect }) {
  const [viewport, setViewport] = useState({
    latitude: 24,
    longitude: 78,
    zoom: 3,
  });

  const [asset, setAsset] = useState(null);

  const handleClick = (asset) => {
    onSelect(asset);
    setAsset(asset);
  };

  return (
    <ReactMapGL
      className="map"
      {...viewport}
      width="100%"
      height="100%"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/tazril/cklo46zze4zoz17pg8tp1oyms"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {/* <Marker latitude={37.7577} longitude={-122.4376}>
        <img
          className="marker"
          onClick={() => setAsset({ lat: LAT, lon: LON })}
          src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
          alt="marker"
        />
      </Marker> */}
      {assets.map((asset, id) => (
        <Marker
          latitude={parseFloat(asset.lat)}
          longitude={parseFloat(asset.lon)}
          key={id}
        >
          <img
            className="marker"
            onClick={() => handleClick(asset)}
            src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
            alt="marker"
          />
        </Marker>
      ))}
      {asset && (
        <Popup
          latitude={parseFloat(asset.lat)}
          longitude={parseFloat(asset.lon)}
          onClose={() => setAsset(null)}
        >
          <div>
            {asset.name} desc: {asset.desc}
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
}

export default Map;
