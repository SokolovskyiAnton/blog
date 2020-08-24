import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: JSON.parse(localStorage.getItem('wallPost') || '[]')
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
    }
  },
  getters: {
    getPosts: s => s.posts
  }
})
