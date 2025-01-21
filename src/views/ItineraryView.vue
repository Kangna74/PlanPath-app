<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { planService } from '../services/planService';
import { Calendar, MapPin, ArrowLeft} from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const plan = ref(null);

onMounted(async () => {
  const planId = route.params.id;
  plan.value = await planService.getPlanById(planId);
});

const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return `${start.toLocaleDateString('es-ES', options)} - ${end.toLocaleDateString('es-ES', options)}`;
};

const formatDateTime = (date, time) => {
  const dateObj = new Date(`${date}T${time}`);
  const options = { weekday: 'long', hour: 'numeric', minute: 'numeric' };
  return dateObj.toLocaleDateString('es-ES', options);
};

const goBack = () => {
  router.push('/my-plans');
};
</script>

<template>
  <div class="min-h-screen bg-[#fafafa]">
    <main class="container mx-auto px-4 py-8">
      <div v-if="plan" class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold text-[#000000]">{{ plan.name }}</h1>
          <button @click="goBack" class="text-[#0b64ad] hover:text-[#094a80] transition-colors">
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
            class="bg-gray-50 rounded-lg p-4"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-medium text-[#000000]">{{ activity.name }}</h3>
                <p class="text-sm text-[#828282]">
                  {{ formatDateTime(activity.date, activity.time) }}
                </p>
              </div>
              <div class="flex items-center">
                <MapPin class="h-5 w-5 text-[#0b64ad] mr-1" />
                <p class="text-sm text-[#828282]">{{ activity.location }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>


