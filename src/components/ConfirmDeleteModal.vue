<script>
export default {
  name: 'ConfirmDeleteModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    plan: {
      type: Object,
      default: null,
    },
  },
  methods: {
    confirmDelete() {
      if (this.plan && this.plan.id) {
        this.$emit('confirm', this.plan.id)
      }
    },
  },
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-8 max-w-md w-full">
      <h2 class="text-2xl font-bold mb-4">¿Estás seguro?</h2>
      <p class="text-gray-600">
        ¿Quieres eliminar <strong>"{{ plan.name }}"</strong>
      </p>
      <div class="flex justify-end space-x-2 mt-6">
        <button
          type="button"
          @click="$emit('close')"
          class="px-4 py-2 border border-gray-300 shadow-lg shadow-gray-200/50 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancelar
        </button>
        <button
          type="button"
          @click="confirmDelete"
          class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 shadow-lg shadow-red-500/50 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>
