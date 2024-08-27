import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { Dispatch, SetStateAction } from 'react';


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
 const messaging = getMessaging(app);

export { app, messaging };

export const generateToken = async (setTokenFound:Dispatch<SetStateAction<boolean>>) => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: "BMfoHTrp2NRbSLaUMdBABSU172AVD_JMuGlOuHpVGqp4SegURkMyqDgUm5FkXt-dXwVdhV8xScloaD8XlKpjwnk" });
    if (currentToken) {
      console.log("Current Token: ", currentToken);
      setTokenFound(true);
    } else {
      console.log("No registration token available.");
      setTokenFound(false);
    }
  } catch (error) {
    console.log("An error occurred while retrieving token.", error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
