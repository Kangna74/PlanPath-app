<template>
  <main>

    <div class="bg-smpath w-screen h-96 bg-cover bg-center flex items-center justify-center sm:bg-path bg-no-repeat bg-center bg-cover">
      <h1 class="text-white text-5xl font-extrabold font-merienda">
        Encuentra el <span class="text-blue-300">Plan</span> perfecto para ti</h1>
    </div>

    <div class="flex justify-center w-3/4 mx-auto gap-2 m-10">
      <input type="text"
        class="w-3/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder=" Busca un plan" />
      <button class="w-1/6 bg-blue-500 text-white rounded-md hover:bg-white hover:text-blue-500 border border-blue-500">
        Buscar </button>
    </div>

  </main>
</template>

<script>

export default {
  name: 'HomeView',
  components: {},
};
</script>
