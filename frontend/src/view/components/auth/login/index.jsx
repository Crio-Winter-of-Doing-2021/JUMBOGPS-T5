import React, {useState} from "react";
import "./styles.css";
import { Form, Button } from "react-bootstrap";

const SignIn = ({ toggle, notify }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  
  const login = (e)=>{
    e.preventDefault();
    // console.log(email,password,remember);
    notify('login successful');
  }

  return (
    <div className="auth d-flex text-left flex-column justify-content-center align-items-center ">
      <h1 className="headline">Trasset</h1>
      <Form onSubmit={login} className="auth-box  p-4" >
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
          value={remember}
          onChange={() => setRemember(!remember)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" block>
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
