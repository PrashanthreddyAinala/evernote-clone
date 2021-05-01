import firebase from 'firebase/app';

import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyDKl3RTIUNpsY7ui8wTcapAITfYAxo337U",
  authDomain: "evernote-clone-e49de.firebaseapp.com",
  projectId: "evernote-clone-e49de",
  storageBucket: "evernote-clone-e49de.appspot.com",
  messagingSenderId: "1043317916665",
  appId: "1:1043317916665:web:00c5895557b9af683f3328"
};

firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

export default { projectStorage, projectFirestore};