// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqC6sBhrqzJx-PcCUE4JqDWDsMH-ctv08",
  authDomain: "fir-chat-c44d7.firebaseapp.com",
  projectId: "fir-chat-c44d7",
  storageBucket: "fir-chat-c44d7.appspot.com",
  messagingSenderId: "84114098991",
  appId: "1:84114098991:web:73e09385d448e98a07efda",
};

var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
// Initialize Firebase
const app = initializeApp(firebaseConfig);
