<template>
  <div class="test">
    <MapboxMap
      :style="{ width: width, height: height }"
      :access-token="accessToken"
      :map-style="mapStyle"
      :center="center"
      :zoom="zoom"
      :interactive="true"
    >
      <MapboxGeocoder
        :countries="'ES'"
        :language="'es'"
        :types="'address'"
        style="width: 400px"
        @mb-result="onGeocoderResult"
      />
      <MapboxMarker :lng-lat="center" />
    </MapboxMap>
  </div>
</template>

<script>
import { MapboxMap, MapboxGeocoder, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css'

export default {
  name: 'SearchMap',
  components: {
    MapboxMap,
    MapboxGeocoder,
    MapboxMarker,
  },
  props: {
    coords: {
      type: Array,
      default: () => [-99.1332, 19.4326],
    },
    width: {
      type: String,
      default: '800px',
    },
    height: {
      type: String,
      default: '300px',
    },
  },
  data() {
    return {
      accessToken: import.meta.env.VITE_MAPBOX_API_KEY,
      mapStyle: 'mapbox://styles/mapbox/streets-v11',
      center: this.coords,
      zoom: 7,
      searchedAddress: '',
    }
  },
  methods: {
    onGeocoderResult(event) {
      const coordinates = event.result.geometry.coordinates
      console.error('SearchMap, onGeocoderResult, coordinates:', coordinates)
      this.$emit('update-coords', coordinates)
    },
  },
}
</script>

<style>
/* Agrega tus estilos aquí */
</style>
