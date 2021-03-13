import ReactMapGL, { Marker, Popup } from "react-map-gl";
import React, { useState } from "react";
import "./styles.css";


const markers = [
  "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
  "https://cdn3.iconfinder.com/data/icons/line-color-vol-1/100/63_-512.png",
  "https://w7.pngwing.com/pngs/899/659/png-transparent-salesman-telemarketing-miscellaneous-text-logo-thumbnail.png"
]

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
            src={asset.type==="truck"?markers[1]:markers[2]}
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
