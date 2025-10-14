// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { taskMiddleware } from 'react-palm/tasks';
import keplerGlReducer from '@kepler.gl/reducers';

// Import Tailwind CSS
import './styles/tailwind.css';

import App from './app';

const initialState = {};

const reducers = combineReducers({
  // Initialize keplerGl with modal hidden and voyager map style
  keplerGl: keplerGlReducer.initialState({
    uiState: {
      currentModal: null, // Hide "Add Data To Map" modal on startup
      readOnly: false,
      activeSidePanel: 'layer'
    },
    mapStyle: {
      styleType: 'voyager', // Set default to voyager (light theme)
      topLayerGroups: {},
      visibleLayerGroups: {
        label: true,
        road: true,
        border: false,
        building: true,
        water: true,
        land: true,
        '3d building': false
      }
    }
  })
});

const middlewares = [taskMiddleware];
const enhancers = [applyMiddleware(...middlewares)];

// add redux devtools
const composeEnhancers = 
  (typeof window !== 'undefined' && 
   (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(...enhancers)
);

const root = ReactDOM.createRoot(
  document.getElementById('app') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
