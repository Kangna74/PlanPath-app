<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold">
      Actividades para ""
    </h2>

    <!-- Empty State -->
    <div class="text-gray-500 text-center py-4">
      Aún no has añadido ninguna actividad.
      <br />
      ¡Comienza a planificar!
    </div>

    <!-- Action Buttons -->
    <button 
      
      class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
    >
      
      Añadir Actividad
    </button>

    <!-- Navigation Buttons -->
    <div class="flex justify-between gap-4 mt-6">
      <button 
        
        class="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
      >
        Volver
      </button>
      <button 
        
        class="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
      >
        Siguiente: Ver Itinerario
      </button>
    </div>
  </div>
</template>

<!-- <script setup>
import { PlusIcon } from 'lucide-vue-next'

defineProps({
  destination: {
    type: String,
    default: 'País'
  }
})

defineEmits(['add-activity', 'navigate'])
</script> -->