import { ref } from 'vue'

const plans = ref([])

export const planService = {
  getPlans() {
    return plans
  },
  getPlanById(id) {
    console.log('Buscando plan con id:', id)
    const foundPlan = plans.value.find(plan => plan.id === id)
    console.log('Plan encontrado:', foundPlan)
    return foundPlan
  },
  addPlan(plan) {
    const newPlan = {
      id: Date.now(),
      ...plan,
      createdAt: new Date().toISOString()
    }
    plans.value.push(newPlan)
    return newPlan
  }
}

