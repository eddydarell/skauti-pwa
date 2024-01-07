<script setup lang="ts">
import { useEventBus, useGeolocation, useStorage } from '@vueuse/core'
import { useDisplay } from 'vuetify'

const { coords, error, resume, isSupported } = useGeolocation()
const { t } = useI18n()
const { mobile } = useDisplay()
const bus = useEventBus<string>('app-events')

const step = ref(0)
const exitSetup = ref(false)
const setupState = useStorage('setup', {
  step: 0,
  setupDone: false,
})

function next() {
  if (step.value < 3) {
    step.value++
  }
  else {
    step.value++
    setTimeout(() => {
      exitSetup.value = true
      setupState.value.setupDone = true
      setupState.value.step = step.value
      setTimeout(() => {
        bus.emit('setup-done')
      }, 300)
    }, 1500)
  }
}
</script>

<template>
  <v-sheet id="setup-container">
    <v-row>
      <v-col
        cols="12"
        xxl="4"
        xl="4"
        lg="6"
        md="6"
        sm="10"
        offset-xxl="4"
        offset-xl="4"
        offset-lg="3"
        offset-md="3"
        offset-sm="1"
        mx-auto
      >
        <v-stepper
          v-model="step"

          flat show-actions
          :mobile="mobile"
        >
          <v-stepper-header elevation-0>
            <v-stepper-item
              title="Welcome"
              value="1"
            />
            <v-stepper-item
              :rules="[() => !!coords || !!error || !!isSupported]"
              :subtitle="!isSupported || !!error ? 'Missing location information' : ''"
              title="Location"
              value="2"
            />
            <v-stepper-item
              :rules="[() => !!coords || !!error || !!isSupported]"
              :subtitle="!isSupported || !!error ? 'Missing location information' : ''"
              title="Attributions"
              value="3"
            />
            <v-stepper-item
              title="Terms of Service"
              value="4"
            />
            <v-stepper-item
              title="Done"
              value="5"
            />
          </v-stepper-header>
          <v-stepper-window>
            <v-stepper-window-item value="1">
              <h4 class="text-h6">
                {{ t('titles.welcome') }}
              </h4>

              <v-sheet>
                <v-card flat>
                  <v-card-text pa-0>
                    {{ t('messages.welcome') }}
                    <br> <br>
                    <!-- {{ t('messages.welcome2') }}
                  <br> <br> -->
                    {{ t('messages.welcome3') }}
                  </v-card-text>
                </v-card>
              </v-sheet>
            </v-stepper-window-item>

            <v-stepper-window-item value="2">
              <h4 class="text-h6">
                {{ t('titles.location') }}
              </h4>

              <v-sheet>
                <v-card flat>
                  <v-card-text pa-0>
                    {{ t('messages.location') }}
                    <br> <br>
                    {{ t('messages.location2') }}
                    <v-divider ma-2 />
                    <v-alert
                      v-if="isSupported && !error"
                      closable
                      icon="i-carbon-location-person"
                      :title="t('messages.location3')"
                      type="success"
                      prominent
                      variant="tonal"
                    >
                      {{ t('messages.location4') }}
                      <br>
                      {{ t('messages.click-next') }}
                    </v-alert>

                    <v-alert
                      v-if="error"
                      v-card-text
                      closable
                      icon="i-carbon-location-hazard"
                      prominent
                      :title="t('messages.location5')"
                      type="error"
                      variant="tonal"
                    >
                      {{ t('messages.location6') }}
                      <a href="#">
                        {{ t('messages.here') }}
                      </a>
                      <v-divider pa-2 />

                      <v-btn variant="text" @click.prevent="resume">
                        {{ t('buttons.try-again') }}
                      </v-btn>
                    </v-alert>
                  </v-card-text>
                </v-card>
              </v-sheet>
            </v-stepper-window-item>
            <v-stepper-window-item value="3">
              <h4 class="text-h6">
                {{ t('titles.attributions') }}
              </h4>

              <v-sheet>
                <v-card flat>
                  <v-card-text pa-0>
                    {{ t('messages.attributions') }}:
                    <v-list lines="two">
                      <v-list-item>
                        <v-list-item-title>Open Street Map</v-list-item-title>

                        <v-list-item-subtitle>
                          &copy; <a href="http://www.openstreetmap.org/copyright">Map data © OpenStreetMap contributors, licensed under CC-BY-SA</a>
                        </v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>Open Street Map France</v-list-item-title>

                        <v-list-item-subtitle>
                          © OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France.
                        </v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>Leaflet</v-list-item-title>

                        <v-list-item-subtitle>
                          <a href="https://leafletjs.com/index.html" target="blank">Leaflet</a> is the leading open-source JavaScript library for mobile-friendly interactive maps.
                        </v-list-item-subtitle>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-title>Stadia </v-list-item-title>

                        <v-list-item-subtitle>
                          &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                          &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        </v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>ESRI </v-list-item-title>

                        <v-list-item-subtitle>
                          Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community
                        </v-list-item-subtitle>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-sheet>
            </v-stepper-window-item>
            <v-stepper-window-item value="4">
              <h4 class="text-h6">
                {{ t('titles.term-of-service') }}
              </h4>

              <v-sheet>
                <v-card flat>
                  <v-card-text pa-0>
                    <p><strong>Effective Date:</strong> Januari 2024</p>

                    <h2>1. Acceptance of Terms</h2>
                    <p>By using our mobile application ("the App"), you agree to comply with and be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the App.</p>

                    <h2>2. Description of Service</h2>
                    <p>The App provides location-based services utilizing the geolocation feature of your mobile device.</p>

                    <h2>3. User Responsibilities</h2>
                    <p>You agree to provide accurate and current information and to comply with all applicable laws and regulations regarding your use of the App. You are solely responsible for the security of your mobile device and for any actions taken under your account.</p>

                    <h2>4. Privacy</h2>
                    <p>Our Privacy Policy, available at [link to privacy policy], explains how we collect, use, and protect your personal information. By using the App, you consent to the terms of our Privacy Policy.</p>

                    <h2>5. Geolocation Data</h2>
                    <p>The App uses geolocation services to provide location-based features. You grant us the right to collect, use, and share your location data as outlined in our Privacy Policy.</p>

                    <h2>6. User Content</h2>
                    <p>You retain ownership of any content you submit through the App. By submitting content, you grant us a non-exclusive, royalty-free, worldwide, and perpetual license to use, display, and distribute the content within the App.</p>

                    <h2>7. Termination</h2>
                    <p>We reserve the right to suspend or terminate your access to the App at our discretion, without notice or liability.</p>

                    <h2>8. Modifications to Terms</h2>
                    <p>We may update these Terms at any time. By continuing to use the App after such changes, you agree to the modified Terms.</p>

                    <h2>9. Disclaimer of Warranties</h2>
                    <p>The App is provided "as is" without warranties of any kind. We do not warrant that the App will be error-free or uninterrupted.</p>

                    <h2>10. Limitation of Liability</h2>
                    <p>To the extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>

                    <h2>11. Governing Law</h2>
                    <p>These Terms are governed by and construed in accordance with the laws of [your jurisdiction].</p>

                    <h2>Contact Information</h2>
                    <p>For questions about these Terms, please contact us at [contact email].</p>
                  </v-card-text>
                </v-card>
              </v-sheet>
            </v-stepper-window-item>

            <v-stepper-window-item value="5">
              <h4 class="text-h6">
                <v-icon icon="i-carbon-checkmark-outline" mr-2 />{{ t('messages.confirm') }}
              </h4>
            </v-stepper-window-item>
          </v-stepper-window>
          <v-stepper-actions>
            <template #prev>
              <v-btn prepend-icon="i-carbon-arrow-left" variant="text" color="info" @click="step--">
                {{ t('buttons.previous') }}
              </v-btn>
            </template>
            <template #next>
              <v-btn append-icon="i-carbon-arrow-right" variant="text" color="success" @click="next">
                {{ t('buttons.next') }}
              </v-btn>
            </template>
          </v-stepper-actions>
        </v-stepper>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped>
#setup-container {
  position: fixed;
  bottom: 56px;
  left: 0;
  width: 100vw;
  height: 600px;
}

#setup-container .v-sheet {
  height: 100%;
  max-height: 600px;
  overflow-y: scroll;
}

.v-stepper-header {
  box-shadow: none !important;
}
</style>
