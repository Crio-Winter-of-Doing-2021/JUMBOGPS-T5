import React from "react";
import { DrawLineStringMode } from "react-map-gl-draw";

const DrawRouteTools = ({ setMode, onDelete, submit }) => {
  return (
    <div className="mapboxgl-ctrl-top-right">
      <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
        <button
          className=" mapbox-gl-draw_polygon"
          title="Line tool (p)"
          onClick={() => setMode(new DrawLineStringMode())}
        >
          📉
        </button>
        <button
          className=" mapbox-gl-draw_trash"
          title="Delete"
          onClick={onDelete}
        >
          🗑️
        </button>
        <button title="Update" onClick={submit}>
          💾
        </button>
      </div>
    </div>
  );
};

export default DrawRouteTools;
