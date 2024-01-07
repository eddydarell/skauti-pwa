<script setup lang="ts">
import { useEventBus } from '@vueuse/core'
import * as Constants from '~/defaults/constants'

const { t } = useI18n()
const searchText = ref('')
const searchMessages = ref([''])
const categoryStore = useCategoryStore()
const searchStore = useSearchStore()
const userStore = useUserStore()
const uiStore = useUIStore()
const businessStore = useBusinessStore()
const bus = useEventBus<string>('map-events')

const lowerFloating = computed(() => {
  if (uiStore.searchActive || categoryStore.categories.length < 1)
    return 'lower'
  else
    return ''
})

function openMenu() {
  uiStore.menuActive = true
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

async function search(id?: number, searchType: string = Constants.searchTypes.ALL, isIdSearch = false) {
  uiStore.searchActive = true
  uiStore.pagePosition = 2
  if (isIdSearch) {
    if (!id)
      throw new Error('ID is required')

    const res = await searchStore.searchById(id, searchType, searchStore.radius, userStore.coordinates.lat, userStore.coordinates.lng)
    businessStore.businesses = JSON.parse(res?.data?.value)
  }
  else {
    const res = await searchStore.searchByQuery(searchText.value, searchType, searchStore.radius, userStore.coordinates.lat, userStore.coordinates.lng)
    businessStore.businesses = JSON.parse(res?.data?.value)
  }

  if (businessStore.businesses.length === 0) {
    searchMessages.value = [t('info.no-results')]
  }
  else {
    searchMessages.value = [
  `${businessStore.businesses.length} ${t('info.results-found')}: ${searchText.value}`,
  `${t('info.within')} ${searchStore.radius} ${t('info.km-of-you')}`,
    ]
  }
}

onMounted(() => {
  uiStore.pagePosition = 1
})
</script>

<template>
  <div>
    <v-btn icon color="white" :class="`floating menu ${lowerFloating}`" mr-4 @click="openMenu">
      <v-icon color="orange-darken-4" icon="i-carbon-menu" />
    </v-btn>
    <v-btn icon color="orange-darken-4" :class="`floating locate ${lowerFloating}`" mr-4 @click="centerMapOnUser">
      <v-icon icon="i-carbon-airport-location" />
    </v-btn>
    <Transition name="popular-categories" mode="out-in" appear>
      <v-row v-if="!uiStore.searchActive" class="floating categories">
        <v-col
          cols="12"
          style="overflow-x: visible;"
          pb-0
        >
          <div class="scroll-mask" px-4>
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
            type="input"
            :label="t('labels.search-placeholder')"
            :prepend-icon="uiStore.searchActive ? 'i-carbon-arrow-left' : ''"
            :prepend-inner-icon="uiStore.searchActive ? '' : 'i-carbon-search'"
            :density="uiStore.searchActive ? 'compact' : 'default'"
            variant="solo"

            :hide-details="!uiStore.searchActive"
            :messages="searchMessages"

            flat clearable single-line rounded
            clear-icon="i-carbon-close"
            bg-color="white"
            @click:prepend="toggleSearch"
          />
          <!-- <v-autocomplete
        :items="items"
        append-inner-icon="mdi-microphone"
        auto-select-first
        class="flex-full-width"
        density="comfortable"
        item-props
        menu-icon=""
        placeholder="Search Google or type a URL"
        prepend-inner-icon="mdi-magnify"
        rounded
        theme="light"
        variant="solo"
      ></v-autocomplete> -->
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
  transition: all 0.3s 0.35s ease-in-out;
  z-index: 1000;
}
.menu {
  top: -175px;
}
.locate {
  top: -115px;
}

.lower {
  transition: all 0.3s 0.5s ease-in-out;
}

.menu.lower {
  top: -140px;
}
.locate.lower {
  top: -80px;
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
  transition: opacity 0.3s 0.5s;
}
.popular-categories-enter-from,
.popular-categories-leave-to {
  opacity: 0;
}

.popular-categories-enter-active {
  animation: slide-in 0.3s 0.5s;
}
.popular-categories-leave-active {
  animation: slide-out 0.3s 0.5s;
  position: absolute;
}

@keyframes slide-in {
  0% {
    transform: translateY(10px);
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
    transform: translateY(10px);
  }
}
</style>
