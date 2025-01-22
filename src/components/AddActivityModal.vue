<script setup>
import { ref, watch } from 'vue'
import { getCurrentDate, validateDate } from '@/utils/script'

const props = defineProps({
  isOpen: Boolean,
  plan: Object
})

const emit = defineEmits(['close', 'submit'])

const formData = ref({
  name: '',
  date: '',
  time: '',
  location: '',
  notes: ''
})

const dateError = ref('')


watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    resetForm()
  }
})

const handleSubmit = () => {
  emit('submit', { ...formData.value })
  resetForm()
  close()
}

const resetForm = () => {
  formData.value = {
    name: '',
    date: '',
    time: '',
    location: '',
    notes: ''
  }
}

const close = () => {
  emit('close');
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="fixed inset-0 bg-black bg-opacity-50" @click="close"></div>
    <div class="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
      <h2 class="text-xl font-bold mb-4">Añadir Nueva Actividad</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="activityName" class="block text-sm font-medium text-gray-700">Nombre de la Actividad</label>
          <input
            id="activityName"
            v-model="formData.name"
            type="text"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="activityDate" class="block text-sm font-medium text-gray-700">Fecha</label>
          <input
            id="activityDate"
            v-model="formData.date"
            type="date"
            required
            :min="getCurrentDate()"
            @change="validateDate()"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <p v-if="dateError" class="text-sm text-red-500 mt-1">{{ dateError }}</p>
        </div>
        <div>
          <label for="activityTime" class="block text-sm font-medium text-gray-700">Hora</label>
          <input
            id="activityTime"
            v-model="formData.time"
            type="time"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="activityLocation" class="block text-sm font-medium text-gray-700">Ubicación</label>
          <input
            id="activityLocation"
            v-model="formData.location"
            type="text"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="activityNotes" class="block text-sm font-medium text-gray-700">
            Notas (opcional)
          </label>
          <textarea
            id="activityNotes"
            v-model="formData.notes"
            maxlength="30"
            rows="3"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          ></textarea>
          <p class="text-sm text-gray-500 mt-1">{{ formData.notes.length }}/30 caracteres</p>
        </div>
        <div class="flex justify-end space-x-2">
          <button
            type="button"
            @click="close"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Añadir Actividad
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


