import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
}

async function getFCMToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken);
  try {
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('hehee');
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const notificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('Have new notification!', remoteMessage);
  });
};

export {requestUserPermission, notificationListener};
