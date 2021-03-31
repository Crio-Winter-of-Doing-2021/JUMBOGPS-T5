import React from "react";
import {
  DrawCircleByDiameterMode,
  DrawPolygonMode,
  DrawRectangleMode
} from "react-map-gl-draw";

const DrawFenceTools = ({ setMode, onDelete, submit }) => {
  return (
    <div className="mapboxgl-ctrl-top-right">
      <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
        <button
          className=" mapbox-gl-draw_polygon"
          title="Polygon tool (p)"
          onClick={() => setMode(new DrawPolygonMode())} //DrawPolygonMode DrawLineStringMode
        >
          ✏️
        </button>
        <button
          className=" mapbox-gl-draw_polygon"
          title="Rectangle tool (p)"
          onClick={() => setMode(new DrawRectangleMode())} //DrawPolygonMode DrawLineStringMode
        >
          🟦
        </button>
        <button
          className=" mapbox-gl-draw_polygon"
          title="Circle tool (p)"
          onClick={() => setMode(new DrawCircleByDiameterMode())} //DrawPolygonMode DrawLineStringMode
        >
          🔵
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

export default DrawFenceTools;
