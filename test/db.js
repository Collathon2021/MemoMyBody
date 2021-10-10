import firebase from '@react-native-firebase/app'
import '@react-native-firebase/firestore'
import api from './api'


const firebaseApp = !firebase.apps.length?firebase.initializeApp(api):firebase.app()
export default firebaseApp.firestore()