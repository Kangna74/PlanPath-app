<script>
import { formatDateRange, filterByName } from '@/utils'
import { formatTime } from '@/utils'
import { viewPlan } from '@/router'
import { Calendar } from 'lucide-vue-next'
import { getAllPlans } from '@/utils/firescript'
import { MapPinIcon } from 'lucide-vue-next'

export default {
  components: {
    Calendar,
  },
  data() {
    return {
      plans: [],
      searchQuery: '',
      filteredPlans: [],
    }
  },
  methods: {
    formatDateRange,
    formatTime,
    viewPlan,
    getAllPlans,
    filterByName,
  },
  async mounted() {
    try {
      this.plans = await getAllPlans()
      this.filteredPlans = this.plans // Inicializa filteredPlans con todos los planes
    } catch (error) {
      console.log(error)
    }
  },
  watch: {
    searchQuery(newQuery) {
      this.filteredPlans = filterByName(this.plans, newQuery)
    },
  },
}
</script>

<template>
  <div class="cursor-default">
    <div
      class="bg-smpath w-screen min-h-96 bg-cover bg-center flex items-center justify-center sm:bg-path bg-no-repeat"
    >
      <h1
        class="text-white text-2xl md:text-4xl lg:text-5xl text-center font-extrabold font-merienda"
      >
        Encuentra el <span class="text-blue-300">Plan</span> perfecto para ti
      </h1>
    </div>

    <div class="flex flex-col sm:flex-row gap-2 m-10 justify-center items-center">
      <input
        v-model="searchQuery"
        type="text"
        class="w-64 sm:w-2/4 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Busca un plan"
      />
    </div>

    <div>
      <h2 class="text-3xl font-bold text-blue-500 text-left m-10">Planes Populares</h2>
      <ul
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-10 text-left"
      >
        <div
          v-for="plan in filteredPlans"
          :key="plan.name"
          class="planes bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col justify-between"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
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
              <li
                v-for="(activity, index) in plan.activities.slice(0, 2)"
                :key="index"
                class="text-[#828282] text-sm"
              >
                {{ activity.name }} - {{ formatTime(activity.date, activity.time) }}
              </li>
              <li v-if="plan.activities.length > 2" class="text-[#4d4949] text-sm font-medium">
                Y {{ plan.activities.length - 2 }} actividades más...
              </li>
            </ul>
          </div>
          <button
            @click="viewPlan(plan.id)"
            class="bg-blue-500 shadow-lg shadow-blue-500/50 text-white px-6 py-2 rounded-full text-sm hover:bg-blue-600/90 transition-colors mt-auto"
          >
            Revisar Itinerario
          </button>
        </div>
      </ul>
    </div>
  </div>
</template>
<style>
/* Agrega tus estilos aquí */
</style>
