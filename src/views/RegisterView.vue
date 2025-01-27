<script>
import IconLogoPP from '@/components/icons/IconLogoPP.vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  components: {
    IconLogoPP,
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async register() {

      if (this.username.trim() === '' || this.password === '') {
        toast('Por favor, llena todos los campos', {
          type: 'error',
          position: 'top-center',
        })
        return
      }

      try {
        await createUserWithEmailAndPassword(auth, this.username.trim(), this.password)

        toast('Regsitro exitoso', {
          type: 'success',
          position: 'top-center',
        })

        this.$router.push({ name: 'LogIn' })
      } catch (error) {
        let errorMessage = ''
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'El correo electrónico ya está en uso'
            break
          case 'auth/invalid-email':
            errorMessage = 'Correo electrónico inválido'
            break
          case 'auth/weak-password':
            errorMessage = 'La contraseña es débil'
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
    navigateToLogin() {
      this.$router.push({ name: 'LogIn' })
    }
  }
}
</script>

<template>
  <div class="min-96 bg-white p-4 justify-center items-center">
    <div
      class="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg flex flex-col justify-center items-center"
    >
      <IconLogoPP class="h-30" />


      <h1 class="text-2xl font-bold text-blue-500 text-center mt-4">Organiza tus ideas</h1>
      <h1 class="text-2xl font-bold text-blue-500 text-center mb-3"> ¡Construye grandes planes!</h1>

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
          <label class="block mb-1 items-start" for="password">Contraseña</label>

          <input
            class="mt-1 block w-1/2 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="password"
            v-model="password"
            placeholder="Contraseña"
          />
        </div>

        <button
          class="m-auto w-1/2 rounded-md bg-blue-500 shadow-lg shadow-blue-500/50 px-6 py-2 text-white hover:bg-blue-600"
          @click="register"
        >
          Registrarse
        </button>

        <button
        class="m-auto w-1/2 rounded-md shadow-lg border border-blue-500  px-6 py-2 text-blue-500 hover:bg-blue-500 hover:text-white hover:shadow-blue-500/50"
        @click="navigateToLogin"
        >
          Ya tengo cuenta
        </button>
      </form>
    </div>
  </div>
</template>

<style>
</style>
