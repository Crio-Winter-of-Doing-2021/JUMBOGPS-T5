import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './view/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'; 
import  configStore  from './controller/configStore';
import services from './data/api/index';
import { Provider } from "react-redux";

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
