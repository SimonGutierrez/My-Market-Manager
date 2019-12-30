import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import { getFirestore, reduxFirestore } from 'redux-firestore';
import { createLogger } from 'redux-logger';

import firebase from '../config/fbConfig';
import rootReducer from './rootReducer';

const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware.withExtraArgument({ getFirebase, getFirestore }),
    createLogger({ collapsed: true })
  ),
  reduxFirestore(firebase),
  reactReduxFirebase(firebase, {
    useFirestoreForProfile: true,
    userProfile: 'users',
    attachAuthIsReady: true,
  })
);

const store = createStore(rootReducer, middleware);

export default store;
