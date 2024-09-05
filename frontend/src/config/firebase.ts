import { initializeApp } from "firebase/app";
import { getMessaging, getToken, Messaging, onMessage } from "firebase/messaging";

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

interface NotificationPayload {
  notification: {
    title: string;
    body: string;
  
  };
  data: {
    role:string
  };
}

const vapidKey =
  "BHh7MINkknxbCGDzFTm6zWQSPicOx1CTX0XMVXq3I1-M10MsK4xwu_Av0-afQtEEJd03Hrnb5iZMX99EeyTMt0Y";

  export const onMessageListener = (messaging: Messaging, callback: (payload: NotificationPayload) => void) => {
    return onMessage(messaging, (payload) => {
      if (payload.notification) {
        const notificationPayload: NotificationPayload = {
          notification: {
            title: payload.notification.title || '',
            body: payload.notification.body || '',
          },
          data: {
            role: payload?.data?.role ||''
          },
        };
        callback(notificationPayload);
      }
    });
  };

export const requestFCMToken = async () => {
  return Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      return getToken(messaging, { vapidKey });
    } else {
      throw new Error("Notification is not granded");
    }
  }).catch((err)=>{
    console.log('error occur during  fcm token',err)
    throw err
  });
};
