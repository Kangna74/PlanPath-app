<script>
import { signInWithEmailAndPassword } from 'firebase/auth'

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

      //const result = await signInWithEmailAndPassword(this.username.trim(), this.password)

      //console.log(result)
    }
  }
}

</script>

<template>
  <div class="login">
    <input type="text" v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="login">Login</button>

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
