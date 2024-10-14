import React from 'react'

import { Types } from 'kilt-extension-api'

import styles from './Step.module.css'

import Button from '../Button'

import { triggerLogin } from '../../api/triggerLogin'
import { triggerLogout } from '../../api/triggerLogout'

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set } from 'firebase/database'
import { getAnalytics } from 'firebase/analytics'

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: 'AIzaSyAxS4ikjZ5vtU3b_UUsR6HInEmGFLuMfag',
  authDomain: 'cryptobox-56968.firebaseapp.com',
  databaseURL:
    'https://cryptobox-56968-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'cryptobox-56968',
  storageBucket: 'cryptobox-56968.appspot.com',
  messagingSenderId: '634208067243',
  appId: '1:634208067243:web:18c6673136113b13c121ee',
  measurementId: 'G-NBLWTCEF9Y'
}

// Firebase başlatma
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const database = getDatabase(app)

interface Props {
  extensionSession: Types.PubSubSessionV1 | Types.PubSubSessionV2 | null
  userMail: string | undefined
  setUserMail: (userMail: string | undefined) => void
  setExtensionSession: (
    injectedExtension: Types.PubSubSessionV1 | Types.PubSubSessionV2 | null
  ) => void
  onError: (message: string) => void
}

function SubmitCredential({
  extensionSession,
  userMail,
  setUserMail,
  setExtensionSession,
  onError
}: Props) {
  async function handleLogin() {
    console.log(
      'Trying to log in. Meaning to ask the extension for a specific Type of Credential - a CType.'
    )
    try {
      const verifiedUserInfoThatServerSendsBack = await triggerLogin(
        extensionSession
      )
      const parsedData = JSON.parse(verifiedUserInfoThatServerSendsBack)
      const jsonString = JSON.stringify(parsedData, null, 2)
      setUserMail(verifiedUserInfoThatServerSendsBack)

      // Firebase Realtime Database'e veriyi string olarak yazma
      const dbRef = ref(database, 'users/' + userMail)
      //await set(dbRef, jsonString) // String olarak gönderiyoruz
      console.log('Data successfully written to Firebase as a string!')
      console.log(jsonString)

      console.log('Data successfully written to Firebase!')
    } catch (error) {
      console.error('Error writing to Firebase: ', error)
      onError(`Error writing data to Firebase: ${error}`)
    }
  }

  async function handleLogout() {
    console.log('Trying to log out. Meaning to delete the cookies.')
    await triggerLogout()
    setUserMail(undefined)
    setExtensionSession(null)
  }

  async function accessManager() {
    try {
      if (!userMail) {
        await handleLogin()
      } else {
        await handleLogout()
      }
    } catch (err) {
      onError(`Error on the 4th Step 'Submitting attested Credential': ${err}`)
    }
  }

  return (
    <div className={styles.step}>
      <h2>4. Send the DID to the Writter Electronic</h2>
      <Button disabled={!extensionSession && !userMail} onClick={accessManager}>
        {userMail ? 'Yeniden Gönder' : 'Download'}
      </Button>
    </div>
  )
}

export default SubmitCredential
