<template>
  <a :href="url" target="_blank" :aria-label="`Visítanos en ${name}`" class="text-2xl text-gray-800 hover:scale-110 hover:rotate-6 transition-transform duration-300 ease-in-out" :style="{ '--color-accent': colorAccent }">
    <component :is="iconComponent" />
  </a>
</template>

<script setup>
import { computed } from 'vue';
import { LinkedinIcon, TwitterIcon, YoutubeIcon } from 'lucide-vue-next';

const props = defineProps({
  url: String,
  name: String,
  colorAccent: String
});

const iconComponent = computed(() => {
  switch (props.name) {
    case 'linkedin':
      return LinkedinIcon;
    case 'twitter':
      return TwitterIcon;
    case 'youtube':
      return YoutubeIcon;
    default:
      return null;
  }
});
</script>

<style scoped>
a:hover {
  color: var(--color-accent);
}
</style>

