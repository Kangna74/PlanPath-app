<script>
import {
  CalendarIcon,
  MapPinIcon,
  ArrowLeft,
  EditIcon,
  TrashIcon,
  SquareArrowOutUpRight,
} from 'lucide-vue-next'
import { getPlanById, updatePlan, getUser } from '@/utils/firescript'
import router from '@/router'
import { formatDateRange, getPlanFromRoute } from '@/utils'
import EditActivityModal from '../components/EditActivityModal.vue'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.vue'
import PublicModal from '../components/PublicModal.vue'
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
    SquareArrowOutUpRight,
    PublicModal,
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
      isPublicModalOpen: false,
    }
  },

  computed: {
    currentEditingActivity() {
      if (this.currentEditingIndex !== null && this.plan) {
        return this.plan.activities[this.currentEditingIndex]
      }
      return null
    },

    groupedActivities() {
      if (this.plan && this.plan.activities) {
        // Step 1: Sort activities by date and time
        const sortedActivities = [...this.plan.activities].sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time}`)
          const dateB = new Date(`${b.date}T${b.time}`)
          return dateA - dateB
        })

        // Step 2: Group activities by date
        return sortedActivities.reduce((groups, activity) => {
          const activityDate = activity.date
          if (!groups[activityDate]) {
            groups[activityDate] = []
          }
          groups[activityDate].push(activity)
          return groups
        }, {})
      }
      return {}
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

    shareItinerary() {
      if (this.plan.public) {
        const url = `${window.location.origin}/itinerary/${this.plan.id}`

        navigator.clipboard
          .writeText(url)
          .then(() => {
            toast('Enlace copiado al portapapeles', {
              type: 'success',
              position: 'top-center',
            })
          })
          .catch((error) => {
            console.error('Error al copiar el enlace:', error)
            toast('Error al copiar el enlace', {
              type: 'error',
              position: 'top-center',
            })
          })
      } else {
        this.isPublicModalOpen = true
      }
    },

    editActivity(date, index) {
      const allActivities = Object.values(this.groupedActivities).flat()

      const globalIndex = allActivities.findIndex(
        (activity) =>
          activity.date === date && activity.id === this.groupedActivities[date][index].id,
      )

      this.currentEditingIndex = globalIndex
      this.isEditModalOpen = true
    },

    closeEditModal() {
      this.isEditModalOpen = false
      this.currentEditingIndex = null
    },

    closePublicModal() {
      this.isPublicModalOpen = false
    },

    async updateActivity(updatedActivity) {
      console.log('updatedActivity', updatedActivity)

      if (this.currentEditingIndex !== null && this.plan) {
        const updatedActivities = [...this.plan.activities]
        updatedActivities[this.currentEditingIndex] = updatedActivity

        const updatedPlan = {
          ...this.plan,
          activities: updatedActivities,
        }

        console.log('updatedPlan', updatedPlan)
        try {
          await updatePlan(updatedPlan)
          this.plan = updatedPlan
        } catch (error) {
          console.error('Error al actualizar la actividad:', error)
        }
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
    formatDateTime(date, time = null) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      const dateString = new Date(date).toLocaleDateString('es-ES', options)
      if (time) {
        return `${dateString} a ${time}`
      }
      return dateString
    },
    changeVisibility() {
      console.log('cambiando visibilidad')
    },
  },
}
</script>

<template>
  <div v-if="!isLoading">
    <div v-if="this.plan != null" class="min-h-screen bg-[#fafafa]">
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
          <!-- Grouped Activities -->
          <ul class="space-y-6">
            <template v-for="(activities, date) in groupedActivities" :key="date">
              <!-- Day Header -->
              <li class="bg-blue-100 rounded-md p-4">
                <h2 class="text-lg font-bold text-[#000000]">{{ formatDateTime(date) }}</h2>
              </li>

              <!-- Activities for the Day -->
              <li
                v-for="(activity, index) in activities"
                :key="activity.id"
                class="flex flex-col bg-gray-100 rounded-md p-4"
              >
                <div class="flex flex-col space-y-4">
                  <!-- Top section with title and actions -->
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="font-medium text-[#000000]">{{ activity.name }}</h3>
                      <p class="text-sm text-gray-500">
                        {{ formatDateTime(activity.date, activity.time) }}
                      </p>
                    </div>

                    <div v-if="isOwner" class="flex space-x-2">
                      <button
                        @click="editActivity(activity.date, index)"
                        class="text-blue-600 hover:text-blue-800"
                      >
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

                  <!-- Location section -->
                  <div class="flex items-center">
                    <MapPinIcon class="h-5 w-5 text-blue-500 mr-1" />
                    <p class="text-sm text-gray-500">{{ activity.location }}</p>
                  </div>

                  <!-- Notes section -->
                  <div v-if="activity.notes">
                    <p class="text-xs text-gray-600">
                      <strong>Notas: </strong> {{ activity.notes }}
                    </p>
                  </div>
                </div>
              </li>
            </template>
          </ul>
          <button
            @click="shareItinerary"
            class="text-blue-500 hover:text-[#094a80] transition-colors flex flex-row gap-3 pt-4"
          >
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
      <PublicModal
        :is-open="isPublicModalOpen"
        @close="closePublicModal"
        @confirm="changeVisibility"
      />
    </div>
    <ErrorItem v-else />
  </div>

  <div v-else class="min-96 py-20 container mx-auto flex justify-center align-center">
    <LoaderAnimation />
  </div>
</template>
