<template>
  <RouterView v-slot="{ Component }">
    <Transition name="route" mode="out-in" appear>
      <component :is="Component" data-debug="This" />
    </Transition>
  </RouterView>
</template>

<style scoped>
.route-enter-active,
.route-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.route-enter-from,
.route-leave-to {
  opacity: 0;
}

/* .route-fade-enter-active,
.route-fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.route-fade-enter-from,
.route-fade-leave-to {
  opacity: 0;
} */
</style>
