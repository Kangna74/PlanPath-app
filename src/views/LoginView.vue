<script>

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'
import { useCurrentUser } from 'vuefire';

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        alert('Please enter both username and password')
        return
      }

      console.log(this.username, this.password)

      const result = await signInWithEmailAndPassword(auth, this.username.trim(), this.password)
      console.log(result)
    },
    async dameInfo() {
      const currentUser = auth.currentUser
      const uid = currentUser?.uid
      console.log("currentUser", uid)
    }
  },
  mounted() {
    const currentUser = auth.currentUser
    const uid = currentUser?.uid
    console.log("currentUser", uid)
  },
  beforeMount() {

  }
}

</script>

<template>
  <div class="login">
    <input type="text" v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="login">Login</button>

    <button @click="dameInfo">Dame info</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
