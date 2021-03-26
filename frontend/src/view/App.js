import {  getToken, } from "../controller/reducer/user";
import AuthPage from "./components/auth";
import Home from "./components/home";
import {useSelector} from "react-redux";

function App() {
  const token = useSelector(getToken);


  return (
    <div className="App">
      {token?<Home/>:<AuthPage/>}
    </div>
  );
}

export default App;
