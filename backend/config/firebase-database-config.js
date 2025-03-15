const admin = require("firebase-admin");
const serviceAccount = require("../firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://terrascan-4ce1b-default-rtdb.firebaseio.com/",
});

const firebaseDB = admin.database();
module.exports = firebaseDB;
