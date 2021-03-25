import ReactMapGL, { Marker, Popup, Source, Layer } from "react-map-gl";
import React, { useState, useCallback, useRef, useEffect } from "react";
import "./styles.css";
import Markers from "../../../../../data/constants/Markers";
import { heatmapLayer } from "./common/map-style";
import { Editor, EditingMode } from "react-map-gl-draw";
import { getFeatureStyle, getEditHandleStyle } from "./common/draw-styles";
import DrawRouteTools from "./common/DrawRouteTools";
import DrawFenceTools from "./common/DrawFenceTools";
import { useSelector } from "react-redux";
import { getTrackTabId } from "../../../../../controller/reducer/ui";
import { getGeoJSON } from "../../../../../controller/reducer/asset";
import {
  getGeoFence,
  getGeoRoute,
} from "../../../../../controller/reducer/geo";

function Map({
  asset,
  locArray,
  setGeoFence,
  setGeoRoute,
  submitGeoFence,
  submitGeoRoute,
}) {
  const [viewport, setViewport] = useState({
    latitude: 24,
    longitude: 78,
    zoom: 3,
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

  useEffect(() => {
    if (tabId === "3" && fenceEditorRef.current && geoFence) {
      fenceEditorRef.current.addFeatures(geoFence);
      console.log(fenceEditorRef.current.getFeatures());
    }
    if (tabId === "4" && routeEditorRef.current && geoRoute) {
      routeEditorRef.current.addFeatures(geoRoute);
      console.log(routeEditorRef.current.getFeatures());
    }
  }, [tabId]);

  const onDelete = useCallback(
    (ref) => () => {
      if (ref === fenceEditorRef) setGeoFence(null);
      else setGeoRoute(null);
      ref.current.deleteFeatures(0);
    },
    []
  );

  const onUpdate = useCallback(
    (ref) => ({ editType, data }) => {
      if (editType === "addFeature") {
        if (ref === fenceEditorRef) {
          setGeoFence(data[0]);
          setModeFence(new EditingMode());
        }
        else {
          setGeoRoute(data[0]);
          setModeRoute(new EditingMode());
        }
        
      }
    },
    []
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
      mapStyle="mapbox://styles/tazril/cklo46zze4zoz17pg8tp1oyms"
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
    </ReactMapGL>
  );
}

export default Map;
