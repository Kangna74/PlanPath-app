<script>
import IconLogoPP from '@/components/icons/IconLogoPP.vue'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import router from '@/router'

export default {
  components: {
    IconLogoPP,
  },
  data() {
    return {
      username: 'plan@path.com',
      password: '',
    }
  },
  methods: {
    async login() {
      await signInWithEmailAndPassword(auth, this.username.trim(), this.password)
        .then(() => {
          router.push('/')
        })
        .catch((error) => {
          console.log("No se ha podido iniciar sesión", error)
        })
    },
  },
  mounted() {
    const currentUser = auth.currentUser
    const uid = currentUser?.uid
    console.log('currentUser', uid)
  },
  beforeMount() { },
  afterMount() {
  },
}
</script>

<template>
  <div class="min-h-screen bg-white p-4 justify-center items-center">
    <div class="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg flex flex-col justify-center items-center">
      <IconLogoPP class="h-30" />

      <form class="flex flex-col justify-center items-center w-full py-6 gap-4" @submit.prevent>
        <div class="flex flex-col w-full items-center">
          <label class="block mb-1 justify-start" for="username">Correo electrónico</label>
          <input
            class="mt-1 block w-1/2 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text" v-model="username" placeholder="Correo electrónico" />
        </div>

        <div class="flex flex-col items-center w-full">
          <label class="block mb-1 text-sm items-start" for="password">Contraseña</label>

          <input
            class="mt-1 block w-1/2 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="password" v-model="password" placeholder="Contraseña" />
        </div>

        <button class="m-auto w-1/2 rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600" @click="login">
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<style>
.error {}
</style>
