<template>
  <nav aria-label="Breadcrumb" class="text-sm font-medium">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li v-for="(crumb, index) in breadcrumbs" :key="index" class="inline-flex items-center">
        <template v-if="index === 0">
          <RouterLink
            :to="crumb.path"
            class="inline-flex items-center text-gray-700 hover:text-blue-600"
          >
            <svg
              class="w-3 h-3 mr-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
              />
            </svg>
            {{ crumb.name }}
          </RouterLink>
        </template>
        <template v-else>
          <svg
            class="w-3 h-3 text-gray-400 mx-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <a
            v-if="index !== breadcrumbs.length - 1"
            @click="navigateTo(crumb)"
            class="ml-1 text-gray-700 hover:text-blue-600 md:ml-2 cursor-pointer"
          >
            {{ crumb.name }}
          </a>
          <span v-else class="ml-1 text-gray-500 md:ml-2">{{ crumb.name }}</span>
        </template>
      </li>
    </ol>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'BreadCrumbsComponent',
  props: {
    customName: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()

    const breadcrumbs = computed(() => {
      let pathArray = route.path.split('/')
      pathArray = pathArray.filter((el) => el !== '')

      let breadcrumbs = [
        {
          path: '/',
          name: 'Inicio',
        },
      ]

      let path = ''
      for (let i = 0; i < pathArray.length; i++) {
        path += `/${pathArray[i]}`
        if (i === pathArray.length - 1 && props.customName) {
          breadcrumbs.push({
            path: path,
            name: props.customName,
          })
        } else {
          breadcrumbs.push({
            path: path,
            name:
              route.matched[i + 1]?.meta?.breadcrumb ||
              pathArray[i].charAt(0).toUpperCase() + pathArray[i].slice(1),
          })
        }
      }

      return breadcrumbs
    })

    const navigateTo = (crumb) => {
      if (crumb.name === 'Itinerary') {
        router.go(-1) // Vuelve a la página anterior
      } else {
        router.push(crumb.path)
      }
    }

    return {
      breadcrumbs,
      navigateTo,
    }
  },
}
</script>
