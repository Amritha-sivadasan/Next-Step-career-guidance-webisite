import {admin} from '../config/firebaseConfig'

class NotificationService {
  static async sendNotification(deviceToken: any, title: any, body: any ,role:any) {
    const message = {
      notification: { title, body },
      token: deviceToken,
      data: {
        role: role 
      },
    };
    try {
      const response = await admin.messaging().send(message);
   
      return response;
    } catch (error) {
      console.log('error firebase admin error',error)
      throw error;
    }
  }
}

export default NotificationService
