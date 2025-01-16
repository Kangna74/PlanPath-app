import './assets/style.css'
import {VueFire} from 'vuefire'
import {firebaseApp} from './firebase.js'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueFireFirestoreOptionsAPI } from 'vuefire'
import { VueFireAuthOptionsFromAuth } from 'vuefire'

const app = createApp(App)

app.use(router)
app.use(VueFire, {
    firebaseApp, modules:[VueFireFirestoreOptionsAPI(), VueFireAuthOptionsFromAuth()]
} )

app.mount('#app')
