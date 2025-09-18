// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC6jJVfQDbn6b8v9d23ED0n5Xu5cYb0zJI",
  authDomain: "cabahug-tasktrove.firebaseapp.com",
  projectId: "cabahug-tasktrove",
  storageBucket: "cabahug-tasktrove.appspot.com",
  messagingSenderId: "846154340039",
  appId: "1:846154340039:web:94d08f8e3bffb3ebb110e2",
  measurementId: "G-HH0FCMRE80",
};

// Initialize Firebase App (can be used on server and client)
const app = initializeApp(firebaseConfig);

// Function to get Analytics only on client side
function getFirebaseAnalytics() {
  if (typeof window !== "undefined") {
    return getAnalytics(app);
  } else {
    // Return null or a dummy object when running on server
    return null;
  }
}

export { app, getFirebaseAnalytics };
