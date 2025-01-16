<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <IconMiniPP class="h-8 w-8" />
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-4">
          <RouterLink to="/" class="text-gray-900 hover:text-gray-900">Inicio</RouterLink>
          <RouterLink to="/my-plans" class="text-gray-900 hover:text-gray-900">Mis Planes</RouterLink>
          <RouterLink to="/create" class="text-gray-900 hover:text-gray-900">Crear</RouterLink>
          <RouterLink to="/new-activity" class="text-gray-900 hover:text-gray-900">Nuevo</RouterLink>
          <RouterLink to="/login" class="text-gray-900 hover:text-gray-900">Login</RouterLink>
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
    <div v-if="isOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 sm:px-3 flex flex-col gap-3 items-end bg-gray-100">

        <RouterLink to="/" class="text-gray-900 hover:text-gray-900">Inicio</RouterLink>
        <RouterLink to="/my-plans" class="text-gray-900 hover:text-gray-900">Mis Planes</RouterLink>
        <RouterLink to="/create" class="text-gray-900 hover:text-gray-900">Crear</RouterLink>
        <RouterLink to="/new-activity" class="text-gray-900 hover:text-gray-900">Nuevo</RouterLink>

      </div>
    </div>
  </header>
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import IconBurger from './components/icons/IconBurger.vue';
import IconX from './components/icons/IconX.vue';
import IconMiniPP from './components/icons/IconMiniPP.vue';

export default {
  components: {
    RouterLink,
    RouterView,
    IconBurger,
    IconX,
    IconMiniPP,
  },
  data() {
    return {
      isOpen: false
    }
  }
}
</script>
