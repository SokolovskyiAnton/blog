import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {BootstrapVue} from 'bootstrap-vue'
import './styles/styles.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

firebase.initializeApp({
  apiKey: "AIzaSyD7rb6983rjo3cRYbXO5F0tChYcZ-qIpzs",
  authDomain: "my-blog-vuejs.firebaseapp.com",
  databaseURL: "https://my-blog-vuejs.firebaseio.com",
  projectId: "my-blog-vuejs",
  storageBucket: "my-blog-vuejs.appspot.com",
  messagingSenderId: "703536334973",
  appId: "1:703536334973:web:cc738f0fd4db84327f4914"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


