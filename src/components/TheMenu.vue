<script setup lang="ts">
const notifications = ref(false)
const sound = ref(false)
const widgets = ref(false)
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="useUIStore().menuActive" fullscreen :scrim="false" transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="orange-darken-4">
          <v-btn icon dark @click="useUIStore().menuActive = false">
            <v-icon icon="i-carbon-close" />
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn variant="text" @click="useUIStore().menuActive = false">
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list lines="two" subheader>
          <v-list-subheader>User Controls</v-list-subheader>
          <v-list-item
            title="Content filtering"
            subtitle="Set the content filtering level to restrict apps that can be downloaded"
          />
          <v-list-item
            title="Password"
            subtitle="Require password for purchase or use password to restrict purchase"
          />
        </v-list>
        <v-divider />
        <v-list lines="two" subheader>
          <v-list-subheader>General</v-list-subheader>
          <v-list-item title="Notifications" subtitle="Notify me about updates to apps or games that I downloaded">
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
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped>
</style>
