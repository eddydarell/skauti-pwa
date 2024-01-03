<script setup lang="ts">
const businessStore = useBusinessStore()
const hasBusinesses = computed(() => businessStore.businesses.length > 0)
const uiStore = useUIStore()
const model = ref([])
const isFirstLoad = ref(true)

onMounted(() => {
  if (uiStore.searchActive)
    uiStore.pagePosition = 2
})
</script>

<template>
  <v-sheet
    class="list-container mx-auto"
  >
    <!-- <transition name="slide-fade" appear mode="out-in"> -->
    <v-card v-if="!hasBusinesses">
      <v-card-title>No business</v-card-title>
      <v-card-text>Please search for something else</v-card-text>
    </v-card>
    <!-- <v-card v-else-if=" isFirstLoad">
        <v-card-title>No business</v-card-title>
        <v-card-text>Please search for something else</v-card-text>
      </v-card> -->
    <div v-else>
      <ul>
        <li
          v-for="business in businessStore.businesses"
          :key="business.id"
        >
          <BusinessListItem
            :business="business"
          />
          <v-divider color="green" />
        </li>
      </ul>
    </div>
    <!-- </transition> -->
  </v-sheet>
</template>

<style scoped>
.v-slide-group {
  padding: 0 !important;
}
.list-container {
  /* background: #fff3e0; */
  padding-bottom: 600px;
}

.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
