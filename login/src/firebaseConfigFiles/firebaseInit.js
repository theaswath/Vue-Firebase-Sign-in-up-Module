import firebase from "firebase";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

var firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebaseApp;
