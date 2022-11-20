// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGtmV7jC02zVDSGWQbnBjblziuw8D90No",
  authDomain: "dax-schedule.firebaseapp.com",
  projectId: "dax-schedule",
  storageBucket: "dax-schedule.appspot.com",
  messagingSenderId: "1013538810378",
  appId: "1:1013538810378:web:d1957d34d87ce08a2a8df3",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
