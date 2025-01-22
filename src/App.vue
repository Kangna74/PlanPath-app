<script>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    RouterView,
    NavBar
  },
  data() {
    return {
      isSmallScreen: false,
    }
  },
  methods: {
    updateScreenSize() {
      this.isSmallScreen = window.innerWidth < 768; // Matches Tailwind's `md` breakpoint
    },
  },
  mounted() {
    window.addEventListener("resize", this.updateScreenSize);
    this.updateScreenSize();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateScreenSize);
  }
}

</script>

<template>
  <NavBar :isSmallScreen="isSmallScreen" class="z-20" />
  <main :class="isSmallScreen ? 'pt-16' : 'pt-0'">
    <RouterView />
  </main>

</template>
