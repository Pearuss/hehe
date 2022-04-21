import firebase from "firebase/app";
import "firebase/messaging";
import "firebase/database";
import firebaseConfig from "./firebaseConfig.json";

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

export const getToken = (setToken) => {
  return messaging
    .getToken({
      vapidKey:
        "BIp4HFnHMCgqmp6lh_t_tafct1GVWg8jQxfJhYDTQAQ6YiKLktRRkSyRuefcdu6688l3UKQrSB1Xqcr14X38IR0",
    })
    .then((currentToken) => {
      if (currentToken) {
        setToken(currentToken);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export function subscribeTokenToTopic(token, topic) {
  const FIREBASE_API_KEY = `AAAAvxCKuv8:APA91bH2sWhkZQTt73qpjuBacgv7wSl5BVbPpHgVmQccf4c84ySe1Mg86ekokJ7cCeFpb0LoZHgz-fgzysSyK57HFrWUa8tPiAH7ZakEu3VO_D2ypVivZQwJEFun9YIFmNUuvGp_aYXN`;

  fetch("https://iid.googleapis.com/iid/v1/" + token + "/rel/topics/" + topic, {
    method: "POST",
    headers: new Headers({
      Authorization: `key=${FIREBASE_API_KEY}`,
    }),
  })
    .then((response) => {
      if (response.status < 200 || response.status >= 400) {
        console.log(
          "Error subscribing to topic: " +
            response.status +
            " - " +
            response.text()
        );
      }
      console.log('Subscribed to "' + topic + '"');
      alert('Subscribed to "' + topic + '"');
    })
    .catch((error) => {
      console.error(error);
    });
}

export const onMessageListener = () => {
  return new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
};
export function messageListen(room, getAllMessageRoom) {
  firebase
    .database()
    .ref(`messages/room-${room}`)
    .limitToLast(1)
    .on("child_added", function (snapshot) {
      // console.log("snapshot", snapshot);
      getAllMessageRoom(room);
    });
}
export default firebase;
