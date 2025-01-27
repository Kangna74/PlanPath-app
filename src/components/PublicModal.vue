<script>
export default {
  props: {
    isOpen: Boolean,
    activity: Object,
  },

  emits: ['close', 'update'],

  methods: {
    update() {
      this.$emit('confirm')
    },

    close() {
      this.$emit('close')
    },
  },
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="fixed inset-0 bg-black bg-opacity-50" @click="close"></div>
    <div class="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
      <h2 class="text-xl font-bold mb-4">Cambio de privacidad</h2>
      <div>
        <p class="block text-sm font-medium text-gray-700">¿Quieres hacer público este plan?</p>
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
          type="button"
          @click="update"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 shadow-lg shadow-blue-600/50 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>
