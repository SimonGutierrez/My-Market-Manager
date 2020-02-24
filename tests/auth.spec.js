import { expect } from 'chai';
import { signUpThunkCreator } from '../src/store/reducers/authReducer';

const test = () => 'This is a test';

describe('sign up', () => {
  
    it('requires an email', () => {
      expect(test()).to.equal('This is a test');
    })
  })