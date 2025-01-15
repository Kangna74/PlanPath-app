<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Itinerario del Plan</h1>
    <div v-if="plan">
      <h2 class="text-xl mb-2">{{ plan.destination }}</h2>
      <p class="text-gray-600 mb-4">{{ formatDateRange(plan.startDate, plan.endDate) }}</p>
      <h3 class="text-lg font-semibold mb-2">Actividades:</h3>
      <ul class="space-y-2">
        <li v-for="activity in plan.activities" :key="activity.id" class="bg-white shadow rounded-lg p-4">
          <h4 class="font-medium">{{ activity.name }}</h4>
          <p class="text-sm text-gray-600">{{ activity.date }} - {{ activity.time }}</p>
          <p class="text-sm text-gray-600">{{ activity.location }}</p>
        </li>
      </ul>
    </div>
    <div v-else class="text-center text-gray-600">
      Cargando itinerario...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { planService } from '../services/planService';

const route = useRoute();
const plan = ref(null);

onMounted(async () => {
  const planId = route.params.id;
  plan.value = await planService.getPlanById(planId);
});

const formatDateRange = (startDate, endDate) => {
  // Implementa la lógica de formateo de fechas aquí
  return `${startDate} - ${endDate}`;
};
</script>
