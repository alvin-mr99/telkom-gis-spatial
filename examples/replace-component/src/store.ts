// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import keplerGlReducer from '@kepler.gl/reducers';
import {taskMiddleware} from 'react-palm/tasks';
import appReducer, {AppState} from './app-reducer';

export interface RootState {
  keplerGl: any;
  app: AppState;
}

const rootReducer = combineReducers({
  keplerGl: keplerGlReducer,
  app: appReducer
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