declare module 'redux-actions' {
  export function createAction<TPayload, TMeta = any>(
    type: string,
    payloadCreator?: (arg: any) => TPayload,
    metaCreator?: (...args: any[]) => TMeta
  ): any;

  export function handleActions<TState, TPayload = any>(
    reducerMap: any,
    initialState: TState
  ): (state: TState, action: any) => TState;

  export interface Action<TPayload> {
    type: string;
    payload: TPayload;
    error?: boolean;
    meta?: any;
  }
}