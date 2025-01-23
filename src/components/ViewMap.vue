<template>
  <div @click="goToMaps()" class="test">
    <MapboxMap
    :style="{ width: width, height: height }"
    :access-token="accessToken"
      :map-style="mapStyle"
      :center="coords"
      :zoom="zoom"
      :interactive="false"
    >
      <MapboxMarker :lng-lat="coords" />
    </MapboxMap>
  </div>
</template>

<script>
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css';

export default {
  name: 'ViewMap',
  components: {
    MapboxMap,
    MapboxMarker
  },
  props: {
    coords: {
      type: Array,
      required: true
    },
    width: {
      type: String,
      default: '800px'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      accessToken: import.meta.env.VITE_MAPBOX_API_KEY,
      mapStyle: 'mapbox://styles/mapbox/streets-v11',
      zoom: 7,
    };
  },
  methods: {
    goToMaps() {
      const [lng, lat] = this.coords;
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      window.open(url, '_blank');
    }
  }
};
</script>

<style>
.bton {
  background-color: #4a32d4;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

</style>
