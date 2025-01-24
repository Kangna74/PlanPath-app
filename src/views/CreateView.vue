<script setup>
import { ref, reactive } from 'vue'
import { MapPinIcon, CalendarIcon, EyeIcon, GlobeIcon, LockIcon } from 'lucide-vue-next'
import AddActivityModal from '../components/AddActivityModal.vue'
import router from '@/router'
import { postPlan } from '@/utils/firescript'
import {
  getCurrentDate,
  validateDate,
  handleStepNavigation,
  addActivityToForm,
  togglePublic,
  createItinerary,
} from '@/utils'

const steps = [
  { name: 'Planificar', icon: MapPinIcon },
  { name: 'Actividades', icon: CalendarIcon },
  { name: 'Visualizar', icon: EyeIcon },
]

const showAddActivityModal = ref(false)
const dateError = ref('')
const currentStep = ref(0)
const formData = reactive({
  name: '',
  ubication: '',
  startDate: '',
  endDate: '',
  activities: [],
  public: false,
})

const handleAddActivity = (activity) => {
  formData.activities = addActivityToForm(formData, activity).activities
}

const nextStep = () => {
  currentStep.value = handleStepNavigation(currentStep.value, steps.length, 'next')
}

const previousStep = () => {
  currentStep.value = handleStepNavigation(currentStep.value, steps.length, 'previous')
}

const handleTogglePublic = () => {
  formData.public = togglePublic(formData.public)
}

const handleCreateItinerary = async () => {
  const error = await createItinerary(formData, postPlan, router)
  if (error) {
    // Handle the error, e.g., display it to the user
    console.error(error)
  }
}
</script>

