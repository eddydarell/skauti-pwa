<script setup lang="ts">
const categoryStore = useCategoryStore()

onBeforeMount(async () => {
  await categoryStore.fetchAllCategories()
})
</script>

<template>
  <div>
    <TheMainPane />
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
