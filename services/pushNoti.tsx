

// import messaging from '@react-native-firebase/messaging'; 
// import { Alert, Platform } from 'react-native';

// export async function requestUserPermission(): Promise<boolean> {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('FCM Authorization status:', authStatus);
//   }

//   return enabled;
// }

// export async function getFcmToken(): Promise<string | null> {
//   try {
//     const token = await messaging().getToken();
//     if (token) {
//       console.log('FCM Token:', token);
//       return token;
//     }
//   } catch (error) {
//     console.error('Error getting FCM token:', error);
//   }
//   return null;
// }

// export function setupFCMListeners() {
 
//   messaging().onMessage(async (remoteMessage: { notification: { title: any; body: any; }; }) => {
//     console.log('Foreground FCM message:', remoteMessage);
//     Alert.alert(remoteMessage.notification?.title ?? '', remoteMessage.notification?.body ?? '');
//   });

//   messaging().onNotificationOpenedApp((remoteMessage: any) => {
//     console.log('Notification caused app to open from background state:', remoteMessage);
//   });

//   messaging()
//     .getInitialNotification()
//     .then((remoteMessage: any) => {
//       if (remoteMessage) {
//         console.log('Notification caused app to open from quit state:', remoteMessage);
//       }
//     });
// }

// import messaging,{
//   setBackgroundMessageHandler} from '@react-native-firebase/messaging';
// import { Alert } from 'react-native';
// import { useNotificationStore } from '../../hooks/useNotificationStore';

// export async function requestUserPermission(): Promise<boolean> {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   return enabled;
// }

// export async function getFcmToken(): Promise<string | null> {
//   try {
//     const token = await messaging().getToken();
//     console.log('FCM Token:', token);
//     return token;
//   } catch (error) {
//     console.error('Error getting FCM token:', error);
//     return null;
//   }
// }

// export function setupFCMListeners() {
  
//   messaging().onMessage(async remoteMessage => {
//     console.log('Foreground FCM message:', remoteMessage);
//     useNotificationStore.getState().addNotification({
//       title: remoteMessage.notification?.title ?? 'No Title',
//       body: remoteMessage.notification?.body ?? 'No Body',
//       data: remoteMessage.data,
//     });

//     Alert.alert(remoteMessage.notification?.title ?? '', remoteMessage.notification?.body ?? '');
//   });

//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log('App opened from background notification:', remoteMessage);
//   });

//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log('App opened from quit state notification:', remoteMessage);
//       }
//     });
// }

// import messaging, {
//   FirebaseMessagingTypes,
// } from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Alert } from 'react-native';
// import { useNotificationStore } from '../../hooks/useNotificationStore';

// const STORAGE_KEY = 'backgroundNotifications';

// export async function requestUserPermission(): Promise<boolean> {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
//   return enabled;
// }

// export async function getFcmToken(): Promise<string | null> {
//   try {
//     const token = await messaging().getToken();
//     console.log('FCM Token:', token);
//     return token;
//   } catch (error) {
//     console.error('Error getting FCM token:', error);
//     return null;
//   }
// }

// export async function loadBackgroundNotificationsToStore() {
//   try {
//     const stored = await AsyncStorage.getItem(STORAGE_KEY);
//     if (stored) {
//       const messages = JSON.parse(stored);
//       const { addNotification } = useNotificationStore.getState();
//       messages.forEach((msg: any) => addNotification(msg));
//       await AsyncStorage.removeItem(STORAGE_KEY);
//     }
//   } catch (error) {
//     console.error('Failed to load background notifications:', error);
//   }
// }

// export function setupFCMListeners() {
//   const { addNotification } = useNotificationStore.getState();

//   messaging().onMessage(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
//     console.log('📲 Foreground message:', remoteMessage);
//     const { title = 'No Title', body = 'No Body' } = remoteMessage.notification ?? {};
//     addNotification({ title, body, data: remoteMessage.data });
//     Alert.alert(title, body);
//   });

//   messaging().onNotificationOpenedApp((remoteMessage) => {
//     if (remoteMessage) {
//       console.log('📥 App opened from background notification:', remoteMessage);
//       const { title = 'No Title', body = 'No Body' } = remoteMessage.notification ?? {};
//       addNotification({ title, body, data: remoteMessage.data });
//     }
//   });

//   messaging()
//     .getInitialNotification()
//     .then((remoteMessage) => {
//       if (remoteMessage) {
//         console.log('❄️ App opened from quit state notification:', remoteMessage);
//         const { title = 'No Title', body = 'No Body' } = remoteMessage.notification ?? {};
//         addNotification({ title, body, data: remoteMessage.data });
//       }
//     });
// }
// src/services/fcmService.ts
// import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNotificationStore } from '../../hooks/useNotificationStore';

// // Background message handler setup


// messaging().setBackgroundMessageHandler(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
//   console.log('⏰ Background FCM Message:', remoteMessage);

//   const notification = {
//     title: remoteMessage.notification?.title ?? 'No Title',
//     body: remoteMessage.notification?.body ?? 'No Body',
//     data: remoteMessage.data,
//   };

//   try {
//     const existing = await AsyncStorage.getItem('backgroundNotifications');
//     const parsed = existing ? JSON.parse(existing) : [];
//     parsed.unshift(notification);
//     await AsyncStorage.setItem('backgroundNotifications', JSON.stringify(parsed));
//   } catch (error) {
//     console.error('Error saving background notification:', error);
//   }
// });

