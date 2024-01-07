<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <v-sheet id="info-container">
    <v-row>
      <v-col cols="4" offset="4" mx-auto>
        <v-alert variant="tonal" type="info" icon="i-carbon-application-mobile">
          {{ t('messages.mobile-optimized') }}.
        </v-alert>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped>
#info-container {
  position: fixed;
  bottom: 56px;
  left: 0;
  width: 100vw;
  height: 500px;
}

#info-container .v-sheet {
  height: 100%;
  max-height: 400px;
}
</style>
