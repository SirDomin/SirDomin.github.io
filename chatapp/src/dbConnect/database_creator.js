import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCEYCQCru30fLeovzRABjgauOisbvBCBNI",
    authDomain: "chatapp-c8e52.firebaseapp.com",
    databaseURL: "https://chatapp-c8e52.firebaseio.com",
    projectId: "chatapp-c8e52",
    storageBucket: "chatapp-c8e52.appspot.com",
    messagingSenderId: "89030800080"
};
firebase.initializeApp(config);
const database = firebase.database();

export default database;
