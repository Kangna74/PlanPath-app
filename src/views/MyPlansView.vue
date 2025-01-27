<template>
  <div class="min-h-screen bg-white cursor-default">
    <input
      ref="fileInput"
      type="file"
      @change="handleFileUpload"
      accept="image/*"
      style="display: none"
    />
    <main class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-[#000000]">Mis Planes</h1>
        <p class="text-[#828282]">{{ plans.length }} planes</p>
      </div>

      <!-- Barra de búsqueda -->
      <SearchBar v-model="searchQuery" class="mb-8" />

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
                <img
                  v-if="plan.image"
                  :src="plan.image"
                  alt=""
                  class="w-40 h-40 object-cover rounded-lg mb-4"
                />
                <img v-else src="/img/placeholderimg.webp" class="h-40 w-40 rounded-lg mb-4" />

                <h2 class="text-xl font-semibold text-[#000000]">{{ plan.name }}</h2>
                <div class="flex items-center text-[#828282] text-sm mt-1">
                  <MapPinIcon class="h-4 w-4 mr-1" />
                  <p>{{ plan.ubication }}</p>
                </div>
                <div class="flex items-center text-[#828282] text-sm mt-1">
                  <CalendarIcon class="h-4 w-4 mr-1" />
                  <p>{{ formatDateRange(plan.startDate, plan.endDate) }}</p>
                </div>
              </div>
              <div class="flex flex-col items-end gap-2">
                <button
                  @click="triggerFileInput(plan.id)"
                  class="text-[#828282] hover:text-[#3b964b] transition-colors"
                >
                  <ImageUp class="h-5 w-5" />
                </button>
                <button
                  @click="editPlan(plan)"
                  class="text-[#828282] hover:text-[#0b64ad]/80 transition-colors"
                >
                  <Edit class="h-5 w-5" />
                </button>
                <button
                  @click="openConfirmDeleteModal(plan)"
                  class="text-[#828282] hover:text-[#812727] transition-colors"
                >
                  <Trash2 class="h-5 w-5" />
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
          <div class="flex justify-between items-center mt-4">
            <button
              @click="viewPlan(plan.id)"
              class="bg-blue-500 shadow-lg shadow-blue-500/50 text-white px-6 py-2 rounded-full text-sm hover:bg-[#0b64ad]/90 transition-colors"
            >
              Revisar Itinerario
            </button>
            <div class="flex items-center mt-4">
              <span class="text-sm text-gray-600 mr-2">{{
                plan.public ? 'Público' : 'Privado'
              }}</span>
              <button
                @click="togglePlanVisibility(plan)"
                class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                :class="plan.public ? 'bg-blue-600' : 'bg-gray-200'"
              >
                <span
                  class="inline-block w-4 h-4 transform transition-transform bg-white rounded-full"
                  :class="plan.public ? 'translate-x-6' : 'translate-x-1'"
                />
                <component
                  :is="plan.public ? GlobeIcon : LockIcon"
                  class="absolute left-0.5 top-0.5 w-5 h-5 text-white transition-opacity"
                  :class="plan.public ? 'opacity-100' : 'opacity-0'"
                />
                <component
                  :is="plan.public ? LockIcon : GlobeIcon"
                  class="absolute right-0.5 top-0.5 w-5 h-5 text-gray-400 transition-opacity"
                  :class="plan.public ? 'opacity-0' : 'opacity-100'"
                />
              </button>
            </div>
          </div>
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

<script setup>
import { ref, watch, onMounted, useTemplateRef } from 'vue'
import router from '@/router'
import { CalendarIcon, PlusCircleIcon, MapPinIcon, Trash2, Edit, ImageUp } from 'lucide-vue-next'
import EditPlanModal from '../components/EditPlanModal.vue'
import { getPlansByActualUser, deletePlan, updatePlan } from '@/utils/firescript'
import AddActivityModal from '../components/AddActivityModal.vue'
import { formatDateRange, formatTime, filterByName } from '@/utils'
import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
import SearchBar from '@/components/SearchBar.vue'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { toast } from 'vue3-toastify'

const plans = ref([])
const editingPlan = ref(null)
const showAddActivityModal = ref(false)
const selectedPlan = ref(null)
const deletingPlan = ref(null)
const showConfirmDeleteModal = ref(false)
const fileInput = useTemplateRef('fileInput')
const searchQuery = ref('')
const filteredPlans = ref([])

watch(searchQuery, (newQuery) => {
  console.log('Nueva búsqueda:', newQuery)
  if (!newQuery || newQuery === '') {
    filteredPlans.value = plans.value
    return
  }

  filteredPlans.value = filterByName(plans.value, newQuery)
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

const togglePlanVisibility = async (plan) => {
  try {
    const updatedPlan = { ...plan, public: !plan.public }
    await updatePlan(updatedPlan)
    await fetchPlans() // Recargar los planes después de la actualización
    console.log(`Plan "${plan.name}" cambiado a ${updatedPlan.public ? 'público' : 'privado'}`)
  } catch (error) {
    console.error('Error al cambiar la visibilidad del plan:', error)
  }
}

onMounted(() => {
  fetchPlans()
})

const planId = ref(null)
const toastId = ref(null)
const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  const maxFileSize = 1 * 1024 * 1024
  if (file.size > maxFileSize) {
    toast.error('File size is too large. Max file size is 5MB', {
      position: 'top-center',
      autoClose: 3000,
    })
    return
  }
  const formData = new FormData()

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)

  toastId.value = toast.loading('Please wait...', {
    position: 'top-center',
  })

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()
    const planRef = doc(db, 'plans', planId.value)

    // Set the "capital" field of the city 'DC'
    await updateDoc(planRef, {
      image: result.secure_url,
    })
    fetchPlans()
    toast.remove(toastId.value)
    toast.success('Image uploaded successfully', {
      position: 'top-center',
      autoClose: 1500,
    })
  } catch (error) {
    toast.remove(toastId.value)
    console.error('Upload failed', error)
  }
}
const triggerFileInput = (id) => {
  fileInput.value?.click()
  planId.value = id
}
onMounted(() => {
  fetchPlans()
})
</script>
