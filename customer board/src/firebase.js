// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyApeOCCOG_VY5YtaElIi_4gkqjUk-ybf8c",
  authDomain: "adminpage1998.firebaseapp.com",
  projectId: "adminpage1998",
  storageBucket: "adminpage1998.appspot.com",
  messagingSenderId: "710289077335",
  appId: "1:710289077335:web:dac57504fbea3daace9f12",
  measurementId: "G-4TZGJQHZ36"
};

const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app)