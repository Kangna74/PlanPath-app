import { VueFire, VueFireFirestoreOptionsAPI, VueFireAuth } from 'vuefire'
import { firebaseApp } from '@/firebase/index.js'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'
import './assets/style.css'

const app = createApp(App)

app.use(router)
app.use(VCalendar, {})
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireFirestoreOptionsAPI(), VueFireAuth()],
})

app.mount('#app')
