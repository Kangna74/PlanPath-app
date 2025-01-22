<script>
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '@/firebase';
import router from '@/router';

export default {
  data() {
    return {
      logout: false
    }
  },
  components: {
    // Agrega tus componentes aquí
  },
  methods: {
    cerrarSesion(){
      signOut(auth).then(() => {
        this.logout = true;
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  mounted() {
    onAuthStateChanged(auth, () => {
      if (user) {
        this.cerrarSesion();
      } else


    this.cerrarSesion();
  }
}
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4">Cerrando sesión...</h1>
      <p class="text-gray-600">Por favor, espera un momento.</p>
    </div>
  </div>
</template>

<style>
</style>
