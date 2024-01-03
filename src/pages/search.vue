<script setup lang="ts">
const uiStore = useUIStore()

onMounted(() => {
  uiStore.pagePosition = 2
})
</script>

<template>
  <TheSearchBox pa-4 />
  <TheBusinessList />
</template>

<style scoped>

</style>
