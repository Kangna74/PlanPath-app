<script>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    RouterView,
    NavBar
  }
}
</script>

<template>
  <div class="h-full bg-cyan-500"></div>
  <NavBar />
  <RouterView />
</template>
