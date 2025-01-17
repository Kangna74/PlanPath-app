<script>

export default {
  name: 'HomeView',
  components: {},
};
</script>

<template>
  <main>

    <div class="bg-smpath w-screen h-96 bg-cover bg-center flex items-center justify-center sm:bg-path bg-no-repeat">
      <h1 class="text-white text-2xl md:text-4xl lg:text-5xl text-center font-extrabold font-merienda">
        Encuentra el <span class="text-blue-300">Plan</span> perfecto para ti</h1>
    </div>

    <div class="flex flex-col sm:flex-row gap-2 m-10 justify-center
    items-center">

      <input type="text"
        class="w-64 sm:w-2/4 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder=" Busca un plan" />

      <button
        class="w-24 sm:w-1/6 bg-blue-500 text-white rounded-full hover:bg-white hover:text-blue-500 border border-blue-500 p-2">
        Buscar </button>
    </div>

    <div>
      <h2 class="text-3xl font-bold text-blue-500 text-left m-10">Planes Populares</h2>
      <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-10 text-center">
        <li>Plan 1</li>
        <li>Plan 2</li>
        <li>Plan 3</li>
        <li>Plan 4</li>
        <li>Plan 5</li>
        <li>Plan 6</li>
      </ul>
    </div>

  </main>
</template>
