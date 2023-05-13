// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyAT6fpah-4-fUsSthOJ9OZ9YB9-j-8h-84",
    authDomain: "instagram-clone-react-31152.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-31152-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-react-31152",
    storageBucket: "instagram-clone-react-31152.appspot.com",
    messagingSenderId: "447100885660",
    appId: "1:447100885660:web:620568677dcc108ddfeb59",
    measurementId: "G-XP49DZWMSD"
});
const db=firebaseApp.firestore();
const auth=firebaseApp.auth();
const storage=firebaseApp.storage();
 
export {db,auth,storage};
