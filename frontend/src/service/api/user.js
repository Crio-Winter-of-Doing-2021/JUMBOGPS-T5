import axios from "axios";
import * as Urls from "./urls";

export const signin = async (_email, _password) =>  axios.post(Urls.SIGN_IN_URL, {
    email: _email,
    password: _password,
  });
  
export const signup = async (_name, _email, _password) =>  axios.post(Urls.SIGN_UP_URL, {
    name: _name,
    email: _email,
    password: _password,
  });

export const profile = (authToken) =>
  axios.get(Urls.PROFILE_URL, {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  });
