import { AnyAction, Reducer } from 'redux';

export interface State {
  [ action: string ]: any;
}

export interface Handlers {
  [ type: string ]: ( state: object, action: object ) => object;
}

export default ( initialState: State, handlers: Handlers ): Reducer<any> => {
  return ( state: State = initialState, action: AnyAction ) => {
    const handler = handlers[ action.type ];
    return handler ? handler( state, action ) : state;
  };
};
