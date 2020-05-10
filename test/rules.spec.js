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
  
  beforeEach(async () => {
    // Clear the database between tests
    await adminApp()
      .ref()
      .set(null);
  });
  
  after(async () => {
    // Close any open apps
    await Promise.all(firebase.apps().map(app => app.delete()));
    console.log(`View rule coverage information at ${coverageUrl}\n`);
  });

  describe("profile read rules", () => {
    it("should only allow current user to read their profile", async () => {
      const alice = authedApp({ uid: "alice" });
      const bob = authedApp({ uid: "bob" });
      const noone = authedApp(null);
  
      await adminApp()
        .ref("users/alice")
        .set({
          name: "Alice",
          email: "alice2cool@gmail.com"
        });

      await firebase.assertSucceeds(alice.ref("users/alice").once("value"));
      await firebase.assertFails(bob.ref("users/alice").once("value"));
      await firebase.assertFails(noone.ref("users/alice").once("value"));
    });
  
    it("should only allow users to modify their own profiles", async () => {
      const alice = authedApp({ uid: "alice" });
      const bob = authedApp({ uid: "bob" });
      const noone = authedApp(null);
  
      await firebase.assertSucceeds(
        alice.ref("users/alice").update({
          favorite_color: "blue"
        })
      );
      await firebase.assertFails(
        bob.ref("users/alice").update({
          favorite_color: "red"
        })
      );
      await firebase.assertFails(
        noone.ref("users/alice").update({
          favorite_color: "orange"
        })
      );
    });
  });