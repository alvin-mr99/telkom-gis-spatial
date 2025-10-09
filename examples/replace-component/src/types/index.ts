import {AppState} from '../app-reducer';

export interface RootState {
  keplerGl: {
    [id: string]: any;
  };
  app: AppState;
}

export interface JakartaPOI {
  id: number;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  rating: number;
  description: string;
}

export * from '../app-reducer';