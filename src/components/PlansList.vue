<template>
  <div v-for="day in days" :key="day.id">
    <h3>{{ day.date }}</h3>
    <ul>
      <li v-for="activity in day.activities" :key="activity.id">
        {{ activity.description }}
        <div class="flex space-x-2">
          <button class="text-gray-400 hover:text-gray-600 p-1" @click="editActivity(activity.id)">
            <PencilIcon class="h-4 w-4" />
          </button>
          <button class="text-gray-400 hover:text-gray-600 p-1" @click="deleteActivity(activity.id)">
            <TrashIcon class="h-4 w-4" />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    days: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const editActivity = (activityId) => {
      // Implement edit functionality here
      console.log('Editing activity:', activityId)
    }

    const deleteActivity = (activityId) => {
      // Implement delete functionality here
      console.log('Deleting activity:', activityId)
    }
    return { editActivity, deleteActivity }
  }
}
</script>
<!-- <script>



const days = ref([
  {
    id: 1,
    date: '2024-03-08',
    activities: [
      { id: 1, description: 'Meeting with John' },
      { id: 2, description: 'Work on project X' },
    ],
  },
  {
    id: 2,
    date: '2024-03-09',
    activities: [
      { id: 3, description: 'Grocery shopping' },
      { id: 4, description: 'Gym' },
    ],
  },
]);

const editActivity = (activityId) => {
  // Implement edit functionality here
  console.log('Editing activity:', activityId)
}

const deleteActivity = (activityId) => {
  // Implement delete functionality here
  console.log('Deleting activity:', activityId)
  days.value = days.value.map(day => ({
    ...day,
    activities: day.activities.filter(activity => activity.id !== activityId)
  }))
}
</script> -->
