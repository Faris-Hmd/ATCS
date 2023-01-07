/** @format */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCMLFL2VwOrTSgRu1YQpvWkgjdqvWQmZZU",
  authDomain: "atsc-demo.firebaseapp.com",
  projectId: "atsc-demo",
  storageBucket: "atsc-demo.appspot.com",
  messagingSenderId: "325056493148",
  appId: "1:325056493148:web:5a7332449621cf0a15d899",
  measurementId: "G-V2R5KS1YLH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
