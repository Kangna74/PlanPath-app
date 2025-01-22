<template>
  <div class="min-h-screen bg-white p-4">
    <div class="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg">
      <h1 class="mb-8 text-center text-3xl font-bold">Gestión de Planes</h1>

      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Buscar Plan</h2>
        <input v-model="searchQuery" type="text" placeholder="Buscar por nombre" class="mb-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
      </div>

      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Agregar Plan</h2>
        <form @submit.prevent="handleAddPlan">
          <div class="mb-4">
            <label for="destination" class="block text-sm font-medium text-gray-700">Destino</label>
            <input v-model="newPlan.destination" type="text" id="destination" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
          </div>
          <div class="mb-4">
            <label for="startDate" class="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
            <input v-model="newPlan.startDate" type="date" id="startDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
          </div>
          <div class="mb-4">
            <label for="endDate" class="block text-sm font-medium text-gray-700">Fecha de Fin</label>
            <input v-model="newPlan.endDate" type="date" id="endDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
          </div>
          <button type="submit" class="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600">Agregar Plan</button>
        </form>
      </div>

      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Planes Existentes</h2>
        <ul>
          <li v-for="plan in plans" :key="plan.id" class="mb-4 p-4 bg-gray-100 rounded-md shadow-sm">
            <div class="flex justify-between items-center">
              <div>
                <h1 class="text-lg font-bold">{{ plan.name }}</h1>
                <h3 class="text-lg font-bold">{{ plan.id }}</h3>
                <p>{{ plan.startDate }} - {{ plan.endDate }}</p>
              </div>
              <div>
                <button @click="handleDeletePlan(plan.id)" class="text-red-500 hover:text-red-700">Eliminar</button>
                <button @click="handleUpdatePlan(plan)" class="ml-4 text-blue-500 hover:text-blue-700">Actualizar</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { getAllPlans, postPlan, deletePlan, updatePlan, getPlanByName } from '@/firescript';

export default {
  setup() {
    const plans = ref([]);
    const newPlan = ref({
      destination: '',
      startDate: '',
      endDate: ''
    });
    const searchQuery = ref('');

    const fetchPlans = async () => {
      plans.value = await getAllPlans();
    };

    const handleAddPlan = async () => {
      await postPlan(newPlan.value);
      newPlan.value = { destination: '', startDate: '', endDate: '' };
      fetchPlans();
    };

    const handleDeletePlan = async (id) => {
      await deletePlan(id);
      fetchPlans();
    };

    const handleUpdatePlan = async (plan) => {
      const updatedPlan = { ...plan, actualizado: true };
      await updatePlan(updatedPlan);
      fetchPlans();
    };

    const searchPlans = async (name) => {

      try{
        plans.value = await getPlanByName(name)
      }
      catch(error) {
        console.log(error);
      }

    };

    watch(searchQuery, (newQuery) => {

      if (newQuery) {
        searchPlans(newQuery);
      } else {
        fetchPlans();
      }
    });

    onMounted(fetchPlans);

    return {
      plans,
      newPlan,
      searchQuery,
      handleAddPlan,
      handleDeletePlan,
      handleUpdatePlan
    };
  }
};
</script>

<style>
/* Agrega tus estilos aquí */
</style>
