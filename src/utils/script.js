
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

export const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const options = { day: 'numeric', month: 'short' }
  return `${start.toLocaleDateString('es-ES', options)} - ${end.toLocaleDateString('es-ES', options)}, ${end.getFullYear()}`
}

export const formatTime = (date, time) => {
  return `${time}`
}


export const formatDateTime = (date, time) => {
  const dateObj = new Date(`${date}T${time}`);
  const options = { weekday: 'long', hour: 'numeric', minute: 'numeric' };
  return dateObj.toLocaleDateString('es-ES', options);
};

