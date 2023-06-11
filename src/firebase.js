import firebase from 'firebase/compat/app'
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB0rVWD0cbT1YC-15QzOSP-x_rOApzleZo",
    authDomain: "slack-clone-72365.firebaseapp.com",
    projectId: "slack-clone-72365",
    storageBucket: "slack-clone-72365.appspot.com",
    messagingSenderId: "704617522949",
    appId: "1:704617522949:web:fa2505c8f775ac89c5b96c"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider }