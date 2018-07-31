import * as firebase from 'firebase';

const config = {
    apiKey: "<YOUR_API_KEY>",
    authDomain: "<YOUR_APP_NAME>.firebaseapp.com",
    databaseURL: "https://<YOUR_APP_NAME>.firebaseio.com",
    projectId: "<YOUR_APP_NAME>",
    storageBucket: "<YOUR_APP_NAME>.appspot.com",
    messagingSenderId: "<YOUR_APP_ID>"
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };