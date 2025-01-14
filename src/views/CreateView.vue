<template>
  <div class="min-h-screen bg-white p-4">
    <div class="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg">
      <!-- Header -->
      <h1 class="mb-8 text-center text-3xl font-bold">Comienza tu aventura</h1>

      <!-- Progress Steps -->
      <div class="mb-8">
        <div class="relative flex justify-between">
          <div v-for="(step, index) in steps" :key="step.name"
               class="flex flex-col items-center">
            <div
              :class="[
                'flex h-10 w-10 items-center justify-center rounded-full',
                currentStep >= index ? 'bg-blue-500 text-white' : 'bg-gray-200'
              ]"
            >
              <component :is="step.icon" class="h-5 w-5" />
            </div>
            <span
              :class="[
                'mt-2 text-sm',
                currentStep >= index ? 'text-blue-500' : 'text-gray-500'
              ]"
            >
              {{ step.name }}
            </span>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="mt-4 flex w-full justify-between">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="relative flex-1"
          >
            <div
              :class="[
                'absolute h-1 w-full',
                index === 0 ? 'rounded-l-full' : '',
                index === steps.length - 1 ? 'rounded-r-full' : '',
                currentStep >= index ? 'bg-blue-500' : 'bg-gray-200'
              ]"
            ></div>
          </div>
        </div>
      </div>

      <!-- Carousel Content -->
      <div class="min-h-[400px]">
    <!-- Step 1: Planificar -->
    <div v-if="currentStep === 0" class="space-y-6">
      <div>
        <label for="destination" class="block text-sm font-medium text-gray-700">Tarea</label>
        <input
          id="destination"
          v-model="formData.destination"
          type="text"
          placeholder="¿Qué plan tienes en mente?"
          class="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
          <div>
            <label for="dates" class="block text-sm font-medium text-gray-700">Fechas de la Tarea</label>
            <div class="flex space-x-4">
              <div class="flex-1">
                <label for="startDate" class="block text-xs text-gray-500">Inicio</label>
                <input
                  id="startDate"
                  v-model="formData.startDate"
                  type="date"
                  class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div class="flex-1">
                <label for="endDate" class="block text-xs text-gray-500">Fin</label>
                <input
                  id="endDate"
                  v-model="formData.endDate"
                  type="date"
                  class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Actividades -->
        <div v-if="currentStep === 1" class="space-y-6">
          <h2 class="text-xl font-semibold">Actividades para "{{ formData.destination }}"</h2>
          <div v-if="formData.activities.length === 0" class="text-center text-gray-500">
            <p>Aún no has añadido ninguna actividad.</p>
            <p>¡Comienza a planificar!</p>
          </div>
          <div v-else class="space-y-4">
            <div v-for="(activity, index) in formData.activities"
                 :key="index"
                 class="rounded-lg border border-gray-200 p-4">
              <h3 class="font-medium">{{ activity.name }}</h3>
              <p class="text-sm text-gray-500">{{ activity.date }} - {{ activity.time }}</p>
              <p class="text-sm text-gray-500">{{ activity.location }}</p>
            </div>
          </div>
          <button
    @click="showAddActivityModal = true"
    class="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
  >
    + Añadir Actividad
  </button>
        </div>

        <!-- Step 3: Visualizar -->
        <div v-if="currentStep === 2" class="space-y-6">
          <h2 class="text-xl font-semibold">Tu Itinerario para "{{ formData.destination }}"</h2>
          <div class="rounded-lg bg-gray-50 p-4">
            <h3 class="mb-2 text-sm font-medium text-gray-700">Fechas de la tarea:</h3>
            <p class="text-gray-600">{{ formData.startDate }} - {{ formData.endDate }}</p>
          </div>
          <div class="rounded-lg bg-gray-50 p-4">
            <h3 class="mb-2 text-sm font-medium text-gray-700">Resumen de Actividades:</h3>
            <div class="space-y-4">
              <div v-for="(activity, index) in formData.activities"
                   :key="index"
                   class="flex items-center gap-4">
                <span class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
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
      <div class="mt-8 flex justify-between">
        <button
          v-if="currentStep > 0"
          @click="previousStep"
          class="rounded-md bg-gray-200 px-6 py-2 text-gray-700 hover:bg-gray-300"
        >
          Volver
        </button>
        <button
          v-if="currentStep < steps.length - 1"
          @click="nextStep"
          class="ml-auto rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
        >
          {{ currentStep === 0 ? 'Siguiente: Añadir Actividades' : 'Siguiente: Ver Itinerario' }}
        </button>
        <button
          v-else
          @click="createItinerary"
          class="ml-auto rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-gray-800"
        >
          ¡Crea tu Itinerario!
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

<script setup>
import { ref, reactive } from 'vue'
import { MapPin, Calendar, Eye } from 'lucide-vue-next'
import AddActivityModal from '../components/AddActivityModal.vue'
import { planService } from '../services/planService'
import { useRouter } from 'vue-router'

const router = useRouter()

const steps = [
  { name: 'Planificar', icon: MapPin },
  { name: 'Actividades', icon: Calendar },
  { name: 'Visualizar', icon: Eye }
]

const showAddActivityModal = ref(false)

const handleAddActivity = (activity) => {
  formData.activities.push({
    ...activity,
    id: Date.now() // Añadir un ID único
  })
}

const currentStep = ref(0)
const formData = reactive({
  destination: '',
  startDate: '',
  endDate: '',
  activities: []
})

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const createItinerary = () => {
  planService.addPlan({
    destination: formData.destination,
    startDate: formData.startDate,
    endDate: formData.endDate,
    activities: formData.activities
  })
  router.push('/my-plans')
}
</script>
