import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import authReducer from './reducers/authReducer';
import searchReducer from './reducers/searchReducer';
import stockReducer from './reducers/stockReducer';
import transactionsReducer from './reducers/transactionsReducer';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  search: searchReducer,
  stock: stockReducer,
  transactions: transactionsReducer,
});

export default rootReducer;
