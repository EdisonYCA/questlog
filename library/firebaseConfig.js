import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDC4jwgP_86DUF8OcR60J2kLa_MoC7tgpA",
  authDomain: "questlog-12284.firebaseapp.com",
  projectId: "questlog-12284",
  storageBucket: "questlog-12284.firebasestorage.app",
  messagingSenderId: "563782173858",
  appId: "1:563782173858:web:6a64c2dc4e3cc7a89b43fb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);