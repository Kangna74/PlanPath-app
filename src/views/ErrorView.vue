<template>
  <div class="bg-gray-100 flex flex-col justify-center items-center px-4 min-h-screen">
    <div class="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
      <div class="mb-8">
        <AlertTriangleIcon class="mx-auto h-16 w-16 text-blue-500" />
      </div>
      <h1 class="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p class="text-xl text-gray-600 mb-8">Ups, este no era el plan que tenía en mente</p>
      <p class="text-gray-500 mb-8">Lo sentimos, pero la página que estás buscando no existe.</p>
      <a
        href="/"
        class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
      >
        Volver al inicio
      </a>
    </div>
  </div>
</template>

<script setup>
import { AlertTriangleIcon } from 'lucide-vue-next'
</script>
