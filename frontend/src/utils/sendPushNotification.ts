export const sendPushNotification = async (token:string, message:string) => {
  try {
    const response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `key=BMfoHTrp2NRbSLaUMdBABSU172AVD_JMuGlOuHpVGqp4SegURkMyqDgUm5FkXt-dXwVdhV8xScloaD8XlKpjwnk`,
      },
      body: JSON.stringify({
        to: token,
        notification: {
          title: "New Message",
          body: message,
        },
      }),
    });

    if (!response.ok) {
      console.error(`Error sending push notification: ${response.statusText} (status: ${response.status})`);
    }
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
};
