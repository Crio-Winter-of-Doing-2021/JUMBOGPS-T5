import ReactMapGL, { Marker, Popup } from "react-map-gl";
import React, { useState } from "react";
import "./styles.css";
import Markers from "../../../../../data/constants/Markers";




function Map({ asset, locArray}) {
  const [viewport, setViewport] = useState({
    latitude: 24,
    longitude: 78,
    zoom: 3,
  });

  const [point, setPoint] = useState(null);

  const handleClick = (point) => {
    setPoint(point);
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
      {asset && locArray.map((loc, id) => (
        <Marker
          latitude={(loc.lat)}
          longitude={(loc.lon)}
          key={id}
        >
          <img
            className="marker"
            onClick={() => handleClick(loc)}
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
      {point && (
        <Popup
          className="popup"
          latitude={(point.lat)}
          longitude={(point.lon)}
          closeButton={true}
          onClose={()=>setPoint(null)}
        >
          <p className="font-weight-normal">Latitude : {point.lat}<br/>Longitude : {point.lat} <br/> Reached: {new Date(point.timestamp).toUTCString()}</p>
        </Popup>
      )}
    </ReactMapGL>
  );
}

export default Map;
