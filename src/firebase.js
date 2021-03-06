import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyApRpx6viN2RqZraC4AYZcEk0LJ4eC2DR0',
  authDomain: 'mortgage-game.firebaseapp.com',
  projectId: 'mortgage-game',
  storageBucket: 'mortgage-game.appspot.com',
  messagingSenderId: '1074998956539',
  appId: '1:1074998956539:web:e4115e211fa234aef4bb5e'
}

const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()
const usersCollection = db.collection('users')
const scoresCollection = db.collection('scores')

export const createUser = user => {
  return usersCollection.add({
    date: new Date(),
    ...user
  })
}

export const getUser = async id => {
  const user = await usersCollection.doc(id).get()
  return user.exists ? user.data() : null
}

export const getUsers = async () => {
  const users = await usersCollection.get()
  return (users.docs.map(doc => ({id: doc.id, ...doc.data()})))
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return usersCollection.doc(id).delete()
}

export const createScore = score => {
  return scoresCollection.add(score)
}

export const getUserScores = async (userEmail) => {
  let scores = []
  const snapshot = await scoresCollection.where('email', '==', userEmail).orderBy('date', 'desc').get()
  if (!snapshot.empty) {
    snapshot.forEach(s => scores.push(s.data()))
  }
  return scores
}

export const getAllScores = async () => {
  let scores = []
  const snapshot = await scoresCollection.orderBy('score', 'desc').limit(20).get()
  if (!snapshot.empty) {
    snapshot.forEach(s => scores.push(s.data()))
  }
  return scores
}

// export const useLoadUsers = () => {
//   const users = ref([])
//   const close = usersCollection.onSnapshot(snapshot => {
//     users.value = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
//   })
//   onUnmounted(close)
//   return users
// }
