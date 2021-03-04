import React, { useState } from "react";
import "./styles.css";
import { Form, Button } from "react-bootstrap";

const SignIn = ({ toggle, notify }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = (e) => {
    e.preventDefault();
    console.log(name, email, password, confirmPassword);
    notify("register successful");
  };

  return (
    <div className="auth d-flex text-left justify-content-center align-items-center ">
      <Form className="auth-box  p-4" onSubmit={register}>
        <h1>Register</h1>
        <hr className="hr-light" />
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Retype Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" block>
          Sign Up
        </Button>
        <Button variant="outline-light" onClick={toggle} block>
          Already have an Account
        </Button>
      </Form>
    </div>
  );
};

SignIn.defaultProps = {};

export default SignIn;
