// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvcPjt67yIvMBVh7oa8y4-d2-mHQs8AsQ",
  authDomain: "todo-app-aca6b.firebaseapp.com",
  projectId: "todo-app-aca6b",
  storageBucket: "todo-app-aca6b.appspot.com",
  messagingSenderId: "508868980857",
  appId: "1:508868980857:web:e007b879a29d45dac624a8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
