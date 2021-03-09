import ReactMapGL, { Marker, Popup } from "react-map-gl";
import React, { useState } from "react";
import "./styles.css";

const LAT = 37.7577;
const LON = -122.4376;

function Map() {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 10,
  });

  const [asset, setAsset] = useState(null);

  return (
    <ReactMapGL className="map"
      {...viewport}
      width="100%"
      height="100%"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/tazril/cklo46zze4zoz17pg8tp1oyms"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <Marker latitude={37.7577} longitude={-122.4376}>
        <img
          className="marker"
          onClick={() => setAsset({ lat: LAT, lon: LON })}
          src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
          alt="marker"
        />
      </Marker>
      {asset && (
        <Popup
          latitude={asset.lat}
          longitude={asset.lon}
          onClose={() => setAsset(null)}
        >
          <div>
            Hola, you clicked asset 31 : on its way
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
}

export default Map;
