// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import keplerGlReducer from '@kepler.gl/reducers';
import {taskMiddleware} from 'react-palm/tasks';
import {THEME} from '@kepler.gl/constants';

export interface RootState {
  keplerGl: any;
}

const rootReducer = combineReducers({
  keplerGl: keplerGlReducer.initialState({
    uiState: {
      currentModal: null,
      readOnly: false,
      activeSidePanel: 'layer', // Hide side panel
      theme: THEME.light,
      mapControls: {
        visibleLayers: {
          show: false
        },
        mapLegend: {
          show: true,     // Ubah dari false ke true
          active: true    // Ubah dari false ke true
        },
        toggle3d: {
          show: false
        },
        splitMap: {
          show: false
        }
      }
    },
    mapStyle: {
      styleType: 'voyager', // Default to voyager map style
      topLayerGroups: {},
      visibleLayerGroups: {
        label: true,
        road: true,
        border: false,
        building: true,
        water: true,
        land: true,
        '3d building': true
      },
      threeDBuildingColor: [9.665468314072013, 17.18305478057247, 31.1442867897876],
      mapStyles: {}
    }
  })
});

const composeEnhancers = 
  (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(taskMiddleware))
);

export type AppDispatch = typeof store.dispatch;
export default store;