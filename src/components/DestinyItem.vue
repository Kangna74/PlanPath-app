<template>
  <form class="space-y-6">
    <div class="space-y-2">
      <label for="destination" class="block text-sm font-medium text-gray-700">Destino</label>
      <input 
        id="destination"
        
        type="text"
        placeholder="¿A dónde quieres ir?"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <div class="space-y-2">
      <label for="dates" class="block text-sm font-medium text-gray-700">Fechas del viaje</label>
      <input 
        id="dates"
        
        type="text"
        placeholder="Selecciona las fechas"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <button 
      type="submit"
      class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Siguiente: Añadir Actividades
    </button>
  </form>
</template>

<!-- <script setup>
import { reactive } from 'vue'

const emit = defineEmits(['submit'])

const formData = reactive({
  destination: '',
  dates: ''
})

const handleSubmit = () => {
  emit('submit', { ...formData })
}
</script> -->