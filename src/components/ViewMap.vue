<template>
  <div class="test">
    <MapboxMap
      style="width: 800px; height: 300px;"
      :access-token="accessToken"
      :map-style="mapStyle"
      :center="coords"
      :zoom="zoom"
      :interactive="false"
    >
      <MapboxNavigationControl position="bottom-right" />
      <MapboxMarker :lng-lat="coords" />
    </MapboxMap>

    <button class="bton" @click="goToMaps()" >Google Maps</button>
  </div>
</template>

<script>
import { MapboxMap, MapboxMarker, MapboxNavigationControl } from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css';

export default {
  name: 'ViewMap',
  components: {
    MapboxMap,
    MapboxNavigationControl,
    MapboxMarker
  },
  props: {
    coords: {
      type: Array,
      required: true
    },
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
