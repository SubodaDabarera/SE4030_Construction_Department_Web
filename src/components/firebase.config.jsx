// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAgczhcGOY9hh_skJ18mJ8Sl79YiXEEK4g",
//     authDomain: "csseconstruction.firebaseapp.com",
//     projectId: "csseconstruction",
//     storageBucket: "csseconstruction.appspot.com",
//     messagingSenderId: "423293153513",
//     appId: "1:423293153513:web:974d89d3fc1e0cc4f4c078"
// };
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

// Firebase storage reference
const storage = getStorage(app);
export default storage;
