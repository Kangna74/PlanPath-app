import { ref } from 'vue'

const plans = ref([])

export const planService = {
  getPlans() {
    return plans
  },
  getPlanById(id) {
    return new Promise((resolve) => {
      const foundPlan = plans.value.find((plan) => plan.id === id)
      resolve(foundPlan || null)
    })
  },
  addPlan(plan) {
    const newPlan = {
      id: Date.now().toString(), // Aseguramos que el ID sea una cadena
      ...plan,
      createdAt: new Date().toISOString(),
    }
    plans.value.push(newPlan)
    return newPlan
  },
  deletePlan(id) {
    const index = plans.value.findIndex(plan => plan.id === id)
    if (index !== -1) {
      plans.value.splice(index, 1)
    }
  },
}
