<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <img class="h-8 w-8"
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nfsn.PNG-c3iREhsXrENjrRZV22mY1jLxz2Kr0E.png"
            alt="Logo">
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-4">
          <RouterLink to="/" class="text-gray-900 hover:text-gray-900">Inicio</RouterLink>
          <RouterLink to="/my-plans" class="text-gray-900 hover:text-gray-900">Mis Planes</RouterLink>
          <RouterLink to="/create" class="text-gray-900 hover:text-gray-900">Crear</RouterLink>
          <RouterLink to="/new-activity" class="text-gray-900 hover:text-gray-900">Nuevo</RouterLink>
        </nav>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <!-- <button @click="isOpen = !isOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!isOpen" class="block h-6 w-6" />
            <XIcon v-else class="block h-6 w-6" />
          </button> -->
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <!-- <div v-if="isOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a></a>
      </div>
    </div> -->
  </header>
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
</script>
