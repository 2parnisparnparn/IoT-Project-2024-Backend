const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyBCHbesW3iU3irBfJ9QjIEBme1PRlJWP_s",
    authDomain: "iot-project-2024-33f4c.firebaseapp.com",
    projectId: "iot-project-2024-33f4c",
    storageBucket: "iot-project-2024-33f4c.appspot.com",
    messagingSenderId: "78986530697",
    appId: "1:78986530697:web:9513d5cffd295023c99b58"
  };

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

module.exports = firestore;
