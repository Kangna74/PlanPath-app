<template>
  <main>

    <div class="flex justify-center w-3/4 mx-auto gap-2">
      <input type="text"
        class="w-3/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder=" Busca un plan" />
      <button class="w-1/6 bg-blue-500 text-white rounded-md hover:bg-white hover:text-blue-500 border border-blue-500">
        Buscar </button>

    </div>
    <DestinyItem />
  </main>
</template>

<script>
import DestinyItem from '@/components/DestinyItem.vue';
import IconLogoPP from '@/components/icons/IconLogoPP.vue';

export default {
  name: 'HomeView',
  components: {
    IconLogoPP,
    DestinyItem,
  },
};
</script>
