  import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAxpnZs7gdhgbkvDxGBwWskOBsxlU1xp1U",
    authDomain: "instagram-clone-doggy.firebaseapp.com",
    databaseURL: "https://instagram-clone-doggy.firebaseio.com",
    projectId: "instagram-clone-doggy",
    storageBucket: "instagram-clone-doggy.appspot.com",
    messagingSenderId: "684536787069",
    appId: "1:684536787069:web:f9582fff9fc64a1fe2c114",
    measurementId: "G-11M32MT67M"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db, auth, storage};