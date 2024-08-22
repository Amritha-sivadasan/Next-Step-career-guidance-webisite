// import admin from "firebase-admin";
// import path from "path";

// const serviceAccountPath = path.join(
//   __dirname,
//   "../../service-account-file.json"
// );
// const serviceAccount = require(serviceAccountPath);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const messaging = admin.messaging();

// export async function sendPushNotification(token: string, message: string) {
//   try {
//     const payload: admin.messaging.Message = {
//       notification: {
//         title: 'New Message',
//         body: message,
//       },
//       token: token,
//     };

//     const response = await messaging.send(payload);
//     console.log('Successfully sent message:', response);
//   } catch (error) {
//     console.error('Error sending message:', error);
//   }
// }
