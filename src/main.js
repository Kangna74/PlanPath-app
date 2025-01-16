import './assets/style.css'
import { VueFire } from 'vuefire'
import { firebaseApp } from './firebase.js'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueFireFirestoreOptionsAPI } from 'vuefire'
import { VueFireAuth } from 'vuefire'

const app = createApp(App)

app.use(router)
// app.use(VueFire, {
//   firebaseApp,
//   modules: [VueFireFirestoreOptionsAPI(), VueFireAuth()],
// })

app.mount('#app')
