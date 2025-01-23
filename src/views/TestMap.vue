<template>
  <div class="test1">
    <SearchMap @update-coords="handleUpdateCoords" :width='width1' :height="width1" />
    <p>Coordenadas seleccionadas: {{ selectedCoords }}</p>
    <ViewMap :coords="selectedCoords" :width='width1' :height="width1" />
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
      selectedCoords: [-99.1332, 19.4326],
      width1: '800px'
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
.test1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
/* Agrega tus estilos aquí */
</style>
