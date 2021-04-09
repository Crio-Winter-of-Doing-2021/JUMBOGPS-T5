import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Figure } from "react-bootstrap";
import ReactMapGL, {
  FlyToInterpolator,
  FullscreenControl,
  GeolocateControl,
  Layer,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
  Source,
} from "react-map-gl";
import { EditingMode, Editor } from "react-map-gl-draw";
import { useSelector } from "react-redux";
import { getGeoJSON } from "../../../../../controller/reducer/asset";
import {
  getGeoFence,
  getGeoRoute,
} from "../../../../../controller/reducer/geo";
import {
  getDeviceSize,
  getTrackTabId,
} from "../../../../../controller/reducer/ui";
import Markers from "../../../../../data/constants/Markers";
import logger from "../../../../../utils/logger";
import { getEditHandleStyle, getFeatureStyle } from "./common/draw-styles";
import DrawFenceTools from "./common/DrawFenceTools";
import DrawRouteTools from "./common/DrawRouteTools";
import { heatmapLayer } from "./common/map-style";
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
  top: 150,
  left: 0,
  padding: "10px",
};

/**
 * Map Component
 * @description
 * For a particular asset:
 * 1. shows map locating all previous locations
 * 2. allows user to choose date range for locations
 * 3. allows user to geofence and/or georoute the asset
 * @param {Object} props.asset   Asset Information
 * @param {object[]} props.locArray   contains Location (lat,lon,timestamp)
 * @param {function} props.setGeoFence   Update Geo Fence Locally
 * @param {function} props.setGeoRoute  Update Geo Route Locally
 * @param {function} props.submitGeoFence   Update Geo Fence in Db
 * @param {function} props.submitGeoRoute   Update Geo Route in Db
 * @component
 * @example
 * return (
 *  <Map asset={asset}
 *    locArray={locArray}
 *    setGeoFence={setGeoFence}
 *    setGeoRoute={setGeoRoute}
 *    submitGeoFence={submitGeoFence}
 *    submitGeoRoute={submitGeoRoute}
 *   />
 * )
 */
function Map({
  asset,
  locArray,
  setGeoFence,
  setGeoRoute,
  submitGeoFence,
  submitGeoRoute,
}) {
  const [viewport, setViewport] = useState({
    latitude: locArray.length > 1 ? locArray[0].lat : 24,
    longitude: locArray.length > 1 ? locArray[0].lon : 75,
    zoom: locArray.length > 1 ? 3 : 1,
  });

  const [modeFence, setModeFence] = useState(null);
  const [modeRoute, setModeRoute] = useState(null);
  const [point, setPoint] = useState(null);

  const handleClick = (point) => setPoint(point);
  const fenceEditorRef = useRef(null);
  const routeEditorRef = useRef(null);

  const tabId = useSelector(getTrackTabId);
  const geoJSON = useSelector(getGeoJSON);
  const geoFence = useSelector(getGeoFence);
  const geoRoute = useSelector(getGeoRoute);
  const deviceSize = useSelector(getDeviceSize);

  const onSelectLocation = useCallback((longitude, latitude) => {
    logger(longitude, latitude);
    setViewport({
      longitude,
      latitude,
      zoom: 8,
      transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
      transitionDuration: "auto",
    });
  }, []);

  useEffect(() => {
    if (tabId === "3" && fenceEditorRef.current && geoFence) {
      fenceEditorRef.current.addFeatures(geoFence);
      logger(geoFence);
      logger(fenceEditorRef.current.getFeatures());
    }
    if (tabId === "4" && routeEditorRef.current && geoRoute) {
      routeEditorRef.current.addFeatures(geoRoute);
      logger(routeEditorRef.current.getFeatures());
    }
  }, [tabId,geoFence,geoRoute]);

  const onDelete = useCallback(
    (ref) => () => {
      if (ref === fenceEditorRef) setGeoFence(null);
      else setGeoRoute(null);
      ref.current.deleteFeatures(0);
    },
    [setGeoFence,setGeoRoute]
  );

  const onUpdate = useCallback(
    (ref) => ({ editType, data }) => {
      if (editType === "addFeature") {
        if (ref === fenceEditorRef) {
          setGeoFence(data[0]);
          setModeFence(new EditingMode());
        } else {
          logger(data[0]);
          setGeoRoute(data[0]);
          setModeRoute(new EditingMode());
        }
      }
    },
    [setGeoFence,setGeoRoute]
  );

  const setModeValue = (ref) => (mode) => {
    ref.current.deleteFeatures(0);
    if (ref === fenceEditorRef) setModeFence(mode);
    else setModeRoute(mode);
  };

  return (
    <ReactMapGL
      className="map"
      {...viewport}
      width="100%"
      height="100%"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle={"mapbox://styles/mapbox/streets-v11"}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {tabId !== "2" &&
        asset &&
        locArray.map((loc, id) => (
          <Marker latitude={loc.lat} longitude={loc.lon} key={id}>
            <img
              className="marker "
              onClick={() => (tabId === "1" ? handleClick(loc) : null)}
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
      {tabId === "1" && point && (
        <Popup
          className="popup"
          latitude={point.lat}
          longitude={point.lon}
          closeButton={true}
          onClose={() => setPoint(null)}
        >
          <p className="font-weight-normal">
            Latitude : {point.lat}
            <br />
            Longitude : {point.lat} <br /> Reached:{" "}
            {new Date(point.timestamp).toUTCString()}
          </p>
        </Popup>
      )}
      {tabId === "2" && (
        <Source type="geojson" data={geoJSON}>
          <Layer {...heatmapLayer} />
        </Source>
      )}
      {tabId === "3" && (
        <Editor
          ref={fenceEditorRef}
          style={{ width: "100%", height: "100%" }}
          clickRadius={12}
          mode={modeFence}
          onUpdate={onUpdate(fenceEditorRef)}
          editHandleShape={"circle"}
          featureStyle={getFeatureStyle}
          editHandleStyle={getEditHandleStyle}
        />
      )}
      {tabId === "3" && (
        <DrawFenceTools
          onDelete={onDelete(fenceEditorRef)}
          setMode={setModeValue(fenceEditorRef)}
          submit={submitGeoFence}
        />
      )}
      {tabId === "4" && (
        <Editor
          ref={routeEditorRef}
          style={{ width: "100%", height: "100%" }}
          clickRadius={12}
          mode={modeRoute}
          onUpdate={onUpdate(routeEditorRef)}
          editHandleShape={"circle"}
          featureStyle={getFeatureStyle}
          editHandleStyle={getEditHandleStyle}
        />
      )}
      {tabId === "4" && (
        <DrawRouteTools
          onDelete={onDelete(routeEditorRef)}
          setMode={setModeValue(routeEditorRef)}
          submit={submitGeoRoute}
        />
      )}
      <div className="scrollmenu">
        {locArray &&
          locArray.map((loc, id) => (
            <Figure
              key={id}
              className="item"
              onClick={() => onSelectLocation(loc.lon, loc.lat)}
            >
              <Figure.Caption>
                <p className="p mt-2 mb-2 ml-4 mr-4 font-weight-bold">
                  {moment(loc.timestamp).format("DD/MM/YY, h:mm a")}
                </p>
              </Figure.Caption>
            </Figure>
          ))}
      </div>
      <GeolocateControl
        style={geolocateStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />
      <FullscreenControl style={fullscreenControlStyle} />
      <NavigationControl style={navStyle} showCompass={false} />
      {deviceSize !== "sm" && <ScaleControl style={scaleControlStyle} />}
    </ReactMapGL>
  );
}

export default Map;
