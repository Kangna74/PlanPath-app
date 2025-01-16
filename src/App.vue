<script>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'

export default {
  components: {
    RouterView,
    NavBar,
  },
  data() {
    return {
      isOpen: false,
    }
  },
}
</script>

<template>
  <NavBar />
  <RouterView />
</template>
