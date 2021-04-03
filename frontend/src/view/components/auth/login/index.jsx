import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getRemember, performSignin, setRemember } from "../../../../controller/reducer/user";
import "./styles.css";

const SignIn = ({ toggle, notify, dispatch }) => {
  const [email, setEmail] = useState("perul365@gmail.com");
  const [password, setPassword] = useState("12345");
  const remember = useSelector(getRemember);
  
  const login = (e)=>{
    e.preventDefault();
    dispatch(performSignin({email,password}))
  }

  return (
    <div className="outer-box-layout d-flex text-left flex-column justify-content-center align-items-center ">
      <h1 className="headline">TRASSET</h1>
      <Form onSubmit={login} className="inner-box-layout p-4" >
        <h1>Login</h1>
        <hr className="hr-light" />
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
          <Form.Check type="checkbox" label="Remember Me" 
          checked={remember}
          onChange={() => dispatch(setRemember(!remember))}
          />
        </Form.Group>
        <Button variant="light" type="submit" block>
          Sign In
        </Button>
        <Button variant="outline-light" onClick={toggle} block>
          Create an Account
        </Button>
      </Form>
    </div>
  );
};

SignIn.defaultProps = {};

export default SignIn;
