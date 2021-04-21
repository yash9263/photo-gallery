import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBxu0NIN8HFeJ0NZEled0Kgfhjbj-q3arM",
  authDomain: "insta-clone-a865b.firebaseapp.com",
  projectId: "insta-clone-a865b",
  storageBucket: "insta-clone-a865b.appspot.com",
  messagingSenderId: "611390219572",
  appId: "1:611390219572:web:ff47004c59a31e03a8f161"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
