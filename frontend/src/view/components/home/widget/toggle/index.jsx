import React from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

const Toggle = ({ value, onChange, title }) => {
 
  return (
      <ButtonGroup toggle className="m-2">
        <ToggleButton
          type="checkbox"
          variant="outline-primary"
          checked={value}
          onChange={onChange}
        >
          {title}
        </ToggleButton>
      </ButtonGroup>
  );
};

export default Toggle;
