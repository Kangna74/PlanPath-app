import { VueFire, VueFireFirestoreOptionsAPI, VueFireAuth } from 'vuefire'
import { firebaseApp } from '@/firebase.js'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import './assets/style.css'

const app = createApp(App)

app.use(router)
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireFirestoreOptionsAPI(), VueFireAuth()],
})

app.mount('#app')
