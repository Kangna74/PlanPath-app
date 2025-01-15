<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold">
      Actividades para "{{ destination }}"
    </h2>

    <!-- Empty State -->
    <div v-if="activities.length === 0" class="text-gray-500 text-center py-4">
      Aún no has añadido ninguna actividad.
      <br />
      ¡Comienza a planificar!
    </div>

    <!-- Activity List -->
    <ul v-else class="space-y-4">
      <li v-for="(activity, index) in activities" :key="index" class="bg-white shadow rounded-lg p-4">
        <h3 class="font-semibold text-lg">{{ activity.name }}</h3>
        <p class="text-gray-600">{{ activity.date }} a las {{ activity.time }}</p>
        <p class="text-gray-600">Ubicación: {{ activity.location }}</p>
        <p v-if="activity.notes" class="mt-2 text-gray-700">
          <strong>Notas:</strong> {{ activity.notes }}
        </p>
      </li>
    </ul>

    <!-- Action Buttons -->
    <button
      @click="$emit('add-activity')"
      class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
    >
      Añadir Actividad
    </button>

    <!-- Navigation Buttons -->
    <div class="flex justify-between gap-4 mt-6">
      <button
        @click="$emit('navigate', 'back')"
        class="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
      >
        Volver
      </button>
      <button
        @click="$emit('navigate', 'next')"
        class="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
      >
        Siguiente: Ver Itinerario
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    destination: {
      type: String,
      default: 'País'
    },
    activities: {
      type: Array,
      default: () => []
    }
  },
  emits: ['add-activity', 'navigate']
}
</script>
