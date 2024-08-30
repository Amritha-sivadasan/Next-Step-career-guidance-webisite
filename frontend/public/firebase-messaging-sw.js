// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
// eslint-disable-next-line no-undef
firebase.initializeApp({
  apiKey: "AIzaSyDAq5n_ePWt-HAilBRyuGfzfKiOJYlyjjM",
  authDomain: "next-step-cc5ea.firebaseapp.com",
  projectId: 'next-step-cc5ea',
  storageBucket: 'next-step-cc5ea.appspot.com',
  messagingSenderId: '892788069862',
  appId: '1:892788069862:web:61cfea6288e001145af227',
  measurementId: 'G-2N3LQ99VTV',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  
});
