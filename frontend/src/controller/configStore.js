import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import middleware from './middleware';

const configStore = services => configureStore({
  reducer,
  middleware: [...getDefaultMiddleware(),...middleware.map(f => f(services))],
});

export default configStore;