<template>
  <div class="min-96 bg-white p-4 cursor-default">
    <div class="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg">
      <!-- Header -->
      <h1 class="mb-8 text-center text-3xl font-bold">Comienza tu aventura</h1>

      <!-- Progress Steps -->
      <div class="mb-8">
        <div class="relative flex justify-between">
          <div v-for="(step, index) in steps" :key="step.name" class="flex flex-col items-center">
            <div
              :class="[
                'flex h-10 w-10 items-center justify-center rounded-full',
                currentStep >= index ? 'bg-blue-500 text-white' : 'bg-gray-200',
              ]"
            >
              <component :is="step.icon" class="h-5 w-5" />
            </div>
            <span
              :class="['mt-2 text-sm', currentStep >= index ? 'text-blue-500' : 'text-gray-500']"
            >
              {{ step.name }}
            </span>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="mt-4 flex w-full justify-between">
          <div v-for="(step, index) in steps" :key="index" class="relative flex-1">
            <div
              :class="[
                'absolute h-1 w-full',
                index === 0 ? 'rounded-l-full' : '',
                index === steps.length - 1 ? 'rounded-r-full' : '',
                currentStep >= index ? 'bg-blue-500' : 'bg-gray-200',
              ]"
            ></div>
          </div>
        </div>
      </div>

      <!-- Carousel Content -->
      <div class="min-h-full">
        <!-- Step 1: Planificar -->
        <div v-if="currentStep === 0" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Plan</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              placeholder="¿Qué plan tienes en mente?"
              class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label for ="ubication" class="block text-sm font-medium text-gray-700">Ubicación</label>
            <input
              id="ubication"
              v-model="formData.ubication"
              type="text"
              placeholder="¿Dónde se llevará a cabo?"
              class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label for="dates" class="block text-sm font-medium text-gray-700"
              >Fechas del plan</label
            >
            <div class="grip grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div class="flex-1">
                <label for="startDate" class="block text-xs text-gray-500">Inicio</label>
                <input
                  id="startDate"
                  v-model="formData.startDate"
                  type="date"
                  :min="getCurrentDate()"
                  @change="dateError = validateDate(formData.startDate, formData.endDate)"
                  class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div class="flex-1">
                <label for="endDate" class="block text-xs text-gray-500">Fin</label>
                <input
                  id="endDate"
                  v-model="formData.endDate"
                  type="date"
                  :min="formData.startDate || getCurrentDate()"
                  @change="dateError = validateDate(formData.startDate, formData.endDate)"
                  class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <p v-if="dateError" class="text-red-500 text-sm mt-1">{{ dateError }}</p>
          </div>
          <div>
            <label for="visibility" class="block text-sm font-medium text-gray-700"
              >Visibilidad del plan</label
            >
            <div class="mt-2 flex items-center">
              <button
                @click="handleTogglePublic"
                :class="[
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  formData.public ? 'bg-blue-600' : 'bg-gray-200',
                ]"
                role="switch"
                :aria-checked="formData.public"
              >
                <span
                  :class="[
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                    formData.public ? 'translate-x-5' : 'translate-x-0',
                  ]"
                ></span>
              </button>
              <span class="ml-3 text-sm">
                {{ formData.public ? 'Público' : 'Privado' }}
              </span>
              <component
                :is="formData.public ? GlobeIcon : LockIcon"
                class="ml-2 h-5 w-5 text-gray-400"
              />
            </div>
          </div>
        </div>

        <!-- Step 2: Actividades -->
        <div v-if="currentStep === 1" class="space-y-6">
          <h2 class="text-xl font-semibold">Actividades para "{{ formData.name }}"</h2>
          <div v-if="formData.activities.length === 0" class="text-center text-gray-500">
            <p>Aún no has añadido ninguna actividad.</p>
            <p>¡Comienza a planificar!</p>
          </div>
          <div v-else class="space-y-4">
            <div
              v-for="(activity, index) in formData.activities"
              :key="index"
              class="rounded-lg border border-gray-200 p-4"
            >
              <h3 class="font-medium">{{ activity.name }}</h3>
              <p class="text-sm text-gray-500">{{ activity.date }} - {{ activity.time }}</p>
              <p class="text-sm text-gray-500">{{ activity.location }}</p>
              <p v-if="activity.notes" class="text-sm text-gray-600 mt-2">
                <strong>Notas: </strong> {{ activity.notes }}
              </p>
            </div>
          </div>
          <button
            @click="showAddActivityModal = true"
            class="w-full rounded-md bg-blue-500 shadow-lg shadow-blue-500/50 px-4 py-2 text-white hover:bg-blue-600"
          >
            Añadir Actividad
          </button>
        </div>

        <!-- Step 3: Visualizar -->
        <div v-if="currentStep === 2" class="space-y-6">
          <h2 class="text-xl font-semibold">Tu Plan para "{{ formData.name }}"</h2>
          <div class="rounded-lg bg-gray-50 p-4">
            <h3 class="mb-2 text-sm font-medium text-gray-700">Ubicación:</h3>
            <p class="text-gray-600">{{ formData.ubication }}</p>
          </div>
          <div class="rounded-lg bg-gray-50 p-4">
            <h3 class="mb-2 text-sm font-medium text-gray-700">Fechas del plan:</h3>
            <p class="text-gray-600">{{ formData.startDate }} - {{ formData.endDate }}</p>
          </div>
          <div class="rounded-lg bg-gray-50 p-4">
            <h3 class="mb-2 text-sm font-medium text-gray-700">Visibilidad:</h3>
            <p class="text-gray-600 flex items-center">
              {{ formData.public ? 'Público' : 'Privado' }}
              <component
                :is="formData.public ? GlobeIcon : LockIcon"
                class="ml-2 h-5 w-5 text-gray-400"
              />
            </p>
          </div>
          <div class="rounded-lg bg-gray-50 p-4">
            <h3 class="mb-2 text-sm font-medium text-gray-700">Resumen de actividades:</h3>
            <div class="space-y-4">
              <div
                v-for="(activity, index) in formData.activities"
                :key="index"
                class="flex items-center gap-4"
              >
                <span
                  class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs text-white"
                >
                  {{ index + 1 }}
                </span>
                <div>
                  <h4 class="font-medium">{{ activity.name }}</h4>
                  <p class="text-sm text-gray-500">{{ activity.date }} - {{ activity.location }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="mt-8 flex gap-4">
        <button
          v-if="currentStep > 0"
          @click="previousStep"
          class="rounded-md bg-gray-200 shadow-lg shadow-gray-200/50 px-6 py-2 text-gray-700 hover:bg-gray-300"
        >
          Volver
        </button>
        <button
          v-if="currentStep < steps.length - 1"
          @click="nextStep"
          class="ml-auto rounded-md bg-blue-500 shadow-lg shadow-blue-500/50 px-6 py-2 text-white hover:bg-blue-600"
        >
          {{ currentStep === 0 ? 'Siguiente: Añadir Actividades' : 'Siguiente: Ver Itinerario' }}
        </button>
        <button
          v-else
          @click="handleCreateItinerary"
          class="ml-auto rounded-md bg-blue-500 shadow-lg shadow-blue-500/50 px-6 py-2 text-white hover:bg-gray-800"
        >
          ¡Crea tu Plan!
        </button>
      </div>

      <AddActivityModal
        :is-open="showAddActivityModal"
        @close="showAddActivityModal = false"
        @submit="handleAddActivity"
      />
    </div>
  </div>
</template>
