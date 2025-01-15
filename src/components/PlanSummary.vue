<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold">
      Tu Itinerario para ""
    </h2>

    <!-- Travel Dates -->
    <div class="bg-gray-50 rounded-lg p-4">
      <h3 class="text-sm font-medium text-gray-700 mb-2">Fechas del viaje:</h3>
      <p class="text-gray-600">fecha</p>
    </div>

    <!-- Activities Summary -->
    <div class="bg-gray-50 rounded-lg p-4">
      <h3 class="text-sm font-medium text-gray-700 mb-2">Resumen de Actividades:</h3>
      <div class="min-h-[100px]">
        <!-- You can add more content here for activities -->
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-between gap-4 mt-6">
      <button

        class="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
      >
        Volver
      </button>
      <button

        class="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
      >
        ¡Ver tu itinerario!
      </button>
    </div>
  </div>
</template>

<!-- <script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  country: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  }
})

defineEmits(['back', 'next'])
</script> -->
