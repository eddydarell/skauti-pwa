<script setup lang="ts">
import { useEventBus } from '@vueuse/core'

const uiStore = useUIStore()
const businessStore = useBusinessStore()
const bus = useEventBus<string>('map-events')

const hasBusinesses = computed(() => businessStore.businesses?.length > 0)

onMounted(() => {
  if (uiStore.searchActive)
    bus.emit('fit-business-list-markers')
})
</script>

<template>
  <div>
    <TheSearchBox pa-4 />
    <transition name="show-slide" appear mode="out-in">
      <NoResults v-if="uiStore.searchActive && !hasBusinesses" />
      <div v-else-if="uiStore.searchActive && hasBusinesses" class="list-wrapper">
        <TheBusinessList />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.main-pane {
  /* position: absolute; */
  bottom: 0;
  left: 0;
  width: 100%;
}
.list-wrapper {
  max-height: 100vh;
  overflow-y: scroll;
}

.show-slide-enter-active {
  transition: all 0.3s ease-in-out;
}
.show-slide-leave-active {
  transition: all 0.3s ease-in-out;
}
.show-slide-enter-from,
.show-slide-leave-to {
  opacity: 0;
  transform: translateY(50px);
}
</style>
