<script>
import { formatDateRange, filterByName } from '@/utils'
import { formatTime } from '@/utils'
import { viewPlan } from '@/router'
import { getAllPlans } from '@/utils/firescript'
import SearchBar from '@/components/SearchBar.vue'
import HomePlansItem from '@/components/HomePlansItem.vue'
import Breadcrumbs from '@/components/BreadCrumbs.vue'

export default {
  components: {
    SearchBar,
    HomePlansItem,
    Breadcrumbs,
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
    createNewPlan() {
      this.$router.push('/create') // Navega a la página de creación de un plan
    },
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
      class="bg-smpath w-screen min-h-96 bg-cover bg-center flex items-center justify-center sm:bg-path bg-no-repeat"
    >
      <h1
        class="text-white text-2xl md:text-4xl lg:text-5xl text-center font-extrabold font-merienda"
      >
        Bienvenido a PlanPath
      </h1>
    </div>
    <div class="mt-4">
      <Breadcrumbs class="m-5" />
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <SearchBar v-model="searchQuery" />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <HomePlansItem
          v-for="plan in filteredPlans"
          :key="plan.id"
          :plan="plan"
          @viewPlan="viewPlan"
        />
      </div>
    </div>
    <button
      @click="createNewPlan"
      class="fixed bottom-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-[#0b64ad]/90 transition-colors shadow-lg"
    >
      Crear Nuevo Plan
    </button>
  </div>
  </div>
</template>
