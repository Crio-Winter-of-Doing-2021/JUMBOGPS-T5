import axios from "axios";
import * as Urls from "../constants/Urls";

export const signin = (tempUser) =>
  axios.post(Urls.SIGN_IN_URL, {
    email: tempUser.email,
    password: tempUser.password,
  });

export const signup = (tempUser) =>
  axios.post(Urls.SIGN_UP_URL, {
    name: tempUser.name,
    email: tempUser.email,
    password: tempUser.password,
  });

export const profile = (authToken) =>
  axios.get(Urls.PROFILE_URL, {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  });


