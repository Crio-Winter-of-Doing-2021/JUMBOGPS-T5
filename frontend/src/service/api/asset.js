import axios from 'axios';
import * as Urls from "./urls";

export const getList = (authToken) =>
  axios.get(Urls.ASSET_LIST_URL, {
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