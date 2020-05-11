import { expect } from 'chai';
import * as firebase from '@firebase/testing';
import fs from 'fs';
import regeneratorRuntime from "regenerator-runtime";
const rules = fs.readFileSync("database.rules.json", "utf8");

const databaseName = "database-emulator-example";
const test = () => 'This is a test';

function getAuthedApp() {
  const app  = firebase.initializeTestApp({
    projectId: "My_Test_App",
    auth: { uid: "alice" }
  })
  const firestore = app.firestore();

  return firestore;
}

function getAdminApp() {
  const adminApp  = firebase.initializeAdminApp({
    projectId: "My_Test_App"
  })
  const firestore = adminApp.firestore();

  return firestore;
}

  beforeEach(async () => {
    // Clear the database between tests
  await firebase.clearFirestoreData({
    projectId: "my-test-project"
   });
  });

  after(async () => {
    // Close any open apps
    await Promise.all(firebase.apps().map(app => app.delete()));
  });

describe('sign up', () => {
    it('does not allow a user sign in if they do not have an account', async () => {
      const db = getAuthedApp();
      const users = db.collection('users');
      const test = users.doc('John');
      
      await firebase.assertFails(test.get());
    });
  })