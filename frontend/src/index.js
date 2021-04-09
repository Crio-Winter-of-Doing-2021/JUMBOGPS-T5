import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './view/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import  configStore  from './controller/configStore';
import services from './data/index';
import { Provider } from "react-redux";
// import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// // Load worker code separately with worker-loader
// import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'; 
// // Wire up loaded worker to be used instead of the default
// mapboxgl.workerClass = MapboxWorker; 

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


