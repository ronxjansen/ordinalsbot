import admin  from "firebase-admin"

const serviceAccount  = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT ?? "");
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

let firebaseApp: admin.app.App;

if (admin.apps.length === 0) {
  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  firebaseApp = admin.app();
}

export { firebaseApp };