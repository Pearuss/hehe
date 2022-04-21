/* eslint-disable no-undef */
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// // eslint-disable-next-line
// importScripts("https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js");
// // eslint-disable-next-line
// importScripts("https://www.gstatic.com/firebasejs/8.6.7/firebase-messaging.js");

importScripts("https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.9.0/firebase-analytics.js");
importScripts("https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyBr5euGpK03DRsek3kttBMsMaxTHL0Nzro",
  authDomain: "ts-notification-bcad9.firebaseapp.com",
  databaseURL:
    "https://ts-notification-bcad9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ts-notification-bcad9",
  storageBucket: "ts-notification-bcad9.appspot.com",
  messagingSenderId: "820616280831",
  appId: "1:820616280831:web:7eda7b141fbf128a656aca",
  measurementId: "G-4VGC85KTJ9",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

//-----------------------
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle, notificationOptions);
});
//-------------------------------------
