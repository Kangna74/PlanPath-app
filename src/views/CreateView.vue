<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-8">
        Comienza tu aventura
      </h1>

      <!-- Progress Icons -->
      <div class="flex justify-between items-center mb-8 px-8">
        <div class="flex flex-col items-center">
          <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mb-2">
            <!-- <MapIcon class="w-5 h-5 text-white" /> -->
          </div>
          <span class="text-sm text-blue-500">Planificar</span>
        </div>

        <div class="flex flex-col items-center">
          <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mb-2">
            <!-- <CalendarIcon class="w-5 h-5 text-white" /> -->
          </div>
          <span class="text-sm text-blue-500">Actividades</span>
        </div>

        <div class="flex flex-col items-center">
          <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mb-2">
            <!-- <EyeIcon class="w-5 h-5 text-white" /> -->
          </div>
          <span class="text-sm text-blue-500">Visualizar</span>
        </div>
      </div>

      <!-- Form -->
      <DestinyItem />
      <ActivityItem />
      <PlanSummary />
    </div>
  </div>
</template>

<script setup>

import DestinyItem from '@/components/DestinyItem.vue'
import ActivityItem from '@/components/ActivityItem.vue'
import PlanSummary from '@/components/PlanSummary.vue'


// import { ref } from 'vue'
// import { MapIcon, CalendarIcon, EyeIcon } from 'lucide-vue-next'

// const destination = ref('')
// const dates = ref('')

// const handleSubmit = () => {
//   // Handle form submission
//   console.log({
//     destination: destination.value,
//     dates: dates.value
//   })
// }
</script>
