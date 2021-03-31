import React, { useCallback, useState } from "react";
import { Button, Card } from "react-bootstrap";
import ReactMapGL, {
  FlyToInterpolator,
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import { useSelector } from "react-redux";
import { getAssets } from "../../../../../controller/reducer/assets";
import Markers from "../../../../../data/constants/Markers";
import Info from "../../widget/info";
import "./styles.css";

const geolocateStyle = {
  top: 0,
  left: 0,
  padding: "10px",
};

const fullscreenControlStyle = {
  top: 36,
  left: 0,
  padding: "10px",
};

const navStyle = {
  top: 72,
  left: 0,
  padding: "10px",
};

const scaleControlStyle = {
  top : 180,
  left: 0,
  padding: "10px",
};

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
function Map() {
  const assets = useSelector(getAssets);
  const [viewport, setViewport] = useState({
    latitude: assets && assets.length > 1 ? assets[0].lat : 24,
    longitude: assets && assets.length > 1 ? assets[0].lon : 76,
    zoom: assets && assets.length > 1 ? 3 : 1,
    bearing: 0,
    pitch: 0,
  });

  const [asset, setAsset] = useState(null);

  const handleClick = (asset) => {
    // onSelect(asset);
    setAsset(asset);
  };

  const onSelectCity = useCallback((longitude, latitude) => {
    console.log(longitude, latitude);
    setViewport({
      longitude,
      latitude,
      zoom: 8,
      transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
      transitionDuration: "auto",
    });
  }, []);

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
      dragRotate={false}
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
            // onSelectAsset={(id) =>
            //   dispatch(setAssetInfo({ id: id, name: asset.name }))
            // }
          />
        </Popup>
      )}
      <div className="scrollmenu">
        {assets &&
          assets.map((asset, id) => (
            <Card key={id} className="item">
              <Card.Body>
                <Card.Text>{asset.name}</Card.Text>
                <Button
                  variant="outline-primary"
                  onClick={() => onSelectCity(asset.lon, asset.lat)}
                >
                  LOCATE
                </Button>
              </Card.Body>
            </Card>
          ))}
      </div>
      <GeolocateControl
        style={geolocateStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />
      <FullscreenControl style={fullscreenControlStyle} />
      <NavigationControl style={navStyle} />
      <ScaleControl style={scaleControlStyle} />
    </ReactMapGL>
  );
}

export default Map;
