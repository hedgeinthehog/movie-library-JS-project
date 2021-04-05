import * as firebase from 'firebas'
//import 'firebaseui/dist/firebaseui.css'
import firebase from 'firebase/app'
//import 'firebase/auth'
//import 'firebase/database'
//import 'firebase/storage'
//import 'firebase/messaging'


const hasInit = false;
const сonfig = {
  apiKey: "AIzaSyBD7_oWKTTnxfj-VER2LHQWzIhKjaGUJy0",
  authDomain: "movie-library-20366.firebaseapp.com",
  projectId: "movie-library-20366",
  storageBucket: "movie-library-20366.appspot.com",
  messagingSenderId: "98739659149",
  appId: "1:98739659149:web:8a31c8595cbbbbf9f05dc4"
};
if(!hasInit){
    firebase.initializeApp(config);
    hasInit = true;
}

