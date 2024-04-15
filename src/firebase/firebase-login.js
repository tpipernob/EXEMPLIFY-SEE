// src/firebase/firebase-login.js

import { auth } from './index.js'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Loading, Notify } from 'quasar'

const login = (data) => {
  return new Promise((resolve, reject) => {
    Loading.show()
    console.log(data.email, data.password)
    signInWithEmailAndPassword(auth, data.email, data.password).then(userCredential => {
      Loading.hide()
      resolve(userCredential.user)
    }).catch(err => {
      Loading.hide()
      Notify.create({
        type: 'negative',
        message: err.message
      })
      reject(err.message)
    })
  })
}

const signOut = () => {
  return new Promise((resolve, reject) => {
    Loading.show()
    auth.signOut().then(() => {
      Loading.hide()
      resolve()
    }).catch(err => {
      Loading.hide()
      reject(err.message)
    })
  })
}

export { login, signOut }
export default login
