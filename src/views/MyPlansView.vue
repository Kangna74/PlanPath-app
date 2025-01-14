<template>
  <div class="min-h-screen bg-gray-50 flex items-start justify-center p-6">
    <div class="w-full max-w-2xl">
      <!-- Main Content -->
      <h1 class="text-2xl font-semibold text-gray-900 mb-6">
        Mis Itinerarios
      </h1>

      <!-- Empty State Card -->
      <EmptyPlan />
      <PlansList />
    </div>
  </div>
</template>

<script setup>
import EmptyPlan from '@/components/EmptyPlan.vue'
import PlansList from '@/components/PlansList.vue';
// No additional imports needed
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
