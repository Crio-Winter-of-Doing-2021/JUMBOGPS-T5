import { getToken } from "../controller/reducer/user";
import AuthPage from "./components/auth";
import Home from "./components/home";
import { useSelector } from "react-redux";
import NotificationArea from "./components/home/dashboard/notification";
import { SocketContext, socket } from "../utils/socket";

function App() {
  const token = useSelector(getToken);

  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        {token?<Home/>:<AuthPage/>}
      </div>
    </SocketContext.Provider>
  );
}

export default App;
