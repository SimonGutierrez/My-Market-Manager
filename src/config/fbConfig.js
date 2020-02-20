import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import fireBaseConfig from '../secrets';

const config = {
  apiKey: fireBaseConfig.apiKey,
  authDomain: fireBaseConfig.authDomain,
  databaseURL: fireBaseConfig.databaseURL,
  projectId: fireBaseConfig.projectId,
  storageBucket: fireBaseConfig.storageBucket,
  messagingSenderId: fireBaseConfig.messagingSenderId,
  appId: fireBaseConfig.appId,
  measurementId: fireBaseConfig.measurementId,
};

firebase.initializeApp(config);

export default firebase;
