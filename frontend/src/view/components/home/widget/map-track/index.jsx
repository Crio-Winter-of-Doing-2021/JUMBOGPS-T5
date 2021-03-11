import ReactMapGL, { Marker, Popup } from "react-map-gl";
import React, { useState, useEffect } from "react";
import "./styles.css";

const LAT = 24;
const LON = 78;

function Map() {

  const [viewport, setViewport] = useState({
    latitude: LAT,
    longitude: LON,
    zoom: 3,
  });

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
      <Marker latitude={37.7577} longitude={-122.4376}>
        <img
          className="marker"
          src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
          alt="marker"
        />
      </Marker>
    </ReactMapGL>
  );
}

export default Map;
