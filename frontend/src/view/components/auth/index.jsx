import React, { useState } from "react";
import LoginPage from "./login";
import RegisterPage from "./register";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin(!isLogin);
  const notify = (message) => toast.dark(message, { autoClose: 3000 });
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      {isLogin ? <LoginPage toggle={toggleLogin} notify={notify} /> :
      <RegisterPage toggle={toggleLogin} notify={notify} />}
    </div>
  );
};

export default AuthPage;
