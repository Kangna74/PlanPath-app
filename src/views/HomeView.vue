<template>
  <main>
    <IconLogoPP class="flex justify-center w-3/4 mx-auto mt-10 mb-10" />

    <div class="flex justify-center w-3/4 mx-auto gap-2">
      <input type="text"
        class="w-3/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder=" Busca un plan" />
      <button class="w-1/4 bg-blue-500 text-white rounded-md"> Buscar </button>

    </div>

  </main>
</template>

<script>
import IconLogoPP from '@/components/icons/IconLogoPP.vue';

export default {
  name: 'HomeView',
  components: {
    IconLogoPP,
  },
};
</script>
