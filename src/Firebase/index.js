
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCp0byWcYC8RkaA0RFjW8ntCGOKZNsRR5o",
    authDomain: "todolistvue3-913b9.firebaseapp.com",
    projectId: "todolistvue3-913b9",
    storageBucket: "todolistvue3-913b9.appspot.com",
    messagingSenderId: "431484590113",
    appId: "1:431484590113:web:bb9188a0130f829a1a2b60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};