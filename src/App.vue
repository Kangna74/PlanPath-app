
<script>
import { RouterLink, RouterView } from 'vue-router'
import IconBurger from './components/icons/IconBurger.vue';
import IconX from './components/icons/IconX.vue';
import IconLogoPPSmall from './components/icons/IconLogoPPSmall.vue';

export default {
  components: {
    RouterLink,
    RouterView,
    IconBurger,
    IconX,
    IconLogoPPSmall
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    navigateto(route) {
      this.$router.push({ name: route });
      this.isOpen = false;
    }
  }
}
</script>

<template>
  <header class="bg-blue-100/25 text-white border-b-2 border-blue-500">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-2">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <IconLogoPPSmall class="h-8" />
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-4 text-lg">
          <RouterLink to="/" class="text-blue-500 hover:bg-gray-100 hover: rounded-md">Inicio</RouterLink>
          <RouterLink to="/my-plans" class="text-blue-500 hover:bg-gray-100 hover: rounded-md">Mis Planes</RouterLink>
          <RouterLink to="/create" class="text-blue-500 hover:bg-gray-100 hover: rounded-md">Crear</RouterLink>
          <!-- <RouterLink to="/login" class="text-blue-500 hover:bg-gray-100 hover: rounded-md">Entrar</RouterLink> -->
        </nav>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button @click="isOpen = !isOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-expanded="false">
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

        <button class="text-blue-500 hover:bg-gray-100 hover: rounded-md" @click="navigateto('Home')">Inicio</button>

        <button class="text-blue-500 hover:bg-gray-100 hover: rounded-md" @click="navigateto('MyPlans')">Mis Planes</button>

        <button class="text-blue-500 hover:bg-gray-100 hover: rounded-md" @click="navigateto('Create')">Crear</button>
        <!-- <button class="text-blue-500 hover:bg-gray-100 hover: rounded-md" @click="navigateto('LogIn')">Entrar</button> -->


        <!-- <RouterLink to="/" class="text-blue-500 hover:bg-gray-100 hover: rounded-md">
          Inicio</RouterLink>
        <RouterLink to="/my-plans" class="text-blue-500 hover:bg-gray-100 hover: rounded-md">Mis Planes</RouterLink>
        <RouterLink to="/create" class="text-blue-500 hover:bg-gray-100 hover: rounded-md">Crear</RouterLink> -->
      </div>
    </div>
  </header>
  <RouterView />
</template>
}
