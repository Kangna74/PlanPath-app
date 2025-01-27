<template>
  <div class="planes bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col justify-between">
    <div class="flex justify-between items-start mb-4">
      <div>
        <img v-if="plan.image" :src="plan.image" alt="" class="w-40 h-40 object-cover rounded-lg mb-4">
        <img v-else src="/img/placeholderimg.webp" class="h-40 w-40 rounded-lg mb-4">
        <h2 class="text-xl font-semibold text-[#000000]">{{ plan.name }}</h2>
        <div class="flex items-center text-[#828282] text-sm mt-1">
          <MapPinIcon class="h-4 w-4 mr-1" />
          <p>{{ plan.ubication }}</p>
        </div>
        <div class="flex items-center text-[#828282] text-sm mt-1">
          <Calendar class="h-4 w-4 mr-1" />
          <p>{{ formatDateRange(plan.startDate, plan.endDate) }}</p>
        </div>
      </div>
    </div>
    <div class="mb-4">
      <h3 class="font-medium text-[#000000] mb-2">
        {{ plan.activities.length }} actividades planificadas
      </h3>
      <ul class="space-y-2">
        <li v-for="(activity, index) in plan.activities.slice(0, 2)" :key="index" class="text-[#828282] text-sm">
          {{ activity.name }} - {{ formatTime(activity.date, activity.time) }}
        </li>
        <li v-if="plan.activities.length > 2" class="text-[#4d4949] text-sm font-medium">
          Y {{ plan.activities.length - 2 }} actividades más...
        </li>
      </ul>
    </div>
    <button @click="viewPlan(plan.id)"
      class="bg-blue-500 shadow-lg shadow-blue-500/50 text-white px-6 py-2 rounded-full text-sm hover:bg-blue-600/90 transition-colors mt-auto">
      Revisar Itinerario
    </button>
  </div>
</template>

<script>
import { viewPlan } from '@/router';
import { formatDateRange, formatTime } from '@/utils';
import { Calendar } from 'lucide-vue-next';
import { MapPinIcon } from 'lucide-vue-next';

export default {
  props: {
    plan: {
      type: Object,
      required: true,
    },
  },
  components: {
    Calendar,
    MapPinIcon,
  },
  methods: {
    formatDateRange,
    formatTime,
    viewPlan,
  },
}
</script>
