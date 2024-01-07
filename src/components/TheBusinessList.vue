<script setup lang="ts">
const businessStore = useBusinessStore()
const uiStore = useUIStore()

onMounted(() => {
  if (uiStore.searchActive)
    uiStore.pagePosition = 2
})
</script>

<template>
  <v-sheet
    class="list-container mx-auto"
  >
    <transition-group tag="ul" name="list" appear>
      <li
        v-for="business in businessStore.businesses"
        :key="business.id"
      >
        <BusinessListItem
          :business="business"
        />
        <v-divider color="green" />
      </li>
    </transition-group>
  </v-sheet>
</template>

<style scoped>
.list-container {
  /* background: #fff3e0; */
  padding-bottom: 600px;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(50px);
}

.list-enter-active {
  transition:
    opacity 0.3s ease-in-out,
    transform 0.3s ease-in-out;
}
.list-leave-active {
  transition:
    opacity 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  position: absolute;
}

.list-move {
  transition: transform 0.3s ease-in-out;
}

.list-move-from,
.list-move-to {
  opacity: 0;
  position: absolute;
}
.list-move-active {
  transition: transform 0.3s ease-in-out;
}
</style>
