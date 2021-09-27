import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { positions, Provider } from "react-alert";
import AlertMUITemplate from "react-alert-template-mui";
const options = {
  position: positions.MIDDLE
};

ReactDOM.render(
  <BrowserRouter>
    <Provider template={AlertMUITemplate} {...options}>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_CLIENTID}
      redirectUri={process.env.REACT_APP_REDIRECT_URL}
    >
      <App />
    </Auth0Provider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

