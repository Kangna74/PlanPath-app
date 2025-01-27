<script>
import { formatDateRange, filterByName } from '@/utils'
import { formatTime } from '@/utils'
import { viewPlan } from '@/router'
import { getAllPlans } from '@/utils/firescript'
import SearchBar from '@/components/SearchBar.vue'
import HomePlansItem from '@/components/HomePlansItem.vue'

export default {
  components: {
    SearchBar,
    HomePlansItem,
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
  async beforeMount() {
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
      class="bg-smpath w-screen min-h-96 bg-cover bg-center flex items-center justify-center sm:bg-path bg-no-repeat">
      <h1 class="text-white text-2xl md:text-4xl lg:text-5xl text-center font-extrabold font-merienda">
        Encuentra el <span class="text-blue-300">Plan</span> perfecto para ti
      </h1>
    </div>

    <SearchBar v-model="searchQuery" class=" mt-10 ml-8 mr-8" />

    <div class="flex flex-col items-center">
      <h2 class="text-3xl font-bold text-blue-500 text-left m-10">Planes Populares</h2>
      <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-10 text-left">
        <HomePlansItem v-for="plan in filteredPlans" :key="plan.id" :plan="plan" />
      </ul>
    </div>
  </div>
</template>
