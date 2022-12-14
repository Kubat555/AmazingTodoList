
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCCY-PnSCR6noRWA4OjEEBCOwKFKK3z0Oc",
    authDomain: "todolistvue3.firebaseapp.com",
    projectId: "todolistvue3",
    storageBucket: "todolistvue3.appspot.com",
    messagingSenderId: "504613339423",
    appId: "1:504613339423:web:f316346e802d51b014302a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};