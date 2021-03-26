import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { setAssetInfo } from "../../../../../controller/reducer/asset";
import Markers from "../../../../../data/constants/Markers";
import Info from "../../widget/info";
import "./styles.css";

/**
 * Map Component for Dashboard
 * @description
 * For all  assets, it shows map locating current locations
 * @param {object[]} props.assets   contains Assets' Information
 * @param {function} props.dispatch   Dispatch redux action
 * @component
 * @example
 * return (
 *  <Map assets={assets} dispatch={dispatch}/>
 * )
 */
function Map({ assets, dispatch }) {
  const [viewport, setViewport] = useState({
    latitude: assets && assets.length > 1 ? assets[0].lat : 24,
    longitude: assets && assets.length > 1 ? assets[0].lon : 76,
    zoom: assets && assets.length > 1 ? 3 : 1,
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
