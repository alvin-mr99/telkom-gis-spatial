// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

import {createAction} from 'redux-actions';

export interface SetMapConfigPayload {
  mapState: any;
}

export const setMapConfig = createAction<SetMapConfigPayload, any>(
  'SET_MAP_CONFIG', 
  (payload: any) => payload
);