// export async function requestUserPermission(): Promise<boolean> {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
//   return enabled;
// }

// export async function getFcmToken(): Promise<string | null> {
//   try {
//     const token = await messaging().getToken();
//     console.log('FCM Token:', token);
//     return token;
//   } catch (error) {
//     console.error('Error getting FCM token:', error);
//     return null;
//   }
// }

// export async function loadBackgroundNotificationsToStore() {
//   try {
//     const stored = await AsyncStorage.getItem('backgroundNotifications');
//     if (stored) {
//       const messages = JSON.parse(stored);
//       const { addNotification } = useNotificationStore.getState();
//       messages.forEach((msg: any) => addNotification(msg));
//       await AsyncStorage.removeItem('backgroundNotifications');
//     }
//   } catch (error) {
//     console.error('Failed to load background notifications:', error);
//   }
// }

// export function setupFCMListeners() {
//   const { addNotification } = useNotificationStore.getState();

//   messaging().onMessage(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
//     console.log('📲 Foreground message:', remoteMessage);
//     const { title = 'No Title', body = 'No Body' } = remoteMessage.notification ?? {};
//     addNotification({ title, body, data: remoteMessage.data });
//   });

//   messaging().onNotificationOpenedApp((remoteMessage) => {
//     if (remoteMessage) {
//       console.log('📥 App opened from background notification:', remoteMessage);
//       const { title = 'No Title', body = 'No Body' } = remoteMessage.notification ?? {};
//       addNotification({ title, body, data: remoteMessage.data });
//     }
//   });

//   messaging()
//     .getInitialNotification()
//     .then((remoteMessage) => {
//       if (remoteMessage) {
//         console.log('❄️ App opened from quit state notification:', remoteMessage);
//         const { title = 'No Title', body = 'No Body' } = remoteMessage.notification ?? {};
//         addNotification({ title, body, data: remoteMessage.data });
//       }
//     });
// }
import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { Alert } from "react-native";

export function usePushNoti() {
  useEffect(() => {
    requestUserPermission();
    getFCMToken();
    backgroundHandler();

    // set up listeners
    const unsubscribeForeground = listenToforegroundMessage();
    const unsubscribeBackgroundTap = handleBackgroundNotificationTap();
    initialNotification();

    // 🧹 cleanup old listeners on unmount
    return () => {
      if (unsubscribeForeground) unsubscribeForeground();
      if (unsubscribeBackgroundTap) unsubscribeBackgroundTap();
    };
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  const getFCMToken = async () => {
    const token = await messaging().getToken();
    if (token) {
      console.log("Firebase token:", token);
    }
  };

  const backgroundHandler = () => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Background message:", remoteMessage.notification);
    });
  };

  const listenToforegroundMessage = () => {
    try {
      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        Alert.alert(
          remoteMessage.notification?.title || "Notification",
          remoteMessage.notification?.body || "You received a message"
        );
        console.log("Foreground message:", remoteMessage.notification);
      });
      return unsubscribe; // ✅ return this instead of calling it
    } catch (error) {
      console.log("listenToforegroundMessage error:", error);
    }
  };

  const handleBackgroundNotificationTap = () => {
    const unsubscribe = messaging().onNotificationOpenedApp(
      (remoteMessage) => {
        Alert.alert(
          remoteMessage.notification?.title || "Notification",
          remoteMessage.notification?.body || "Opened from background"
        );
        console.log(
          "App opened from background:",
          remoteMessage.notification
        );
      }
    );
    return unsubscribe; // ✅ return so we can clean up later
  };

  const initialNotification = () => {
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          Alert.alert(
            remoteMessage.notification?.title || "Notification",
            remoteMessage.notification?.body || "Opened from quit state"
          );
        }
        console.log("Initial notification:", remoteMessage?.notification);
      })
      .catch((err) => {
        console.log("getInitialNotification error:", err);
      });
  };
}


// import messaging from "@react-native-firebase/messaging";
// import { useEffect } from "react";
// import { Alert } from "react-native";

// export function  usePushNoti(){
//  useEffect(() => {
//     const requestPermission = async () => {
//       const authStatus = await messaging().requestPermission();
//       const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//       if (enabled) {
//         console.log("Authorization status:", authStatus);

//         const fcmToken = await messaging().getToken();
//         console.log("FCM Token:", fcmToken);
//         // Optionally send token to your server
//       }
//     };

//     requestPermission();

//     // Listen for foreground messages
//     const unsubscribeOnMessage = messaging().onMessage(
//       async (remoteMessage) => {
//         Alert.alert(
//           remoteMessage.notification?.title || "Notification",
//           remoteMessage.notification?.body || "You received a message"
//         );
//       }
//     );

//     // Background state
//     const unsubscribeBackground = messaging().onNotificationOpenedApp(
//       (remoteMessage) => {
//         console.log("Opened from background:", remoteMessage.notification);
//         Alert.alert(
//           remoteMessage.notification?.title || "Notification",
//           remoteMessage.notification?.body || "Opened from background"
//         );
//       }
//     );

//     // App killed state
//     messaging()
//       .getInitialNotification()
//       .then((remoteMessage) => {
//         if (remoteMessage) {
//           console.log("Opened from quit state:", remoteMessage.notification);
//           Alert.alert(
//             remoteMessage.notification?.title || "Notification",
//             remoteMessage.notification?.body || "Opened from quit state"
//           );
//         }
//       });

//     return () => {
//       unsubscribeOnMessage();
//       unsubscribeBackground();
//     };
//   }, []);


// }