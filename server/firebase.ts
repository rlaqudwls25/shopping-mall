import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import 'dotenv/config'
import {} from 'ts-node'

const firebaseConfig = {
  apiKey: process.env.fb_apikey,
  authDomain: process.env.fb_authDomain,
  projectId: process.env.fb_projectId,
  storageBucket: process.env.fb_storageBucket,
  messagingSenderId: process.env.fb_messagingSenderId,
  appId: process.env.fb_appId,
  measurementId: process.env.fb_measurementId,
}

console.log(firebaseConfig.apiKey)

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app

export const db = getFirestore(app)
