import  admin from "firebase-admin"
var serviceAccount = require("../utils/firebaseAdminSDK.json");
import { getApp, getApps, initializeApp } from "firebase-admin/app";

if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "next-step-cc5ea",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};



const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export { admin,app };

