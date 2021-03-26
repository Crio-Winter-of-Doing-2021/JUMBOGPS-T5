import React from "react";
import "./styles.css";

/**
 * Loader Component
 * @description 
 * Used for showing spinner animation while API calls to the user. It is styled using CSS
 * @component
 * @example
 * return (
 *   <Loader />
 * )
 */
function Loader() {
  return (
    <div className="loader-view">
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default Loader;
