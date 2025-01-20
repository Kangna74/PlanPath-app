<script setup>
import { useCurrentUser } from 'vuefire'

const user = useCurrentUser()
</script>

<template>
  <p v-if="user">Hello {{ user.providerData.displayName }}</p>
</template>
