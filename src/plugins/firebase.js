import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyBwNOSqRS7ozWk_sDYbATBUPusgRftlPgI",
    authDomain: "educarechat-4b7f3.firebaseapp.com",
    databaseURL: "https://educarechat-4b7f3.firebaseio.com",
    projectId: "educarechat-4b7f3",
    storageBucket: "educarechat-4b7f3.appspot.com",
    messagingSenderId: "37581442102",
    appId: "1:37581442102:web:b4b4443bf866b86c879c97"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const storage = firebase.storage().ref();