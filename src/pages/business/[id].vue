<script setup lang="ts">
const route = useRoute()
const businessId = computed(() => Number(route.params.id))
const businessStore = useBusinessStore()
const business = businessStore.getBusinessById(businessId.value)
const uiStore = useUIStore()

onMounted(() => {
  uiStore.pagePosition = 3
})
</script>

<template>
  <div class="business-wrapper">
    <div pb-48>
      <BusinessCard :business-id="businessId" />
    </div>
  </div>
</template>

<style scoped>
.business-wrapper {
  max-height: 100vh;
  overflow-y: scroll;
  padding-bottom: 56px;
}
</style>
