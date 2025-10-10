// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import store from './store';
import App from './app';
// import './styles/light-theme.css';

const Root: React.FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const container = document.getElementById('root');
if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container);
root.render(<Root />);
