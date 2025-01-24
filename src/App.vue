<script>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'

export default {
  components: {
    RouterView,
    NavBar,
  },
  data() {
    return {
      isSmallScreen: false,
      userIsLoged: false,
    }
  },
  methods: {
    updateScreenSize() {
      this.isSmallScreen = window.innerWidth < 768 // Matches Tailwind's `md` breakpoint
    },
    reloadNavBar() {
      this.$forceUpdate()
    },
  },
  mounted() {
    window.addEventListener('resize', this.updateScreenSize)
    this.updateScreenSize()

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        this.userIsLoged = false
      } else {
        this.$router.push({ name: 'Home' })
        this.userIsLoged = true
      }
      this.reloadNavBar()
    })
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateScreenSize)
  },
}
</script>

<template>
  <NavBar :isSmallScreen="isSmallScreen" :userIsLoged="userIsLoged" class="z-20" />
  <main :class="isSmallScreen ? 'pt-16' : 'pt-0'">
    <RouterView />
  </main>
</template>
