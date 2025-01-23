
// Obtiene la fecha actual en formato YYYY-MM-DD
export const getCurrentDate = () => {
  const now = new Date()
  return now.toISOString().split("T")[0]
}

// Valida que las fechas de inicio y fin sean correctas
export const validateDate = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const current = new Date()
  current.setHours(0, 0, 0, 0)

  if (start < current) {
    return "La fecha de inicio no puede ser anterior a hoy"
  }

  if (endDate && end < start) {
    return "La fecha de fin no puede ser anterior a la fecha de inicio"
  }

  return ""
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
  const dateObj = new Date(`${date}T${time}`);
  const options = { weekday: 'long', hour: 'numeric', minute: 'numeric' };
  return dateObj.toLocaleDateString('es-ES', options);
};

// Filtra los planes por nombre
export function filterByName(plans, nameSearch) {
  if (!plans) return [];
  nameSearch = nameSearch.trim().toLowerCase();
  return plans.filter(plan => plan.name.toLowerCase().includes(nameSearch));
}

// Actualiza la actividad de un plan
export const updatePlanActivity = async (plan, currentEditingIndex, updatedActivity, updatePlanFunction) => {
  if (!plan) return null;

  const updatedActivities = [...plan.activities];
  updatedActivities[currentEditingIndex] = updatedActivity;

  const updatedPlan = {
    ...plan,
    activities: updatedActivities
  };

  try {
    await updatePlanFunction(updatedPlan);
    return updatedPlan;
  } catch (error) {
    console.error('Error al actualizar la actividad:', error);
    return null;
  }
};

// Elimina la actividad de un plan
export const getPlanFromRoute = async (route, getPlanById) => {
  const planId = route.params.id;
  try {
    return await getPlanById(planId);
  } catch (error) {
    console.error('Error al obtener el itinerario', error);
    return null;
  }
};
