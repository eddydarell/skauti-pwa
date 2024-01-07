<script setup lang="ts">
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

const props = defineProps({
  business: {
    type: Object,
    required: true,
  },
})

const businessStore = useBusinessStore()
const { navigateTo } = useNavigation()

dayjs.extend(isBetween)

const { t } = useI18n()
const primaryAddress = computed(() => {
  const primaryAddress = props.business.addresses.find(
    address => address.isPrimary,
  )
  return primaryAddress ?? props.business.addresses[0]
})

const mainCategory = computed(() => props.business.categories[0])
const formattedDistance = computed(() => {
  const distance = props.business.distance
  if (distance < 1)
    return `${Math.round(distance * 1000)} m`

  return `${distance.toFixed(2)} km`
})

const fullAddress = computed(() =>
  `${primaryAddress.value.street}, ${primaryAddress.value.city}, ${primaryAddress.value.country}`,
)
const averageRating = computed(() => getAverageRating())
const reviewCount = computed(() => {
  if (props.business.reviews)
    return props.business.reviews.length

  else
    return 0
})
const hasRating = computed(() => reviewCount.value > 0 && props.business.reviews[0]?.id !== null)

function getAverageRating() {
  const ratings = props.business.reviews.map(review => review.rating)
  const average = ratings.reduce((a, b) => a + b, 0) / ratings.length
  return average.toFixed(1)
}

const isBusinessOpen = computed(() => {
  const oh = JSON.parse(props.business.opening_hours)
  const now = dayjs()
  const start = now.set('hour', oh.start.split(':')[0]).set('minute', oh.start.split(':')[1])
  const end = now.set('hour', oh.end.split(':')[0]).set('minute', oh.end.split(':')[1])
  return now.isBetween(start, end)
})

function openBusiness() {
  businessStore.selectedBusiness = props.business
  // useUIStore().businessSelected = true
  navigateTo(`/business/${props.business.id}`)
}

// TODO: add visibility guards for website, email, phone, and social media links
</script>

<template>
  <v-card flat class="business-card" @click="openBusiness">
    <v-card-title>
      {{ business.name }}
      <v-icon
        :title="t('title.your-business-has-not-yet-been-verified')"
        :icon="business?.is_verified ? `i-carbon-checkmark-filled` : `i-carbon-checkmark-outline-error`"
        :color="business?.is_verified ? 'green-darken-2' : 'red-darken-2'"
        size="24"
        @click="openVerificationDialog"
      />
      <v-avatar v-if="business?.logo" size="48" style="position:absolute; top:0; right: 0;" mr-4 mt-2>
        <v-img alt="user" :src="business.logo" />
      </v-avatar>
    </v-card-title>
    <v-card-subtitle>
      {{ mainCategory?.name }}
    </v-card-subtitle>
    <v-card-subtitle>
      {{ formattedDistance }} ~ {{ fullAddress }}
    </v-card-subtitle>
    <!-- <v-card-text>

    </v-card-text> -->
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
  </v-card>
</template>

<style scoped>
.business-card {
  width: 100%;
}
</style>
