<script>
import { validateDate, getCurrentDate } from '@/utils/script'

export default {
  name: 'EditPlanModal',
  props: {
    plan: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editedPlan: { ...this.plan },
      dateError: ''
    }
  },
  methods: {
    validateDate() {
      const errorMessage = validateDate(this.editedPlan.startDate, this.editedPlan.endDate)
      this.dateError = errorMessage
      return !errorMessage
    },
    handleSubmit() {
      if (this.validateDate()) {
        this.$emit('update', this.editedPlan)
      }
    },
    getCurrentDate() {
      return getCurrentDate()
    }
  },
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-md w-full">
      <h2 class="text-2xl font-bold mb-4">Editar Itinerario</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            id="name"
            v-model="editedPlan.name"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
        </div>
        <div class="mb-4">
          <label for="startDate" class="block text-sm font-medium text-gray-700">Fecha de inicio</label>
          <input
            id="startDate"
            v-model="editedPlan.startDate"
            type="date"
            required
            :min="getCurrentDate()"
            @change="validateDate()"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
          <p v-if="dateError" class="text-red-500 text-xs mt-1">{{ dateError }}</p>
        </div>
        <div class="mb-4">
          <label for="endDate" class="block text-sm font-medium text-gray-700">Fecha de fin</label>
          <input
            id="endDate"
            v-model="editedPlan.endDate"
            type="date"
            required
            :min="editedPlan.startDate || getCurrentDate()"
            @change="validateDate()"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
          <p v-if="dateError" class="text-red-500 text-xs mt-1">{{ dateError }}</p>
        </div>
        <div class="flex justify-end space-x-2">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
