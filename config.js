/* ------------------------------------------------------------------
   Cattivissimo Impostor — configurazione Firebase.

   IMPORTANTE: usa "var" e non "const". Questo file viene caricato
   come script classico e deve restare una variabile globale.
   Il service worker (sw.js) NON lo mette in cache apposta, così
   quando cambi le chiavi basta ricaricare la pagina.
------------------------------------------------------------------ */

var FIREBASE_CONFIG = {
  apiKey: "AIzaSyAe7W5LnPwaZ2oAU5NdSp5bLqpUlKMpkio",
  authDomain: "cattivissimo-impostor.firebaseapp.com",
  databaseURL: "https://cattivissimo-impostor-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cattivissimo-impostor",
  storageBucket: "cattivissimo-impostor.firebasestorage.app",
  messagingSenderId: "718755442437",
  appId: "1:718755442437:web:663521386ec60b2401116c",
  measurementId: "G-DPZ1R2QDKF"
};
