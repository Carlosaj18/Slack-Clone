import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAulcziK8NYcv_xz7zxn3hpmCLhYPX613s",
  authDomain: "slack-b2e23.firebaseapp.com",
  projectId: "slack-b2e23",
  storageBucket: "slack-b2e23.appspot.com",
  messagingSenderId: "876320408140",
  appId: "1:876320408140:web:25c27ec5ff25fb5365eae9"
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider, db };
