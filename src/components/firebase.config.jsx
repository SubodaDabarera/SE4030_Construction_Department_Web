// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5vM14g8bxkVXGwsPh1I3DbbtUXrdtb6s",
  authDomain: "auth-construction-department.firebaseapp.com",
  projectId: "auth-construction-department",
  storageBucket: "auth-construction-department.appspot.com",
  messagingSenderId: "399647126103",
  appId: "1:399647126103:web:46f6a40a067a37dd846912"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;