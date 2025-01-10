<template>
  <div class="bg-white rounded-lg shadow-sm p-8 text-center">
    <div class="space-y-4">
      <!-- Icon (optional) -->
      <!-- <div v-if="icon" class="flex justify-center">
        <component 
          :is="icon" 
          class="w-12 h-12 text-gray-400"
        /> -->
      </div>
      
      <!-- Message -->
      <p class="text-gray-600">
        no hay plan
        <!-- {{ message }} -->
      </p>

      <!-- Action Button -->
      <button
        
        class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
      crear
        <!-- {{ buttonText }} -->
      </button>
    </div>
  <!-- </div> -->
</template>

<!-- <script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  message: {
    type: String,
    default: 'Aún no tienes itinerarios creados.'
  },
  buttonText: {
    type: String,
    default: 'Crear mi primer itinerario'
  },
  icon: {
    type: Object,
    default: null
  }
})

defineEmits(['action'])
</script> -->