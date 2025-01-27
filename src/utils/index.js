// Obtiene la fecha actual en formato YYYY-MM-DD
export const getCurrentDate = () => {
  const now = new Date()
  return now.toISOString().split('T')[0]
}

// Valida que las fechas de inicio y fin sean correctas
export const validateDate = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const current = new Date()
  current.setHours(0, 0, 0, 0)

  if (start < current) {
    return 'La fecha de inicio no puede ser anterior a hoy'
  }

  if (endDate && end < start) {
    return 'La fecha de fin no puede ser anterior a la fecha de inicio'
  }

  return ''
}

// Valida que la hora de inicio sea correcta
export const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const options = { day: 'numeric', month: 'short' }
  return `${start.toLocaleDateString('es-ES', options)} - ${end.toLocaleDateString('es-ES', options)}, ${end.getFullYear()}`
}

// Formatea la hora en formato HH:MM
export const formatTime = (date, time) => {
  return `${time}`
}

// Formatea la fecha y hora en formato "Día de la semana, HH:MM"
export const formatDateTime = (date, time) => {
  const dateObj = new Date(`${date}T${time}`)
  const options = { weekday: 'long', hour: 'numeric', minute: 'numeric' }
  return dateObj.toLocaleDateString('es-ES', options)
}

// Filtra los planes por nombre
export function filterByName(plans, nameSearch) {
  if (!plans) return []
  nameSearch = nameSearch.trim().toLowerCase()
  return plans.filter((plan) => plan.name.toLowerCase().includes(nameSearch))
}

export const updatePlanActivity = async (
  plan,
  currentEditingIndex,
  updatedActivity,
  updatePlanFunction,
) => {
  if (!plan) return null

  const updatedActivities = [...plan.activities]
  updatedActivities[currentEditingIndex] = updatedActivity

  const updatedPlan = {
    ...plan,
    activities: updatedActivities,
  }

  try {
    await updatePlanFunction(updatedPlan)
    return updatedPlan
  } catch (error) {
    console.error('Error al actualizar la actividad:', error)
    return null
  }
}

export const getPlanFromRoute = async (route, getPlanById) => {
  const planId = route.params.id
  try {
    return await getPlanById(planId)
  } catch (error) {
    console.error('Error al obtener el itinerario', error)
    return null
  }
}

// función para generar IDs únicos para las actividades.
export const createUniqueId = () => {
  return Date.now()
}

// función para manejar la navegación entre pasos.
export const handleStepNavigation = (currentStep, totalSteps, direction) => {
  if (direction === 'next' && currentStep < totalSteps - 1) {
    return currentStep + 1
  } else if (direction === 'previous' && currentStep > 0) {
    return currentStep - 1
  }
  return currentStep
}
// función para añadir una nueva actividad al formulario.
export const addActivityToForm = (formData, activity) => {
  return {
    ...formData,
    activities: [
      ...formData.activities,
      {
        ...activity,
        id: createUniqueId(),
      },
    ],
  }
}

export const togglePublic = (isPublic) => {
  return !isPublic
}

export const createItinerary = async (formData, postPlan, router) => {
  try {
    await postPlan(formData)
    console.log('Itinerario creado')
    router.push('/my-plans')
  } catch (error) {
    console.log(error)
    // You might want to handle the error more gracefully here
    // For example, return an error message to display to the user
    return 'Error al crear el itinerario'
  }
}
