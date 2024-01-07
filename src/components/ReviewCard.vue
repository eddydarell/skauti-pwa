<script setup lang="ts">
import dayjs from 'dayjs'
import { faker } from '@faker-js/faker'

const props = defineProps({
  businessId: {
    type: Number,
    required: true,
  },
})
const userStore = useUserStore()
const reviewStore = useReviewStore()
const { t } = useI18n()
const reviews = [
  {
    id: 1,
    name: 'John Doe',
    rating: 4,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 2,
    name: 'Jane Doe',
    rating: 2,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 3,
    name: 'Gary Doe',
    rating: 3,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 4,
    name: 'Phillip Doe',
    rating: 3,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 5,
    name: 'Francis Doe',
    rating: 1,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 6,
    name: 'John Doe',
    rating: 4,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 7,
    name: 'John Doe',
    rating: 1,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 8,
    name: 'John Doe',
    rating: 4,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 9,
    name: 'Cody Doe',
    rating: 2,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 10,
    name: 'Rita Doe',
    rating: 5,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 11,
    name: 'John Doe',
    rating: 4,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 12,
    name: 'John Doe',
    rating: 4,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 13,
    name: 'John Doe',
    rating: 5,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 14,
    name: 'John Doe',
    rating: 2,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 15,
    name: 'John Doe',
    rating: 4,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 16,
    name: 'John Doe',
    rating: 3,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 17,
    name: 'John Doe',
    rating: 3,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 18,
    name: 'John Doe',
    rating: 4,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 19,
    name: 'John Doe',
    rating: 4,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 20,
    name: 'John Doe',
    rating: 4,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 21,
    name: 'John Doe',
    rating: 1,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 22,
    name: 'John Doe',
    rating: 4,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 23,
    name: 'John Doe',
    rating: 2,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 24,
    name: 'John Doe',
    rating: 5,
    review: 'Lorem ipsum dolor sit ame',
  },
  {
    id: 25,
    name: 'John Doe',
    rating: 5,
    review: 'Lorem ipsum dolor sit ame',
  },
]

const reviewText = ref('')
const rating = ref(0)
const showReviews = ref(false)
const userReview = ref(null)
const businessStore = useBusinessStore()
const isAnonymous = ref(false)

const businessReviews = computed(() => {
  return businessStore.getBusinessReviews(props.businessId)
})

const hasBusinessReviews = computed(() => {
  return businessReviews.value.length > 0 && businessReviews.value[0]?.id !== null
})

async function submitReview() {
  const formData = {
    business_id: props.businessId,
    review: reviewText.value,
    rating: rating.value,
    user_id: userStore.userDbId,
    is_anonymous: isAnonymous.value,
    reviewer: `${faker.person.firstName()} ${faker.person.lastName()}`,
  }

  await reviewStore.addReview(formData)
  // const { error, data } = await reviewStore.addReview(formData)
  // if (error.value)
  //   console.log(error.value)
  // else
  //   console.log(data.value)
}

onMounted(() => {
  userReview.value = reviews.find(review => review.user_id === userStore.userDbId)
})
</script>

<template>
  <v-sheet>
    <v-card v-if="!hasBusinessReviews" flat>
      <v-card-title>
        {{ t('titles.no-reviews-yet') }}
        <v-card-subtitle>
          {{ t('paragraphs.no-reviews-yet') }}
        </v-card-subtitle>
      </v-card-title>
    </v-card>
    <ReviewSummary v-else :reviews="businessReviews" />
    <v-divider ma-4 />
    <v-card v-if="userReview" flat>
      <v-card-title>
        {{ t('titles.your-review') }}
      </v-card-title>
      <v-card-text class="align-center" mb-0>
        <v-row>
          <v-col>
            <v-rating
              readonly
              :length="5"
              size="small"
              :model-value="userReview.rating"
              empty-icon="i-carbon-star"
              full-icon="i-carbon-star-filled"
              half-icon="i-carbon-star-half"
              color="#E65100"
              active-color="#E65100"
              density="compact"
            />
          </v-col>
          <v-col align="right">
            {{ dayjs(userReview.created_at).format('HH:mm, DD-MM-YYYY') }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              v-model="userReview.review"
              readonly
              label="Review"
              :hint="t('hints.review')"
              rows="3"
              variant="outlined"
              clearable
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card v-else>
      <v-card-title>
        {{ userStore.isUserLoggedIn ? t('titles.leave-a-review') : t('titles.login-to-leave-a-review') }}
      </v-card-title>
      <v-card-text v-if="userStore.isUserLoggedIn" class="align-center" mb-0>
        <v-form>
          <v-row>
            <v-col>
              <v-rating
                v-model="rating"
                :length="5"
                empty-icon="i-carbon-star"
                full-icon="i-carbon-star-filled"
                half-icon="i-carbon-star-half"
                color="#E65100"
                active-color="#E65100"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                v-model="reviewText"
                label="Review"
                :placeholder="t('hints.review')"
                rows="3"
                variant="solo"
                density="compact"
                clearable
                hide-details
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-checkbox
                v-model="isAnonymous"
                true-icon="i-mdi-checkbox-marked-outline"
                false-icon="i-mdi-checkbox-blank-outline"
                indeterminate-icon="i-mdi-minus-box-outline"
                color="blue-darken-2"
                density="compact"
                hide-details
              >
                <template #label>
                  <div @click.stop="">
                    {{ t('labels.anonymous') }}
                  </div>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-if="hasBusinessReviews"
          color="info"
          text
          :prepend-icon="showReviews ? 'i-carbon-chevron-up' : 'i-carbon-chevron-down'"
          @click="showReviews = !showReviews"
        >
          {{ showReviews ? t('buttons.hide-reviews') : t('buttons.show-reviews') }}
        </v-btn>
        <v-spacer />
        <v-btn
          v-if="userStore.isUserLoggedIn"
          color="success"
          variant="tonal"
          @click="submitReview"
        >
          {{ t('buttons.submit-review') }}
        </v-btn>
      </v-card-actions>
      <v-divider ma-4 />
      <v-expand-transition>
        <v-list v-show="showReviews" lines="three" px-4>
          <v-list-items v-for="review in businessReviews" :key="review.id">
            <v-list-item-content>
              <v-list-item-title>{{ review.is_anonymous ? t('titles.anonymous') : review.reviewer }}</v-list-item-title>
              <v-list-item-subtitle>
                <v-row>
                  <v-col>
                    <v-rating
                      readonly
                      :length="5"
                      size="small"
                      :model-value="review.rating"
                      empty-icon="i-carbon-star"
                      full-icon="i-carbon-star-filled"
                      half-icon="i-carbon-star-half"
                      color="#E65100"
                      active-color="#E65100"
                      density="compact"
                    />
                  </v-col>
                  <v-col align="right">
                    <small class="text-subtitle">{{ dayjs(review.created_at).format('HH:mm, DD-MM-YYYY') }}</small>
                  </v-col>
                </v-row>
              </v-list-item-subtitle>
              <v-list-item-subtitle>{{ review.review }}</v-list-item-subtitle>
              <v-divider inset mb-2 />
            </v-list-item-content>
          </v-list-items>
        </v-list>
      </v-expand-transition>
    </v-card>
  </v-sheet>
</template>

<style scoped>
</style>
