import ReactMapGL, { Marker, Popup } from "react-map-gl";
import React, { useState } from "react";
import "./styles.css";
import Info from "../info";
import { setAssetInfo } from "../../../../../controller/reducer/asset";
import Markers from "../../../../../data/constants/Markers";

function Map({ assets, dispatch }) {
  const [viewport, setViewport] = useState({
    latitude: 24,
    longitude: 78,
    zoom: 3,
  });

  const [asset, setAsset] = useState(null);

  const handleClick = (asset) => {
    // onSelect(asset);
    setAsset(asset);
  };

  if (!assets) return <></>;

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
      {assets.map((asset, id) => (
        <Marker latitude={asset.lat} longitude={asset.lon} key={id}>
          <img
            className="marker"
            onClick={() => handleClick(asset)}
            src={
              asset.type === "truck"
                ? Markers.truck
                : asset.type === "salesman"
                ? Markers.salesman
                : Markers.simple
            }
            alt="marker"
          />
        </Marker>
      ))}
      {asset && (
        <Popup
          className="popup"
          latitude={asset.lat}
          longitude={asset.lon}
          closeButton={false}
          closeOnClick={false}
        >
          <Info
            asset={asset}
            onClose={() => setAsset(null)}
            onSelectAsset={(id) =>
              dispatch(setAssetInfo({ id: id, name: asset.name }))
            }
          />
        </Popup>
      )}
    </ReactMapGL>
  );
}

export default Map;
