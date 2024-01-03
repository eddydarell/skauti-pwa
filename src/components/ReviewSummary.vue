<script setup lang="ts">
const props = defineProps({
  reviews: {
    type: Object,
    required: true,
  },
})
const { t } = useI18n()

console.log(props.reviews.value)

const averageRating = computed(() => getAverageRating())
const maxRating = computed(() => Math.max(...props.reviews.map(review => review.rating)))
const reviewCount = computed(() => props.reviews.length)
const ratingAggregatePerRating = computed(() => {
  const ratings = props.reviews.map(review => review.rating)
  const ratingAggregate = ratings.reduce((acc, curr) => {
    if (typeof acc[curr] == 'undefined')
      acc[curr] = 1

    else
      acc[curr] += 1

    return acc
  }, {})
  return ratingAggregate
})

function getAverageRating() {
  const ratings = props.reviews.map(review => review.rating)
  const average = ratings.reduce((a, b) => a + b, 0) / ratings.length
  return average.toFixed(1)
}
</script>

<template>
  <v-card
    class="d-flex flex-column mx-auto"
    flat py-4
  >
    <div class="d-flex text-h5 mt-auto justify-center">
      {{ t('titles.rating-overview') }}
    </div>

    <div class="d-flex align-center flex-column my-auto">
      <div class="text-h2 mt-5">
        {{ averageRating }}
        <span class="text-h6 ml-n3">/5</span>
      </div>

      <v-rating
        :model-value="averageRating"
        color="orange-darken-4"
        empty-icon="i-carbon-star"
        full-icon="i-carbon-star-filled"
        half-icon="i-carbon-star-half"
      />
      <div class="px-3">
        {{ reviewCount }} {{ t('paragraphs.ratings') }}
      </div>
    </div>

    <v-list
      bg-color="transparent"
      class="d-flex flex-column-reverse"
      density="compact"
    >
      <v-list-item v-for="(rating, i) in ratingAggregatePerRating" :key="i">
        <v-progress-linear
          :model-value="rating * 15"
          class="mx-n5"
          color="orange-darken-4"
          height="10"
          rounded
        />

        <template #prepend>
          <span style="display:inline-block; width: 10px;">{{ i }}</span>
          <v-icon color="orange-darken-4" icon="i-carbon-star-filled" class="mx-3" />
        </template>

        <template #append>
          <div class="rating-values">
            <span class="d-flex justify-end"> {{ rating }} </span>
          </div>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style scoped>
</style>
