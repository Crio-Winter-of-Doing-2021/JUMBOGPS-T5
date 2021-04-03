import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './view/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import  configStore  from './controller/configStore';
import services from './data/index';
import { Provider } from "react-redux";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
  <Provider store={configStore(services)}>
    <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
