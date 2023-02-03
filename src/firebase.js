import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8BHYc2LYXAc4dlqjXFHnEwlvOWWGp0bk",
  authDomain: "chat-app-6b1ef.firebaseapp.com",
  projectId: "chat-app-6b1ef",
  storageBucket: "chat-app-6b1ef.appspot.com",
  messagingSenderId: "942300616888",
  appId: "1:942300616888:web:5f0113774f20132ff6bc4d"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();