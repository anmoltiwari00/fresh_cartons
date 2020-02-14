import firebase from "firebase";
import Rebase from "re-base";

// Initialize Firebase
const config = {
  // Initialize Firebase
  apiKey: "AIzaSyBMK6QY4OWm__Vr9UfmWpiDpikHMP-GT2M",
  authDomain: "freshcartons.firebaseapp.com",
  databaseURL: "https://freshcartons.firebaseio.com",
  projectId: "freshcartons",
  storageBucket: "freshcartons.appspot.com",
  messagingSenderId: "793967927534"
};

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());
const firebaseDB = app.database();
export { app, base, firebaseDB };
