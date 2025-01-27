<script>
import { RouterLink } from 'vue-router'
import IconBurger from './icons/IconBurger.vue'
import IconX from './icons/IconX.vue'
import IconMiniPP from './icons/IconMiniPP.vue'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'

export default {
  name: 'NavBar',
  components: {
    RouterLink,
    IconBurger,
    IconX,
    IconMiniPP,
  },
  data() {
    return {
      isOpen: false,
      showNavBar: true,
      lastScrollPosition: 0,
    }
  },
  props: {
    isSmallScreen: Boolean,
    userIsLoged: Boolean,
  },
  methods: {
    navigateTo(route) {
      this.$router.push({ name: route })
      this.isOpen = false
    },
    onScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 0) {
        return
      }
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return
      }
      this.showNavBar = currentScrollPosition < this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
      this.isOpen = false
    },
    cerrarSesion() {
      signOut(auth)
        .then(() => {
          this.$router.push('/login')
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  },
}
</script>

<template>
  <header
    :class="[
      'bg-blue-100 text-white border-b-2 border-blue-500 w-full transition-all duration-100 ease-out',
      isSmallScreen ? (showNavBar ? 'fixed translate-y-0' : 'fixed -translate-y-full') : 'relative',
    ]"
  >
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-2">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <RouterLink to="/">
            <IconMiniPP class="h-8" />
          </RouterLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-4 text-lg">
          <RouterLink to="/" class="text-blue-500 hover:bg-gray-100 hover: rounded-md"
            >Inicio</RouterLink
          >
          <RouterLink to="/myplans" class="text-blue-500 hover:bg-gray-100 hover: rounded-md"
            >Mis Planes</RouterLink
          >
          <RouterLink to="/create" class="text-blue-500 hover:bg-gray-100 hover: rounded-md"
            >Crear</RouterLink
          >

          <RouterLink
            v-if="!userIsLoged"
            to="/login"
            class="text-blue-500 hover:bg-gray-100 hover: rounded-md"
            >Entrar
          </RouterLink>
          <button
            v-else
            @click="cerrarSesion()"
            class="text-blue-500 hover:bg-gray-100 hover: rounded-md"
          >
            Salir
          </button>
        </nav>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="isOpen = !isOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <IconBurger v-if="!isOpen" class="block h-6 w-6" />
            <IconX v-else class="block h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div v-if="isOpen" class="md:hidden z-10 absolute right-2 mt-2 bg-white rounded-lg shadow-lg">
      <div class="flex flex-col p-4 space-y-4 text-lg">
        <button
          class="text-blue-500 hover:bg-gray-100 hover: rounded-md"
          @click="navigateTo('Home')"
        >
          Inicio
        </button>
        <button
          class="text-blue-500 hover:bg-gray-100 hover: rounded-md"
          @click="navigateTo('MyPlans')"
        >
          Mis Planes
        </button>
        <button
          class="text-blue-500 hover:bg-gray-100 hover: rounded-md"
          @click="navigateTo('Create')"
        >
          Crear
        </button>
        <button
          v-if="!userIsLoged"
          class="text-blue-500 hover:bg-gray-100 hover: rounded-md"
          @click="navigateTo('LogIn')"
        >
          Entrar
        </button>
        <button
          v-else
          @click="cerrarSesion()"
          class="text-blue-500 hover:bg-gray-100 hover: rounded-md"
        >
          Salir
        </button>
      </div>
    </div>
  </header>
</template>

<style></style>
