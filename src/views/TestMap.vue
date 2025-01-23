<template>
  <div class="test">
    <SearchMap @update-coords="handleUpdateCoords" />
    <p>Coordenadas seleccionadas: {{ selectedCoords }}</p>
    <ViewMap :coords="selectedCoords" />
  </div>
</template>

<script>
import SearchMap from '@/components/SearchMap.vue';
import ViewMap from '@/components/ViewMap.vue';

export default {
  name: 'ParentComponent',
  components: {
    SearchMap,
    ViewMap
  },
  data() {
    return {
      selectedCoords: [-99.1332, 19.4326]
    };
  },
  methods: {
    handleUpdateCoords(coords) {
      this.selectedCoords = coords;
    }
  }
};
</script>

<style>
.test {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
/* Agrega tus estilos aquí */
</style>
