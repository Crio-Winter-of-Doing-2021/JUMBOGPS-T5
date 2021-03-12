import { profile, signin } from "../service/api/user";
import { useEffect } from "react";
import AuthPage from "./components/auth";
import Home from "./components/home";
import Dashboard from "./components/home/dashboard";
import axios from 'axios';

function App() {
 
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
