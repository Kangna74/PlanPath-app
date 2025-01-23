

<script setup>
import { ref, watch, onMounted } from 'vue'
import router from '@/router'
import { SearchIcon, TrashIcon, CalendarIcon, EditIcon, PlusCircleIcon } from 'lucide-vue-next'
import EditPlanModal from '../components/EditPlanModal.vue'
import { getPlansByActualUser, deletePlan, updatePlan } from '@/utils/firescript'
import AddActivityModal from '../components/AddActivityModal.vue'
import { formatDateRange, formatTime, filterByName } from '@/utils'
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'

const plans = ref([])
const editingPlan = ref(null)
const showAddActivityModal = ref(false)
const selectedPlan = ref(null)
const deletingPlan = ref(null)
const showConfirmDeleteModal = ref(false)

const searchQuery = ref('')
const filteredPlans = ref([])

watch(searchQuery, (searchQuery) => {
  if (!searchQuery || searchQuery === '') {
    filteredPlans.value = plans.value
    return
  }

  filteredPlans.value = filterByName(plans.value, searchQuery)
})

const fetchPlans = async () => {
  try {
    plans.value = await getPlansByActualUser()
    filteredPlans.value = plans.value
  } catch (error) {
    console.error('Error al obtener los itinerarios', error)
  }
}

const createNewPlan = () => {
  router.push('/create')
}

const viewPlan = (planId) => {
  router.push({ name: 'Itinerary', params: { id: planId.toString() } })
  console.log('Ver itinerario', planId)
}

const openConfirmDeleteModal = (plan) => {
  deletingPlan.value = plan
  showConfirmDeleteModal.value = true
}

const closeDeleteModal = () => {
  showConfirmDeleteModal.value = false
  deletingPlan.value = null
}

const handleDeletePlan = async (planId) => {
  try {
    await deletePlan(planId)
    closeDeleteModal()
    fetchPlans()
  } catch (error) {
    console.log(error)
  }
}

const editPlan = async (plan) => {
  try {
    await updatePlan(plan)
    editingPlan.value = plan
    console.log('Itinerario actualizado')
  } catch (error) {
    console.log(error)
  }
}

const closeEditModal = () => {
  editingPlan.value = null
}

const isLoading = ref(false)

const handleUpdatePlan = async (updatedPlan) => {
  isLoading.value = true
  try {
    await updatePlan(updatedPlan)
    await fetchPlans() // Vuelve a cargar todos los planes
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
    closeEditModal()
  }
}

const closeAddActivityModal = () => {
  showAddActivityModal.value = false
  selectedPlan.value = null
}

const openAddActivityModal = (plan) => {
  selectedPlan.value = plan
  showAddActivityModal.value = true
}

const handleAddActivity = async (activity) => {
  if (selectedPlan.value) {
    const updatedPlan = {
      // Actualiza el plan con la nueva actividad
      ...selectedPlan.value,
      activities: [...(selectedPlan.value.activities || []), activity], // Añade la actividad al array de actividades
    }
    try {
      await updatePlan(updatedPlan)
      console.log('Actividad añadida:', activity)
    } catch (error) {
      console.error('Error al actualizar el plan:', error)
    } finally {
      fetchPlans() // Vuelve a cargar todos los planes
      closeAddActivityModal()
    }
  }
}

onMounted(() => {
  fetchPlans()
})
</script>

<template>
  <div class="min-h-screen bg-[#fafafa] cursor-default">
    <main class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-[#000000]">Mis Planes</h1>
        <p class="text-[#828282]">{{ plans.length }} planes</p>
      </div>

      <!-- Barra de búsqueda -->
      <div class="relative mb-8">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar planes..."
          class="z-10 w-full px-12 py-3 border border-[#d9d9d9] rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-[#0b64ad]"
        />
        <SearchIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#828282] h-5 w-5" />
      </div>

      <!-- Lista de planes -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-if="plans.length === 0" class="col-span-full text-center py-12">
          <p class="text-[#828282] mb-8">No tienes ningún plan creado</p>
          <button
            @click="createNewPlan"
            class="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-[#0b64ad]/90 transition-colors"
          >
            ¡Crea tu primer plan!
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
                  <CalendarIcon class="h-4 w-4 mr-1" />
                  <p>{{ formatDateRange(plan.startDate, plan.endDate) }}</p>
                </div>
              </div>
              <div class="flex space-x-2">
                <button
                  @click="editPlan(plan)"
                  class="text-blue-500 hover:text-[#0b64ad]/80 transition-colors"
                >
                  <EditIcon class="h-5 w-5" />
                </button>
                <button
                  @click="openConfirmDeleteModal(plan)"
                  class="text-[#828282] hover:text-[#812727] transition-colors"
                >
                  <TrashIcon class="h-5 w-5" />
                </button>
              </div>
            </div>

            <div class="mb-4">
              <div class="flex justify-between items-center mb-2">
                <h3 class="font-medium text-[#000000]">
                  {{ plan.activities.length }} actividades planificadas
                </h3>
                <button
                  @click="openAddActivityModal(plan)"
                  class="text-[#0b64ad] hover:text-[#0b64ad]/80 transition-colors"
                >
                  <PlusCircleIcon class="h-5 w-5" />
                </button>
              </div>
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
            class="bg-blue-500 text-white px-6 py-2 rounded-full text-sm hover:bg-[#0b64ad]/90 transition-colors mt-auto"
          >
            Revisar Itinerario
          </button>
        </div>
      </div>
    </main>

    <!-- Modal de edición -->
    <EditPlanModal
      v-if="editingPlan"
      :plan="editingPlan"
      @close="closeEditModal"
      @update="handleUpdatePlan"
    />
    <AddActivityModal
      v-if="showAddActivityModal"
      :is-open="showAddActivityModal"
      :plan="selectedPlan"
      @close="closeAddActivityModal"
      @submit="handleAddActivity"
    />
    <ConfirmDeleteModal
      v-if="showConfirmDeleteModal"
      :is-open="showConfirmDeleteModal"
      :plan="deletingPlan"
      @close="closeDeleteModal"
      @confirm="handleDeletePlan"
    />
  </div>
</template>
