<script>
import { validateDate, getCurrentDate } from '@/utils'

export default {
  props: {
    isOpen: Boolean,
    activity: Object,
  },

  emits: ['close', 'update'],

  data() {
    return {
      formData: {
        name: '',
        date: '',
        time: '',
        location: '',
        notes: '',
      },
      dateError: '',
    }
  },

  watch: {
    activity: {
      handler(newActivity) {
        if (newActivity) {
          this.formData = { ...newActivity }
        }
      },
      immediate: true,
    },
  },

  methods: {
    handleSubmit() {
      this.$emit('update', this.formData)
      this.close()
    },

    close() {
      this.$emit('close')
    },

    getCurrentDate,

    validateDate() {
      this.dateError = validateDate(this.formData.date, this.formData.date)
    },
  },
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="fixed inset-0 bg-black bg-opacity-50" @click="close"></div>
    <div class="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
      <h2 class="text-xl font-bold mb-4">Editar Actividad</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="activityName" class="block text-sm font-medium text-gray-700"
            >Nombre de la Actividad</label
          >
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
            @change="validateDate"
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
          <label for="activityLocation" class="block text-sm font-medium text-gray-700"
            >Ubicación</label
          >
          <input
            id="activityLocation"
            v-model="formData.location"
            type="text"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="activityNotes" class="block text-sm font-medium text-gray-700">Notas</label>
          <textarea
            id="activityNotes"
            v-model="formData.notes"
            maxlength="50"
            rows="3"
            class="resize-none mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          ></textarea>
          <p class="text-sm text-gray-500 mt-1">{{ formData.notes.length }}/50 caracteres</p>
        </div>
        <div class="flex justify-end space-x-2">
          <button
            type="button"
            @click="close"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 shadow-lg shadow-gray-100/50 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 shadow-lg shadow-blue-600/50 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
