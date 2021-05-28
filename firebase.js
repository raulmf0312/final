const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
    apiKey: "AIzaSyDXiVoOX73Lp1szE3zgYfuwDbcRPPxudgc",
    authDomain: "final-project-ab3e0.firebaseapp.com",
    projectId: "final-project-ab3e0",
    storageBucket: "final-project-ab3e0.appspot.com",
    messagingSenderId: "1057040828035",
    appId: "1:1057040828035:web:2919f59408be81b7207db6"
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase