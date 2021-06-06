import firebase from 'firebase/app';
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyAEt0H6LoFKU9U_UAWbG3P1AawnGek-L7s",
    authDomain: "ryver-8d6c4.firebaseapp.com",
    projectId: "ryver-8d6c4",
    storageBucket: "ryver-8d6c4.appspot.com",
    messagingSenderId: "549892192011",
    appId: "1:549892192011:web:c4a5f3e586c4573c39940e"
  }).auth();