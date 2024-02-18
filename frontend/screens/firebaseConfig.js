// ./services/firebase.js
import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyAU9pZG46Uz4O-kJsl8g4XnNcxzO0ImzIM",
    authDomain: "customerservice-c5e4d.firebaseapp.com",
    projectId: "customerservice-c5e4d",
    storageBucket: "customerservice-c5e4d.appspot.com",
    messagingSenderId: "896692861596",
    appId: "1:896692861596:web:650172a143e4121f8a4b59",
    measurementId: "G-YJMBR83YWM"
 };
  

// initialize Firebase App
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export {app};