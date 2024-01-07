<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <v-card flat>
    <v-card-title>{{ t('t-titles.nothing-to-show') }}</v-card-title>
    <v-card-text>{{ t('paragraphs.try-searching-for-a-business') }}</v-card-text>
    <v-card-text>{{ t('paragraphs.or-try-searching-in-a-wider-radius') }}</v-card-text>
  </v-card>
</template>

<style scoped>
</style>
