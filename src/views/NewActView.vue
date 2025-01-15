<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg w-full max-w-md p-6">
      <!-- Header -->
      <div class="flex mb-6">
        <h2 class="text-xl font-semibold">Añadir Nueva Actividad</h2>
        <IconX class="h-8 w-8 ml-auto" @click="close" />
      </div>

      <!-- Form -->
      <form @submit.prevent="submitActivity" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Nombre de la Actividad
          </label>
          <input v-model="activity.name" type="text" required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Fecha
          </label>
          <input v-model="activity.date" type="date" required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Selecciona una fecha" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Hora
          </label>
          <input v-model="activity.time" type="time" required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Ubicación
          </label>
          <input v-model="activity.location" type="text" required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Notas (opcional)
          </label>
          <textarea v-model="activity.notes" rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"></textarea>
        </div>

        <button type="submit"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200">
          Añadir Actividad
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import IconX from '@/components/icons/IconX.vue';

export default {
  components: {
    IconX,
  },
  data() {
    return {
      activity: {
        name: '',
        date: '',
        time: '',
        location: '',
        notes: ''
      }
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    submitActivity() {
      this.$emit('add-activity', { ...this.activity });
      this.close();
    }
  }
}
</script>
