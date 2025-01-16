<script>
import IconLogoPP from '@/components/icons/IconLogoPP.vue'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
//import { useCurrentUser } from 'vuefire';

export default {
  components: {
    IconLogoPP,
  },
  data() {
    return {
      username: 'jonathanbetper@gmail.com',
      password: '123456',
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
      console.log('currentUser', uid)
    },
  },
  mounted() {
    const currentUser = auth.currentUser
    const uid = currentUser?.uid
    console.log('currentUser', uid)
  },
  beforeMount() {},
}
</script>

<template>
  <div class="min-h-screen bg-white p-4 justify-center items-center">
    <div class="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg justify-center items-center">
      <IconLogoPP class="h-30" />

      <form class="flex flex-col justify-center items-center mt-8 space-y-6">
        <input
          class="mt-1 block w-1/2 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
          v-model="username"
          placeholder="Correo electrónico"
        />
        <input
          class="mt-1 block w-1/2 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="password"
          v-model="password"
          placeholder="Contraseña"
        />

        <button
          class="m-auto w-1/2 rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
          @click="login"
        >
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<style></style>
