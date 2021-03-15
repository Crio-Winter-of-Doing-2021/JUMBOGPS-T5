import React, { useState,useEffect } from "react";
import LoginPage from "./login";
import RegisterPage from "./register";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch,useSelector} from "react-redux";
import { getError, setError } from "../../../controller/reducer/ui";
import { loadLocalUser } from "../../../controller/reducer/user";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin(!isLogin);
  const notify = (message) => toast.dark(message, { autoClose: 3000 });
  const dispatch = useDispatch();
  const err = useSelector(getError);
  // console.log("err",err);
  if(err)  {
    notify(err);
    dispatch(setError(""));
  }
  useEffect(() => {
    dispatch(loadLocalUser());
  }, [])

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      {isLogin ? <LoginPage toggle={toggleLogin} dispatch={dispatch} notify={notify} /> :
      <RegisterPage toggle={toggleLogin} dispatch={dispatch} notify={notify} />}
    </div>
  );
};

export default AuthPage;
