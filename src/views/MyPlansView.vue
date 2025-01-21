<template>
  <div class="min-h-screen bg-[#fafafa]">
    <main class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-[#000000]">Mis Itinerarios</h1>
        <p class="text-[#828282]">{{ plans.length }} itinerarios</p>
      </div>

      <!-- Barra de búsqueda -->
      <div class="relative mb-8">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar itinerarios..."
          class="w-full px-12 py-3 border border-[#d9d9d9] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-[#0b64ad]"
        />
        <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#828282] h-5 w-5" />
      </div>

      <!-- Lista de planes -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-if="plans.length === 0" class="col-span-full text-center py-12">
          <p class="text-[#828282] mb-8">No tienes ningún itinerario creado</p>
          <button
            @click="createNewPlan"
            class="bg-[#0b64ad] text-white px-6 py-3 rounded-full hover:bg-[#0b64ad]/90 transition-colors"
          >
            Crear Itinerario
          </button>
        </div>

        <div
          v-else
          v-for="plan in filteredPlans"
          :key="plan.id"
          class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col justify-between"
        >
          <div>
            <div class="flex justify-between items-start mb-4">
              <div>
                <h2 class="text-xl font-semibold text-[#000000]">{{ plan.name }}</h2>
                <div class="flex items-center text-[#828282] text-sm mt-1">
                  <Calendar class="h-4 w-4 mr-1" />
                  <p>{{ formatDateRange(plan.startDate, plan.endDate) }}</p>
                </div>
              </div>
              <div class="flex space-x-2">
                <button @click="editPlan(plan)" class="text-[#0b64ad] hover:text-[#0b64ad]/80 transition-colors">
                  <Edit class="h-5 w-5" />
                </button>
                <button @click="deletePlan(plan.id)" class="text-[#828282] hover:text-[#812727] transition-colors">
                  <Trash2 class="h-5 w-5" />
                </button>
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
          </div>

          <button
            @click="viewPlan(plan.id)"
            class="bg-[#0b64ad] text-white px-6 py-2 rounded-full text-sm hover:bg-[#0b64ad]/90 transition-colors mt-auto"
          >
            Ver Itinerario
          </button>
        </div>
      </div>
    </main>

    <!-- Modal de edición -->
    <EditPlanModal
      v-if="editingPlan"
      :plan="editingPlan"
      @close="closeEditModal"
      @update="updatePlan"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Trash2, Calendar, Edit } from 'lucide-vue-next'
import { db } from '@/firebase'
import { collection, query, where, getDocs } from "firebase/firestore"
import { getCurrentUser } from 'vuefire'
import { planService } from '../services/planService'
import EditPlanModal from '../components/EditPlanModal.vue'

const router = useRouter()
const searchQuery = ref('')
const plans = ref([])
const editingPlan = ref(null)

const filteredPlans = computed(() => {
  return plans.value.filter(plan =>
    plan.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    plan.city.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const fetchPlans = async () => {
  const currentUser = await getCurrentUser()
  const q = query(collection(db, "plans"), where("userId", "==", currentUser.uid))
  const querySnapshot = await getDocs(q)
  plans.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
}

const createNewPlan = () => {
  router.push('/create')
}

const viewPlan = (planId) => {
  router.push({ name: 'Itinerary', params: { id: planId.toString() } })
  console.log('Ver itinerario', planId)
}

const deletePlan = async (planId) => {
  await planService.deletePlan(planId)
  plans.value = plans.value.filter(plan => plan.id !== planId)
}

const editPlan = (plan) => {
  editingPlan.value = { ...plan }
}

const closeEditModal = () => {
  editingPlan.value = null
}

const updatePlan = async (updatedPlan) => {
  await planService.updatePlan(updatedPlan)
  const index = plans.value.findIndex(p => p.id === updatedPlan.id)
  if (index !== -1) {
    plans.value[index] = updatedPlan
  }
  closeEditModal()
}

const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const options = { day: 'numeric', month: 'short' }
  return `${start.toLocaleDateString('es-ES', options)} - ${end.toLocaleDateString('es-ES', options)}, ${end.getFullYear()}`
}

const formatTime = (date, time) => {
  return `${time}`
}

onMounted(() => {
  fetchPlans()
})
</script>

