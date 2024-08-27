import axios from "axios";

 export const sendPushNotification = (token:string, title:string, body:string) => {
  const message = {
    to: token,
    notification: {
      title: title,
      body: body,
    },
  };

  axios
    .post('https://fcm.googleapis.com/fcm/send', message, {
      headers: {
        Authorization: `key=your-server-key`,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log('Notification sent successfully:', response.data);
    })
    .catch((error) => {
      console.error('Error sending notification:', error);
    });
};
