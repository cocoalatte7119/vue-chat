import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA2isL2ym1bEhM9PI7RExBZc1vVnyK7UHo",
  authDomain: "vue-chat-5b636.firebaseapp.com",
  projectId: "vue-chat-5b636",
  storageBucket: "vue-chat-5b636.appspot.com",
  messagingSenderId: "164686479315",
  appId: "1:164686479315:web:6b5a05900e7315a13cb926"
};

const firebaseSetting = initializeApp(firebaseConfig)
const db = getFirestore(firebaseSetting)
const auth = getAuth(firebaseSetting)

export { db }
export { auth }