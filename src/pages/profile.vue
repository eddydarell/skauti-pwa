<script setup lang="ts">
const uiStore = useUIStore()
onMounted(() => {
  uiStore.pagePosition = 3
})
</script>

<template>
  <v-row>
    <v-col class="align-center" pa-4>
      <h1>Profile</h1>
      <p>Currently under construction...</p>
    </v-col>
  </v-row>
</template>

<style scoped>
</style>
