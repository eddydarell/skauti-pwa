<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <v-card>
    <v-card-title>{{ t('titles.no-results') }}</v-card-title>
    <v-card-text>
      {{ t('paragraphs.this-search-gave-no-results') }}
      <br>
      {{ t('paragraphs.you-can-try') }}
    </v-card-text>
  </v-card>
</template>

<style scoped>
</style>
