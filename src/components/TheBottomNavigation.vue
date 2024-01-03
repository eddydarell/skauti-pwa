<script setup lang="ts">
const value = ref(1)
const { navigateTo } = useNavigation()
</script>

<template>
  <v-layout class="overflow-visible" style="height: 56px;">
    <v-bottom-navigation v-model="value" bg-color="orange-darken-4" mode="shift" grow>
      <v-btn @click="() => navigateTo('/favorites')">
        <v-icon icon="i-carbon-favorite" />

        <span>Favorites</span>
      </v-btn>
      <v-btn @click="() => navigateTo('/')">
        <v-icon icon="i-carbon-map" />

        <span>Map</span>
      </v-btn>

      <v-btn @click="() => navigateTo('/profile')">
        <v-icon icon="i-carbon-user" />

        <span>Profile</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<style scoped>
</style>
