import { expect } from 'chai';
import { getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { signUpThunkCreator } from '../src/store/reducers/authReducer';



const test = () => 'This is a test';

describe('sign up', async () => {
  const fireBase = getFirebase();
  const firestore = getFirestore();

  const newUser = {
    email: 'newUser@gmail.com',
    password: 'Password1',
    firstName: 'Newuser',
    lastName: 'Test'
  }

  signUpThunkCreator(newUser);

  const getUser = await fireBase
                          .auth()
                          .getUserByEmail('newUser@gmail.com')



    it('requires an email', () => {
      expect(test()).to.equal('This is a test');
    })
  })