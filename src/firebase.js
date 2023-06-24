import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_79MRT5rSH1NVXiKqM7gF1Ej4B3bpvrA",
  authDomain: "disneyplus-clone-c7064.firebaseapp.com",
  projectId: "disneyplus-clone-c7064",
  storageBucket: "disneyplus-clone-c7064.appspot.com",
  messagingSenderId: "474446806182",
  appId: "1:474446806182:web:537184881e9b849fa88867",
  measurementId: "G-XH9RZHLPLG"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, storage };

export default db;