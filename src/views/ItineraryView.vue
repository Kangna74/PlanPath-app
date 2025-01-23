<script setup>
import { ref, onMounted } from 'vue';
import { Calendar, MapPin, ArrowLeft} from 'lucide-vue-next';
import { getPlanById } from '@/firescript';
import router from '@/router'
import { useRoute } from 'vue-router'
import { formatDateRange, formatDateTime } from '@/utils/script';

const route = useRoute();
const plan = ref(null);

onMounted(async () => {
  const planId = route.params.id;
  try {
    plan.value = await getPlanById(planId);
  } catch (error) {
    console.error('Error al obtener el itinerario', error);
  }
});

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="min-h-screen bg-[#fafafa]">
    <main class="container mx-auto px-4 py-8">
      <div v-if="plan" class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold text-[#000000]">{{ plan.name }}</h1>
          <button @click="goBack" class="text-blue-500 hover:text-[#094a80] transition-colors">
            <ArrowLeft class="h-6 w-6" />
          </button>
        </div>
        <div class="flex items-center text-[#828282] text-sm mb-6">
          <Calendar class="h-5 w-5 mr-2" />
          <p>{{ formatDateRange(plan.startDate, plan.endDate) }}</p>
        </div>
        <h2 class="text-xl font-semibold mb-4">Tus Actividades:</h2>
        <ul class="space-y-4">
          <li
            v-for="activity in plan.activities"
            :key="activity.id"
            class="bg-gray-50 rounded-lg p-6"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-medium text-[#000000]">{{ activity.name }}</h3>
                <p class="text-sm text-gray-500">
                  {{ formatDateTime(activity.date, activity.time) }}
                </p>
                <p v-if="activity.notes" class="text-xs text-gray-600 mt-2"><strong>Notas: </strong> {{ activity.notes }}</p>
              </div>
              <div class="flex flex-col items-start ml-auto">
                <div class="flex items-center mb-2">
                  <MapPin class="h-5 w-5 text-blue-500 mr-1" />
                  <p class="text-sm text-gray-500">{{ activity.location }}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>


