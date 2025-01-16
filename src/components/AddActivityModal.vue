<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black bg-opacity-50" @click="close"></div>

    <!-- Modal -->
    <div class="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
      <!-- Header -->
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-xl font-bold">Añadir Nueva Actividad</h2>
        <button
          @click="close"
          class="text-gray-400 hover:text-gray-600"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="activityName" class="block text-sm font-medium text-gray-700">
            Nombre de la Actividad
          </label>
          <input
            id="activityName"
            v-model="formData.name"
            type="text"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="date" class="block text-sm font-medium text-gray-700">
            Fecha
          </label>
          <input
            id="date"
            v-model="formData.date"
            type="date"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="time" class="block text-sm font-medium text-gray-700">
            Hora
          </label>
          <input
            id="time"
            v-model="formData.time"
            type="time"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="location" class="block text-sm font-medium text-gray-700">
            Ubicación
          </label>
          <input
            id="location"
            v-model="formData.location"
            type="text"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="notes" class="block text-sm font-medium text-gray-700">
            Notas (opcional)
          </label>
          <textarea
            id="notes"
            v-model="formData.notes"
            rows="3"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          class="mt-4 w-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          Añadir Actividad
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'submit'])

const formData = reactive({
  name: '',
  date: '',
  time: '',
  location: '',
  notes: ''
})

const handleSubmit = () => {
  emit('submit', { ...formData })
  resetForm()
  close()
}

const close = () => {
  emit('close')
}

const resetForm = () => {
  formData.name = ''
  formData.date = ''
  formData.time = ''
  formData.location = ''
  formData.notes = ''
}
</script>
