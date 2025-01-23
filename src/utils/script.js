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

export function filterByName(plans, nameSearch) {
  if (!plans) return [];
  nameSearch = nameSearch.trim().toLowerCase();
  return plans.filter(plan => plan.name.toLowerCase().includes(nameSearch));
}
