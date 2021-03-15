import axios from 'axios';
import * as Urls from "../constants/Urls";

export const getList = (authToken,type) =>
  axios.get(Urls.assetListUrl(type), {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  });

  export const track = (authToken,assetId) =>
  axios.get(Urls.trackUrl(assetId), {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  });