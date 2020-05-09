// import { expect } from 'chai';
const firebase = require("@firebase/testing");
const fs = require("fs");
const databaseName = "database-emulator-example";
const coverageUrl = `http://localhost:9000/.inspect/coverage?ns=${databaseName}`;
const rules = fs.readFileSync("database.rules.json", "utf8");

// Create a new app 
function authedApp(auth) { 
    return firebase.initializeTestApp({ databaseName, auth }).database();
  }

// Create a new admin
function adminApp() {
    return firebase.initializeAdminApp({ databaseName }).database();
  }

  before(async () => {
    // Set database rules before running these tests
    await firebase.loadDatabaseRules({
      databaseName,
      rules: rules
    });
  });
  
  // beforeEach(async () => {
  //   // Clear the database between tests
  //   await adminApp()
  //     .ref()
  //     .set(null);
  // });
  
  // after(async () => {
  //   // Close any open apps
  //   await Promise.all(firebase.apps().map(app => app.delete()));
  //   console.log(`View rule coverage information at ${coverageUrl}\n`);
  // });

const test = () => 'This is a test';

// describe('sign up', () => {

//     it('requires an email', () => {
//       expect(test()).to.equal('This is a test');
//     })
//   })