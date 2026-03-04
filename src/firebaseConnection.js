import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDP-SAVlKP_QsToXUHu7QgTx2gApK8PxSE",
  authDomain: "react-firebase-41ee7.firebaseapp.com",
  projectId: "react-firebase-41ee7",
  storageBucket: "react-firebase-41ee7.firebasestorage.app",
  messagingSenderId: "165251619442",
  appId: "1:165251619442:web:810de70940159d497d00eb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { db, auth };
