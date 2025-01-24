<script>
import { CalendarIcon, MapPinIcon, ArrowLeft, EditIcon, TrashIcon } from 'lucide-vue-next'
import { getPlanById, updatePlan } from '@/utils/firescript'
import router from '@/router'
import {
  formatDateRange,
  formatDateTime,
  getPlanFromRoute,
  updatePlanActivity,
} from '@/utils'
import EditActivityModal from '../components/EditActivityModal.vue'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.vue'

export default {
  components: {
    CalendarIcon,
    MapPinIcon,
    ArrowLeft,
    EditIcon,
    TrashIcon,
    EditActivityModal,
    ConfirmDeleteModal,
  },

  data() {
    return {
      plan: null,
      currentEditingIndex: null,
      isEditModalOpen: false,
      isConfirmModalOpen: false,
      activityToDelete: null,
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

  mounted() {
    this.fetchPlan()
  },

  methods: {
    async fetchPlan() {
      this.plan = await getPlanFromRoute(this.$route, getPlanById)
    },

    goBack() {
      router.back()
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
  <div class="min-h-screen bg-[#fafafa]">
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
        <!-- lista de actividades -->
        <ul class="space-y-4">
          <li v-for="(activity, index) in plan.activities" :key="activity.id"
            class="flex flex-col bg-gray-100 rounded-md p-4">
            <div class="flex flex-col space-y-4">
              <!-- Top section with title and actions -->
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-medium text-[#000000]">{{ activity.name }}</h3>
                  <p class="text-sm text-gray-500">
                    {{ formatDateTime(activity.date, activity.time) }}
                  </p>
                </div>

                <div class="flex space-x-2">
                  <button @click="editActivity(index)" class="text-blue-600 hover:text-blue-800">
                    <EditIcon class="h-5 w-5" />
                  </button>
                  <button @click="confirmDeleteActivity(index)" class="text-red-600 hover:text-red-800">
                    <TrashIcon class="h-5 w-5" />
                  </button>
                </div>
              </div>

              <!-- Location section -->
              <div class="flex items-center">
                <MapPin class="h-5 w-5 text-blue-500 mr-1" />
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
        </ul>
      </div>
    </main>
    <EditActivityModal :is-open="isEditModalOpen" :activity="currentEditingActivity" @close="closeEditModal"
      @update="updateActivity" />
    <ConfirmDeleteModal :is-open="isConfirmModalOpen" :plan="activityToDelete" @close="closeConfirmModal"
      @confirm="deleteActivity" />
  </div>
</template>
