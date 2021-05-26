import firebase from 'firebase/app';

// import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCMa2gRBfxAy0dZynBsbnY6UVobMHF8zcI",
    authDomain: "evernote-clone-94de8.firebaseapp.com",
    projectId: "evernote-clone-94de8",
    storageBucket: "evernote-clone-94de8.appspot.com",
    messagingSenderId: "294058806137",
    appId: "1:294058806137:web:7c8f09e1e47934cdaa3da8"
};

firebase.initializeApp(firebaseConfig);

// const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

export default projectFirestore;