

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDUzrYaSE-7Dnbi5v86ljdKVNhatFOd0rI",
  authDomain: "buyonia-chat.firebaseapp.com",
  projectId: "buyonia-chat",
  storageBucket: "buyonia-chat.appspot.com",
  messagingSenderId: "661911260499",
  appId: "1:661911260499:web:4e2816ae4b93907504a5a6",
  measurementId: "G-59Z9NM3H3Y",
};

const app = !firebase.apps.length 
? firebase.initializeApp(firebaseConfig) 
: firebase.app();


const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
