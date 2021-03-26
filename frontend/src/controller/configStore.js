import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import middleware from "./middleware";
import reducer from "./reducer";

const configStore = (services) =>
  configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      ...middleware.map((f) => f(services)),
    ],
  });

export default configStore;
