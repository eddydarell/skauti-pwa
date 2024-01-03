<script setup lang="ts">
import { useEventBus } from '@vueuse/core'
import * as Constants from '~/defaults/constants'

const { t } = useI18n()
const searchText = ref('')
const categoryStore = useCategoryStore()
const searchStore = useSearchStore()
const userStore = useUserStore()
const uiStore = useUIStore()
const businessStore = useBusinessStore()
const { navigateTo } = useNavigation()
const bus = useEventBus<string>('map-events')

function openMenu() {
  uiStore.menuActive = true
  uiStore.searchActive = false
}
function centerMapOnUser() {
  bus.emit('center-map-on-user')
}

function toggleSearch() {
  if (uiStore.businessSelected) {
    uiStore.businessSelected = false
    uiStore.pagePosition = 2
  }
  else if (uiStore.searchActive) {
    uiStore.searchActive = false
    uiStore.menuActive = false
    uiStore.businessSelected = false
    businessStore.businesses = []
    searchText.value = ''
    uiStore.pagePosition = 1
  }
}

function searchCategory(category) {
  searchText.value = category.name

  search(category.id, Constants.searchTypes.CATEGORY, true)
}

async function search(id?: number, searchType: string = Constants.searchTypes.CATEGORY, isIdSearch = false) {
  uiStore.searchActive = true
  uiStore.pagePosition = 2
  if (isIdSearch) {
    if (!id)
      return console.log('ID is required')

    const res = await searchStore.searchById(id, searchType, userStore.radius, userStore.coordinates.lat, userStore.coordinates.lng)
    businessStore.businesses = JSON.parse(res?.data?.value)
  }
  else {
    searchStore.searchByQuery(searchText.value, searchType)
  }
}
</script>

<template>
  <div>
    <v-btn icon color="white" class="floating menu" mr-4 @click="openMenu">
      <v-icon color="orange-darken-4" icon="i-carbon-menu" />
    </v-btn>
    <v-btn icon color="orange-darken-4" class="floating locate" mr-4 @click="centerMapOnUser">
      <v-icon icon="i-carbon-airport-location" />
    </v-btn>
    <Transition name="popular-categories">
      <v-row v-if="!uiStore.searchActive" class="floating categories">
        <v-col
          cols="12"
          style="overflow-x: visible;"
          pb-0
        >
          <div class="scroll-mask-2" px-4>
            <div class="inline-flex">
              <v-chip
                v-for="category in categoryStore.flatCategories"
                :key="category.id"
                color="white"
                variant="elevated"

                mr-2
                @click="searchCategory(category)"
              >
                <v-icon :color="category.color" icon="i-carbon-tag" mr-2 />
                {{ category.name }}
              </v-chip>
            </div>
          </div>
        </v-col>
      </v-row>
    </Transition>
    <v-row class="search-box">
      <v-col cols="12">
        <v-form @submit.prevent="search">
          <v-text-field
            v-model="searchText"
            :label="t('labels.search-placeholder')"
            class="rounded-pill"
            :prepend-inner-icon="uiStore.searchActive ? 'i-carbon-arrow-left' : 'i-carbon-search'"
            single-line
            hide-details
            variant="solo"
            clearable
            clear-icon="i-carbon-close"
            bg-color="white"
            persistent-hint
            @click:prepend-inner="toggleSearch"
          />
        </v-form>
      </v-col>
    </v-row>
    <TheMenu />
  </div>
</template>

<style scoped>
.search-box {
  margin-top: -20px;
}
.floating {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1000;
}
.menu {
  top: -175px;
}
.locate {
  top: -115px;
}
.categories {
  top: -55px;
}
.scroll-mask {
  overflow-x: scroll;
  /* overflow-y: hidden; */
  white-space: nowrap;
  border-radius: 5px;
  height: 35px;
  /* -webkit-overflow-scrolling: touch; */
}
.scroll-mask-2 {
  overflow-x: scroll;
  /* overflow-y: hidden; */
  white-space: nowrap;
  border-radius: 5px;
  height: 35px;
  width: 100vw;
  /* -webkit-overflow-scrolling: touch; */
}

.search-box-wrapper {
  transition: background-color 0.5s;
}

.opaque {
  /* background-color: #fff3e0; */
  background-color: #fff;
}

.popular-categories-enter-active,
.popular-categories-leave-active {
  transition: opacity 0.5s;
}
.popular-categories-enter,
.popular-categories-leave-to {
  opacity: 0;
}

.popular-categories-enter-active {
  animation: slide-in 0.5s;
}
.popular-categories-leave-active {
  animation: slide-out 0.5s;
}

@keyframes slide-in {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes slide-out {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
