<script setup lang="ts">
import { useEventBus } from '@vueuse/core'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import SocialMediaLink from './SocialMediaLink.vue'

const props = defineProps({
  businessId: {
    type: Number,
    required: true,
  },
})

const show = ref(true)

dayjs.extend(isBetween)

const businessStore = useBusinessStore()
const business = computed(() => {
  return businessStore.businesses.find(business => business.id === props.businessId)
})
const bus = useEventBus<string>('map-events')
const { t } = useI18n()
const { navigateTo } = useNavigation()
const primaryAddress = computed(() => {
  const primaryAddress = business.value?.addresses.find(
    address => address.isPrimary,
  )
  return primaryAddress ?? business.value?.addresses[0]
})

const mainCategory = computed(() => business.value?.categories[0])
const averageRating = computed(() => getAverageRating())
const reviewCount = computed(() => {
  if (business.value?.reviews)
    return business.value?.reviews.length

  else
    return 0
})
const hasRating = computed(() => reviewCount.value > 0 && business.value?.reviews[0]?.id !== null)

function getAverageRating() {
  const ratings = business.value?.reviews.map(review => review.rating)
  const average = ratings.reduce((a, b) => a + b, 0) / ratings.length
  return average.toFixed(1)
}

const truncatedDescription = computed(() =>
  business.value?.description.length > 100
    ? `${business.value?.description.substring(0, 100)} ...`
    : business.value?.description,
)
const fullAddress = computed(() =>
  `${primaryAddress.value.street}, ${primaryAddress.value.city}, ${primaryAddress.value.country}`,
)
const openingHours = computed(() => {
  const oh = JSON.parse(business.value?.opening_hours)
  return oh.start
    ? `${oh.start
      } - ${
      oh.end}`
    : t('info.not-available')
})

const isBusinessOpen = computed(() => {
  const oh = JSON.parse(business.value?.opening_hours)
  const now = dayjs()
  const start = now.set('hour', oh.start.split(':')[0]).set('minute', oh.start.split(':')[1])
  const end = now.set('hour', oh.end.split(':')[0]).set('minute', oh.end.split(':')[1])
  return now.isBetween(start, end)
})

function goBack() {
  navigateTo('/')
}
onMounted(() => {
  bus.emit('focus-business-marker')
})
// TODO: add visibility guards for website, email, phone, and social media links
</script>

<template>
  <v-card>
    <v-row>
      <v-col cols="12" pa-4>
        <v-btn icon variant="text" @click="goBack">
          <v-icon icon="i-carbon-arrow-left" />
        </v-btn>
      </v-col>
    </v-row>
    <!-- <v-img v-if="business?.cover" :src="business.cover" height="160px" cover class="cover" @click="openBusiness" /> -->
    <v-card-title>
      <v-avatar v-if="business?.logo" size="48">
        <v-img alt="user" :src="business.logo" />
      </v-avatar>
      {{ business.name }}
      <v-icon
        :title="t('title.your-business-has-not-yet-been-verified')"
        :icon="business?.is_verified ? `i-carbon-checkmark-filled` : `i-carbon-checkmark-outline-error`"
        :color="business?.is_verified ? 'green-darken-2' : 'red-darken-2'"
        size="24"
        @click="openVerificationDialog"
      />
    </v-card-title>
    <v-card-subtitle>
      <v-chip :color="mainCategory?.color">
        {{ mainCategory?.name }}
      </v-chip>
    </v-card-subtitle>
    <v-card-actions px-4>
      <div v-if="!hasRating">
        <small class="text-subtitle" color="gray">{{ t('titles.no-ratings-yet') }}</small>
      </div>
      <div v-else>
        <v-rating
          readonly
          :length="5"
          size="small"
          :model-value="averageRating"
          empty-icon="i-carbon-star"
          full-icon="i-carbon-star-filled"
          half-icon="i-carbon-star-half"
          half-increments
          color="#E65100"
          active-color="#E65100"
          density="compact"
        /> <small class="text-subtitle" color="gray" ml-2 pt-2>{{ averageRating }} ({{ reviewCount }})</small>
      </div>

      <v-spacer />
      <v-chip v-if="isBusinessOpen" color="green darken-3" text-color="white">
        {{ t('labels.open') }}
      </v-chip>
      <v-chip v-else color="red lighten-3" text-color="white">
        {{ t('labels.closed') }}
      </v-chip>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider />
        <v-card-text>
          {{ truncatedDescription }}
          <v-divider class="mx-4 my-2" />
          <v-row>
            <v-col cols="6">
              <v-icon mb-1 size="x-small" icon="i-carbon-location" color="orange-darken-3" />
              {{ fullAddress }}
            </v-col>
            <v-col cols="6">
              <v-icon mb-1 size="x-small" icon="i-carbon-phone" color="orange-darken-3" />
              {{ business.phone }}
            </v-col>
          </v-row>
          <v-divider class="mx-4 my-2" />
          <v-row>
            <v-col cols="12">
              <v-icon mb-1 size="x-small" icon="i-carbon-email" color="orange-darken-3" />
              {{ business.email }}
            </v-col>
          </v-row>
          <v-divider class="mx-4 my-2" />
          <v-row>
            <v-col cols="12">
              <v-icon mb-1 size="x-small" icon="i-carbon-globe" color="orange-darken-3" />
              {{ business.website }}
            </v-col>
          </v-row>
          <v-divider class="mx-4 my-2" />
          <v-row>
            <v-col cols="6">
              <v-icon mb-1 size="x-small" icon="i-carbon-time" color="orange-darken-3" />
              {{ openingHours }}
            </v-col>
          </v-row>
          <v-divider class="mx-4 my-2" />
          <v-row>
            <v-col>
              <SocialMediaLink v-for="link in business.social_medias" :key="link" :link="link" mb-0 />
            </v-col>
          </v-row>
        </v-card-text>
      </div>
    </v-expand-transition>
    <v-divider inset />
    <ReviewCard :business-id="business.id" />
  </v-card>
</template>

<style scoped>
</style>
