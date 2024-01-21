<script setup lang="ts">
const categoryStore = useCategoryStore()

onBeforeMount(async () => {
  await categoryStore.fetchAllCategories()
})
</script>

<template>
  <TheMainPane />
</template>

<route lang="yaml">
meta:
  layout: default
</route>
