<template>
  <div class="bg-white rounded-lg shadow-sm p-8 text-center">
    <div class="space-y-4">
      <p class="text-gray-600">Aún no has creado ningún itinerario 😅</p>
      <button
        @click="$emit('create-plan')"
        class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Crear nuevo itinerario
      </button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['create-plan'])
</script>
