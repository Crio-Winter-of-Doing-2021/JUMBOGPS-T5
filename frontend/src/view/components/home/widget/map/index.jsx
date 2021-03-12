import ReactMapGL, { Marker, Popup } from "react-map-gl";
import React, { useState, useEffect } from "react";
import "./styles.css";
import Info from "../info";
import { loadAssetCard } from "../../../../../controller/reducer/ui";


const markers = [
  "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
  "https://cdn3.iconfinder.com/data/icons/line-color-vol-1/100/63_-512.png",
  "https://w7.pngwing.com/pngs/899/659/png-transparent-salesman-telemarketing-miscellaneous-text-logo-thumbnail.png"
]

function Map({ assets, loc, onSelect, onSelectAsset }) {
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
      {assets.map((asset, id) => (
        <Marker
          latitude={parseFloat(asset.lat)}
          longitude={parseFloat(asset.lon)}
          key={id}
        >
          <img
            className="marker"
            onClick={() => handleClick(asset)}
            src={asset.type==="truck"?markers[1]:markers[2]}
            alt="marker"
          />
        </Marker>
      ))}
      {asset && (
        <Popup
          className="popup"
          latitude={parseFloat(asset.lat)}
          longitude={parseFloat(asset.lon)}
          closeButton={false}
          closeOnClick={false}
        >
          <Info asset={asset} onClose={() => setAsset(null)} onSelectAsset={onSelectAsset}/>
        </Popup>
      )}
    </ReactMapGL>
  );
}

export default Map;
