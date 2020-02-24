// Initial State
const initialState = {
  authError: null,
};

// Action
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
const SIGN_OUT_ERROR = 'SIGN_OUT_ERROR';

// Action Creators
const signUpSuccessActionCreator = newUser => ({
  type: SIGN_UP_SUCCESS,
  newUser,
});

const signUpErrorActionCreator = error => ({
  type: SIGN_UP_ERROR,
  error,
});

const signInSuccessActionCreator = userCredentials => ({
  type: SIGN_IN_SUCCESS,
  userCredentials,
});

const signInErrorActionCreator = error => ({
  type: SIGN_IN_ERROR,
  error,
});

const signOutSuccessActionCreator = () => ({
  type: SIGN_OUT_SUCCESS,
});

const signOutErrorActionCreator = () => ({
  type: SIGN_OUT_ERROR,
});

// Thunk Creators
export const signUpThunkCreator = newUser => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      // console.log('newUser: ', newUser);

      const firebase = getFirebase();
      const firestore = getFirestore();

      const newUserData = await firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password);

      const newUserObj = {
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        balance: 5000,
      };

      // console.log('newUserObj: ', newUserObj);

      await firestore
        .collection('users')
        .doc(newUserData.user.uid)
        .set(newUserObj);

      dispatch(signUpSuccessActionCreator(newUser));
    } catch (error) {
      console.error(error);
      dispatch(signUpErrorActionCreator(error));
    }
  };
};

export const signInThunkCreator = userCredentials => {
  return async (dispatch, getState, { getFirebase }) => {
    try {
      const firebase = getFirebase();

      await firebase
        .auth()
        .signInWithEmailAndPassword(
          userCredentials.email,
          userCredentials.password
        );

      dispatch(signInSuccessActionCreator(userCredentials));
    } catch (error) {
      console.error(error);
      dispatch(signInErrorActionCreator(error));
    }
  };
};

export const signOutThunkCreator = () => {
  return async (dispatch, getState, { getFirebase }) => {
    try {
      const firebase = getFirebase();

      await firebase.auth().signOut();

      dispatch(signOutSuccessActionCreator());

      // console.log('authReducer localStorage pre-clear: ', localStorage);

      localStorage.clear();

      // console.log('authReducer localStorage post-clear: ', localStorage);
    } catch (error) {
      console.error(error);
      dispatch(signOutErrorActionCreator());
    }
  };
};

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      console.log('Signed up successfully');
      return { ...state, authError: null };

    case SIGN_UP_ERROR:
      console.log('Sign up error!', action.error.message);
      return { ...state, authError: action.error.message };

    case SIGN_IN_SUCCESS:
      console.log('Signed in successfully');
      return { ...state, authError: null };

    case SIGN_IN_ERROR:
      console.log('Sign in error!', action.error.message);
      return { ...state, authError: action.error.message };

    case SIGN_OUT_SUCCESS:
      console.log('Signed out successfully');
      return state;

    case SIGN_OUT_ERROR:
      console.log('Sign out error!');
      return state;

    default:
      return state;
  }
};

export default authReducer;
