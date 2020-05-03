import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDHBIGUSWtcp3xWpQ2ECoC_Q7Qj8NzoWj8",
  authDomain: "trasportracking.firebaseapp.com",
  databaseURL: "https://trasportracking.firebaseio.com",
  projectId: "trasportracking",
  storageBucket: "trasportracking.appspot.com",
  messagingSenderId: "353201080906",
  appId: "1:353201080906:web:44ce9ceaf7f57994aaf4b3",
  measurementId: "G-QF5CKHGQM8",
};

export const firebaseapp = firebase.initializeApp(firebaseConfig);
