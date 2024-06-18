import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxnG95WFkdxGg4RXHXhT2UZJlj1Q56Y2k",
  authDomain: "expense-tracker-721b0.firebaseapp.com",
  projectId: "expense-tracker-721b0",
  storageBucket: "expense-tracker-721b0.appspot.com",
  messagingSenderId: "332676063090",
  appId: "1:332676063090:web:7f0048463488e35f6947eb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
