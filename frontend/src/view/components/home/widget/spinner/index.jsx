import React from "react";
import { Spinner } from "react-bootstrap";

/**
 * Soinner Component
 * @description Displays a spinner for in page loading operations
 * @component
 * @example
 * return (
 *   <Spinner >
 * )
 */
const SpinnerComponent = () => {

  return (
    <div className="d-flex justify-content-center pb-4">
      <Spinner animation="grow" size="sm" />&nbsp;&nbsp;
      <Spinner animation="grow" size="sm" />&nbsp;&nbsp;
      <Spinner animation="grow" size="sm" />
    </div>
  );
};

export default SpinnerComponent;
