<template>
  <footer class="bg-gradient-to-r from-white/60 via-gray-200/50 to-gray-300/50 text-gray-800 py-5 font-roboto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center pb-5 border-b border-gray-400">
        <div class="footer-logo text-2xl font-bold font-merienda mb-4 md:mb-0">
          <a href="#" @click.prevent="scrollToTop" class="no-underline">PlanPath</a>
        </div>

        <nav class="footer-nav flex flex-wrap justify-center gap-4 mb-4 md:mb-0">
          <a href="#" @click.prevent="scrollToTop" class="text-gray-800 hover:text-black hover:shadow-sm transition duration-300">Inicio</a>
          <a href="#about-us" class="text-gray-800 hover:text-black hover:shadow-sm transition duration-300">Sobre Nosotros</a>
          <a href="mailto:planpath2024@gmail.com" class="text-gray-800 hover:text-black hover:shadow-sm transition duration-300">Contáctanos</a>
          <a href="#" class="text-gray-800 hover:text-black hover:shadow-sm transition duration-300">Legal</a>
        </nav>

        <div class="footer-social flex gap-4">
          <SocialLink v-for="social in socialMedias" :key="social.name" v-bind="social" />
        </div>
      </div>

      <div class="footer-bottom text-center text-sm text-gray-500 mt-4">
        <p>© 2025 Plan Path. Todos los derechos reservados.</p>
        <button
          @click="scrollToTop"
          class="inline-block mt-2 bg-transparent border-none cursor-pointer"
          aria-label="Volver arriba"
        >
          <ArrowUpIcon class="w-6 h-6 text-gray-400 hover:text-gray-600 hover:scale-125 transition-all duration-300" />
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import SocialLink from './SocialLink.vue';
import { ArrowUpIcon } from 'lucide-vue-next';

const socialMedias = ref([
  {
    url: "#",
    name: "linkedin",
    colorAccent: "#0077b5"
  },
  {
    url: "https://x.com/PathPlan_",
    name: "twitter",
    colorAccent: "black"
  },
  {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    name: "youtube",
    colorAccent: "#f00"
  }
]);

const scrollToTop = (event) => {
  // Si el evento viene de un clic en un enlace, prevenimos el comportamiento por defecto
  if (event && event.preventDefault) {
    event.preventDefault();
  }

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>

