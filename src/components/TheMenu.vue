<script setup lang="ts">
const { t } = useI18n()
const searchStore = useSearchStore()
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="useUIStore().menuActive" fullscreen :scrim="false" transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="orange-darken-4">
          <v-btn dark icon @click="useUIStore().menuActive = false">
            <v-icon icon="i-carbon-close" />
          </v-btn>
          <v-toolbar-title>{{ t('titles.settings') }}</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn variant="text" @click="useUIStore().menuActive = false">
              {{ t('labels.save') }}
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list lines="two" subheader>
          <v-list-subheader>{{ t('labels.information') }}</v-list-subheader>
          <v-list-item
            :title="t('labels.search-radius')"
            :subtitle="t('labels.search-radius-description')"
          />
          <v-list-item
            :title="t('labels.business-visibility-radius')"
            :subtitle="t('labels.business-visibility-radius-description')"
          />
        </v-list>
        <v-divider />
        <v-list lines="two" subheader>
          <v-list-subheader>{{ t('labels.general-settings') }}</v-list-subheader>
          <v-list-item :title="t('titles.search-radius')">
            <template #append>
              {{ searchStore.radius }} {{ t('labels.km') }}
            </template>
            <template #subtitle>
              <v-slider
                v-model="searchStore.radius"
                step="10"
                min="10"
                max="500"
                color="orange-darken-4"
                track-color="gray-darken-2"
                thumb-color="orange-darken-4"
                ticks="true"
                density="compact"
                py-4
              />
            </template>
          </v-list-item>
          <!-- <v-list-item title="Notifications" subtitle="Notify me about updates to apps or games that I downloaded">
            <template #prepend>
              <v-checkbox v-model="notifications" />
            </template>
          </v-list-item>
          <v-list-item title="Sound" subtitle="Auto-update apps at any time. Data charges may apply">
            <template #prepend>
              <v-checkbox v-model="sound" />
            </template>
          </v-list-item>
          <v-list-item title="Auto-add widgets" subtitle="Automatically add home screen widgets">
            <template #prepend>
              <v-checkbox v-model="widgets" />
            </template>
          </v-list-item> -->
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped>
</style>
