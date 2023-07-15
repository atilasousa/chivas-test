import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '@/config/firebase'
import { setDoc, doc, collection, serverTimestamp, getDocs } from 'firebase/firestore'
import router from '@/router/index.js'

const collectionRef = collection(db, 'users')

export const authStore = {
  namespaced: true,
  state: {
    user: {},
    users: []
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setUsers (state, users) {
      state.users = users
    }
  },
  actions: {
    async LOGIN ({ commit }, { email, password }) {
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        )
        if (response.user) {
          commit('setUser', response.user)
          await router.push('/users')
          return { user: response.user }
        }
      } catch (error) {
        return { error }
      }
    },
    async CREATE_USER ({ commit }, { email, password, name, birthDate }) {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      if (response.user) {
        const documentRef = doc(collectionRef)

        await setDoc(documentRef, {
          name,
          email,
          birthDate,
          created_at: serverTimestamp()
        })

        commit('setUser', response.user)

        await router.push('/users')
        return response.user
      }
    },
    async GET_USERS ({ commit }) {
      const users = []
      const querySnapshot = await getDocs(collectionRef)

      querySnapshot.forEach((doc) => {
        users.push({
          id: doc.id,
          ...doc.data()
        })
      })

      commit('setUsers', users)
    },
    async LOG_OUT ({ commit }) {
      await auth.signOut()
      commit('setUser', null)
      await router.push('/login')
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    users (state) {
      return state.users
    }
  }
}
