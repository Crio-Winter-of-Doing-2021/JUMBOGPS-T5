import axios from "axios";
import * as Urls from "../constants/Urls";

export const signin =  (tempUser) => // axios.get('https://jsonplaceholder.typicode.com/todos/1')
axios.post(Urls.SIGN_IN_URL, {
    email: tempUser.email,
    password: tempUser.password,
  });
  // fetch(Urls.SIGN_IN_URL, {
  //   method: 'post',
  //   body: JSON.stringify(tempUser)
  // })
  
export const signup =  (tempUser) =>  axios.post(Urls.SIGN_UP_URL, {
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
