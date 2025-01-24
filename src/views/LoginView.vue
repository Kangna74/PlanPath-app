<script>
import IconLogoPP from '@/components/icons/IconLogoPP.vue'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'

import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

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
      try {
        await signInWithEmailAndPassword(auth, this.username.trim(), this.password)
        toast('Inicio de sesión exitoso', {
          type: 'success',
          position: 'top-center',
        })
      } catch (error) {
        console.log(error.code)
        let errorMessage = ''
        switch (error.code) {
          case 'auth/invalid-credential':
            errorMessage = 'Usuario o contraseña incorrectos'
            break
          case 'auth/invalid-email':
            errorMessage = 'Correo electrónico inválido'
            break
          case 'auth/missing-password':
            errorMessage = 'Falta la contraseña'
            break
          default:
            errorMessage = 'Error desconocido'
            break
        }
        toast(errorMessage, {
          type: 'error',
          position: 'top-center',
        })
      }
    },
  },
  mounted() {},
  beforeMount() {},
  afterMount() {},
}
</script>

<template>
  <div class="min-96 bg-white p-4 justify-center items-center">
    <div
      class="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg flex flex-col justify-center items-center"
    >
      <IconLogoPP class="h-30" />

      <form class="flex flex-col justify-center items-center w-full py-6 gap-4" @submit.prevent>
        <div class="flex flex-col w-full items-center">
          <label class="block mb-1 justify-start" for="username">Correo electrónico</label>
          <input
            class="mt-1 block w-1/2 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            v-model="username"
            placeholder="Correo electrónico"
          />
        </div>

        <div class="flex flex-col items-center w-full">
          <label class="block mb-1 text-sm items-start" for="password">Contraseña</label>

          <input
            class="mt-1 block w-1/2 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="password"
            v-model="password"
            placeholder="Contraseña"
          />
        </div>

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

<style>
.error {
}
</style>
