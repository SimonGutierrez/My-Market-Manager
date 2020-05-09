import { expect } from 'chai';

const test = () => 'This is a test';

describe('sign up', () => {

    it('requires an email', () => {
      expect(test()).to.equal('This is a test');
    })
  })