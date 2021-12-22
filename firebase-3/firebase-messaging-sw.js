importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyAcZ-p5lFMCT-vfpgWvdQN4HGYSMAKgvxI",
    authDomain: "unfv-mentoria-d9726.firebaseapp.com",
    projectId: "unfv-mentoria-d9726",
    storageBucket: "unfv-mentoria-d9726.appspot.com",
    messagingSenderId: "238854800770",
    appId: "1:238854800770:web:bf0a14a876aebb948cbb9b",
    measurementId: "G-FM15JL1F2G"
};  
firebase.initializeApp(firebaseConfig);  

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    console.log(payload);
    const notification = JSON.parse(payload);
    const notificationOption = {
        body: notification.body,
        icon: notification.icon
    };
    return self.registration.showNotification(payload.notification.title, notificationOption);
})