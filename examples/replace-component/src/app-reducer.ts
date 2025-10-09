// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import {createAction, handleActions, Action} from 'redux-actions';

// TYPES
export interface AppState {
  appName: string;
  loaded: boolean;
  mapConfig?: any;
}

// CONSTANTS
export const INIT = 'INIT';
export const SET_MAP_CONFIG = 'SET_MAP_CONFIG';

// ACTIONS
export const appInit = createAction(INIT);
export const setMapConfig = createAction<any, any>(SET_MAP_CONFIG);

// INITIAL_STATE
const initialState: AppState = {
  appName: 'example',
  loaded: false
};

// REDUCER
const appReducer = handleActions<AppState, any>(
  {
    [INIT]: (state: AppState): AppState => ({
      ...state,
      loaded: true
    }),
    [SET_MAP_CONFIG]: (state: AppState, action: Action<any>): AppState => ({
      ...state,
      mapConfig: action.payload
    })
  },
  initialState
);

export default appReducer;