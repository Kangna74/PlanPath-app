<script>
import { CalendarIcon, MapPinIcon, ArrowLeft, EditIcon, TrashIcon, SquareArrowOutUpRight  } from 'lucide-vue-next'
import { getPlanById, updatePlan, getUser } from '@/utils/firescript'
import router from '@/router'
import { formatDateRange, formatDateTime, getPlanFromRoute, updatePlanActivity } from '@/utils'
import EditActivityModal from '../components/EditActivityModal.vue'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.vue'
import ErrorItem from '../components/ErrorItem.vue'
import LoaderAnimation from '@/components/LoaderAnimation.vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  components: {
    CalendarIcon,
    MapPinIcon,
    ArrowLeft,
    EditIcon,
    TrashIcon,
    EditActivityModal,
    ConfirmDeleteModal,
    ErrorItem,
    LoaderAnimation,
    SquareArrowOutUpRight
  },

  data() {
    return {
      plan: null,
      currentEditingIndex: null,
      isEditModalOpen: false,
      isConfirmModalOpen: false,
      activityToDelete: null,
      isOwner: false,
      isLoading: true,
    }
  },

  computed: {
    currentEditingActivity() {
      if (this.currentEditingIndex !== null && this.plan) {
        return this.plan.activities[this.currentEditingIndex]
      }
      return null
    },
  },
  beforeMount() {
    this.fetchPlan()
  },
  mounted() {},

  methods: {
    async fetchPlan() {
      this.plan = await getPlanFromRoute(this.$route, getPlanById)
      if (this.plan) {
        getUser().then((user) => {
          if (user.uid == this.plan.userId) {
            this.isOwner = true
          }
        })
      }
      this.isLoading = false
    },

    goBack() {
      router.back()
    },

    shareItinerary(){
      const url = `${window.location.origin}/itinerary/${this.plan.id}`

      navigator.clipboard.writeText(url).then(() => {
        toast("Enlace copiado al portapapeles", {
            type: 'success',
            position: 'top-center',
          })
      }).catch((error) => {
        console.error('Error al copiar el enlace:', error)
        toast("Error al copiar el enlace", {
            type: 'error',
            position: 'top-center',
          })
      })
    },

    editActivity(index) {
      this.currentEditingIndex = index
      this.isEditModalOpen = true
    },

    closeEditModal() {
      this.isEditModalOpen = false
      this.currentEditingIndex = null
    },

    async updateActivity(updatedActivity) {
      const updatedPlan = await updatePlanActivity(
        this.plan,
        this.currentEditingIndex,
        updatedActivity,
        updatePlan,
      )
      if (updatedPlan) {
        this.plan = updatedPlan
      }
      this.closeEditModal()
    },

    confirmDeleteActivity(index) {
      this.activityToDelete = { id: index, name: this.plan.activities[index].name }
      this.isConfirmModalOpen = true
    },

    closeConfirmModal() {
      this.isConfirmModalOpen = false
      this.activityToDelete = null
    },

    async deleteActivity(activityId) {
      const updatedActivities = this.plan.activities.filter((_, index) => index !== activityId)

      const updatedPlan = {
        ...this.plan,
        activities: updatedActivities,
      }

      try {
        await updatePlan(updatedPlan)
        this.plan = updatedPlan
      } catch (error) {
        console.error('Error al eliminar la actividad:', error)
      }

      this.closeConfirmModal()
    },

    formatDateRange,
    formatDateTime,
  },
}
</script>

<template>
  <div v-if="!isLoading">
    <div v-if="this.plan != null" class="min-96 bg-[#fafafa]">
      <main class="container mx-auto px-4 py-8">
        <div v-if="plan" class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-[#000000]">{{ plan.name }}</h1>
            <button @click="goBack" class="text-blue-500 hover:text-[#094a80] transition-colors">
              <ArrowLeft class="h-6 w-6" />
            </button>
          </div>
          <div class="flex items-center text-[#828282] text-sm mb-6">
            <CalendarIcon class="h-5 w-5 mr-2" />
            <p>{{ formatDateRange(plan.startDate, plan.endDate) }}</p>
          </div>
          <h2 class="text-xl font-semibold mb-4">Tus Actividades:</h2>
          <ul class="space-y-4">
            <li
              v-for="(activity, index) in plan.activities"
              :key="activity.id"
              class="bg-gray-50 rounded-lg p-6"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-medium text-[#000000]">{{ activity.name }}</h3>
                  <p class="text-sm text-gray-500">
                    {{ formatDateTime(activity.date, activity.time) }}
                  </p>
                  <p v-if="activity.notes" class="text-xs text-gray-600 mt-2">
                    <strong>Notas: </strong> {{ activity.notes }}
                  </p>
                </div>
                <div class="flex flex-col items-end ml-auto">
                  <div class="flex items-center mb-2">
                    <MapPinIcon class="h-5 w-5 text-blue-500 mr-1" />
                    <p class="text-sm text-gray-500">{{ activity.location }}</p>
                  </div>
                  <div v-if="isOwner" class="flex space-x-2 mt-2">
                    <button @click="editActivity(index)" class="text-blue-600 hover:text-blue-800">
                      <EditIcon class="h-5 w-5" />
                    </button>
                    <button
                      @click="confirmDeleteActivity(index)"
                      class="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon class="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <button @click="shareItinerary" class="text-blue-500 hover:text-[#094a80] transition-colors flex flex-row gap-3 pt-4">
            <p>Compartir itinerario</p>
            <SquareArrowOutUpRight class="h-6 w-6" />
          </button>
        </div>

      </main>
      <EditActivityModal
        :is-open="isEditModalOpen"
        :activity="currentEditingActivity"
        @close="closeEditModal"
        @update="updateActivity"
      />
      <ConfirmDeleteModal
        :is-open="isConfirmModalOpen"
        :plan="activityToDelete"
        @close="closeConfirmModal"
        @confirm="deleteActivity"
      />
    </div>
    <ErrorItem v-else />
  </div>


  <div v-else class="min-96 py-20 container mx-auto flex justify-center align-center">
    <LoaderAnimation />
  </div>
</template>
