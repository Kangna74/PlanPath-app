<template>
  <div class="relative mb-8">
    <input
      v-model="localSearchQuery"
      @input="updateSearchQuery"
      type="text"
      placeholder="Buscar planes..."
      class="z-10 w-full px-12 py-3 border border-[#d9d9d9] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-[#0b64ad]"
    />
    <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#828282] h-5 w-5" />
  </div>
</template>

<script>
import { Search } from 'lucide-vue-next'

export default {
  props: {
    modelValue: String,
  },
  components: {
    Search,
  },
  data() {
    return {
      localSearchQuery: this.modelValue,
    }
  },
  watch: {
    modelValue(newVal) {
      this.localSearchQuery = newVal
    },
  },
  methods: {
    updateSearchQuery(event) {
      this.$emit('update:modelValue', event.target.value)
    },
  },
}
</script>

<style>
/* Agrega tus estilos aquí */
</style>
