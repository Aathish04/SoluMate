// ./services/firebase.js
import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDeAEW30lxc3BnayP3BB7hn1kHUWmZWuL8",
  authDomain: "solumate-8a51a.firebaseapp.com",
  projectId: "solumate-8a51a",
  storageBucket: "solumate-8a51a.appspot.com",
  messagingSenderId: "572276897281",
  appId: "1:572276897281:web:208357c5090e8beeba7200",
  measurementId: "G-XP1TPBXH7H"
};

// initialize Firebase App
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export {app};