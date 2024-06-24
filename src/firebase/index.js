// src/firebase/index.js

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { LocalStorage } from 'quasar'

export const firebaseConfig = {
  apiKey: 'AIzaSyDA7T1Fg6CSR1WJHpOeNdaRYuWKtyBA7GU',
  authDomain: 'app-ebl.firebaseapp.com',
  projectId: 'app-ebl',
  storageBucket: 'app-ebl.appspot.com',
  messagingSenderId: '664304698050',
  appId: '1:664304698050:web:fd9d886cf317cca6d5f15b'
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

onAuthStateChanged(auth, (user) => {
  if (user) {
    LocalStorage.set('user', user)
  } else {
    LocalStorage.remove('user')
  }
})
