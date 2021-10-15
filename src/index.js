import React from 'react';
import ReactDOM from 'react-dom';
import './styles/common.scss';
import './styles/reset.scss';
import Routes from './Routes';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <CookiesProvider>
    <Routes />
  </CookiesProvider>,
  document.getElementById('root')
);
