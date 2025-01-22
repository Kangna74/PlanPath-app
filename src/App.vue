<script>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import {onAuthStateChanged } from "firebase/auth";
import { auth } from '@/firebase';
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

        onAuthStateChanged(auth, (user) => {
      if (!user) {
        //TODO: Redirigir a la página de inicio
        //this.$router.push({ name: 'home' });
      }
    });
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
