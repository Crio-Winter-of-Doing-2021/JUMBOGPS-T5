import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "./styles.css";

function Header() {
  return (
    <Navbar className="header justify-content-between" bg="dark" variant="dark">
    <Navbar.Brand href="#home">Trasset</Navbar.Brand>
    <Form inline >
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
  );
}

export default Header;
