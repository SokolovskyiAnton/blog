import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: JSON.parse(localStorage.getItem('wallPost') || '[]'),
    error: null
  },
  mutations: {
    createPost(state, post) {
      state.posts.unshift(post)
      localStorage.setItem('wallPost', JSON.stringify(state.posts))
    },
    updatePost(state, {id, text}) {
      const posts = state.posts.concat()
      const idx = posts.findIndex(p => p.id === id)

      const post = posts[idx]

      posts[idx] = {...post, text}
      state.posts = posts
      localStorage.setItem('wallPost', JSON.stringify(state.posts))
    },
    deletePost(state, id) {
      const posts = state.posts.concat()
      const idx = posts.findIndex(p => p.id === id)
      state.posts.splice(posts[idx], 1)
      localStorage.setItem('wallPost', JSON.stringify(state.posts))
    },
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    createPost({commit}, post) {
      commit('createPost', post)
    },
    updatePost({commit}, post) {
      commit('updatePost', post)
    },
    deletePost({commit}, id) {
      commit('deletePost', id)
    },

    async login({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async register({dispatch, commit}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          name
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },

    async logout() {
      await firebase.auth().signOut()
    }
  },
  getters: {
    getPosts: s => s.posts,
    error: s => s.error
  }
})
