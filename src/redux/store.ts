import { compose, createStore } from 'redux';

import Reducers, { TaskState } from 'app/redux/reducers';

const windowIfDefined = typeof window === 'undefined' ? null : window as any;

let composition = compose;
if ( process.env.NODE_ENV !== 'production' ) {
  composition = windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export default createStore( Reducers, composition() );
