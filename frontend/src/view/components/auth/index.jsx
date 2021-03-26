import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getError, setError } from "../../../controller/reducer/ui";
import { loadLocalUser } from "../../../controller/reducer/user";
import LoginPage from "./login";
import RegisterPage from "./register";

const notify = (message) => toast.dark(message, { autoClose: 3000 });
/**
 * Authentication Component 
 * @description Shows Login and Register Screens for user to login/register
 * @component
 * @example
 * return (
 *   <AuthPage />
 * )
 */
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin(!isLogin);
  const dispatch = useDispatch();
  const err = useSelector(getError);

  if(err)  {
    notify(err);
    dispatch(setError(""));
  }
  useEffect(() => {
    dispatch(loadLocalUser());
  }, [dispatch])

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      {isLogin ? <LoginPage toggle={toggleLogin} dispatch={dispatch} notify={notify} /> :
      <RegisterPage toggle={toggleLogin} dispatch={dispatch} notify={notify} />}
    </div>
  );
};

export default AuthPage;
