<script setup lang="ts">
import { useEventBus, useStorage } from '@vueuse/core'
import { useDisplay } from 'vuetify'

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: import.meta.env.VITE_APP_NAME,
  meta: [
    {
      name: 'description',
      content: import.meta.env.VITE_APP_DESCRIPTION,
    },
    {
      name: 'theme-color',
      content: () => '#E65100',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})

const uiStore = useUIStore()
const splashScreenCounter = ref(5)
const { mobile } = useDisplay()

const mapBus = useEventBus<string>('map-events')
const appBus = useEventBus<string>('app-events')

const appInit = useStorage('app-init', {
  init: false,
})

const showSplashScreen = ref(!appInit.value.init || !mobile)
const appVersion = computed(() => {
  return `v${import.meta.env.VITE_APP_VERSION}`
})

const pageContainerClass = computed({
  get() {
    let baseClass = 'page-container'
    if (uiStore.pagePosition === 0)
      baseClass += ' page-position-0'

    else if (uiStore.pagePosition === 1)
      baseClass += ' page-position-1'

    else if (uiStore.pagePosition === 2)
      baseClass += ' page-position-2'

    else if (uiStore.pagePosition === 3)
      baseClass += ' page-position-3'

    else if (uiStore.pagePosition === 4)
      baseClass += ' page-position-4'

    else if (uiStore.pagePosition === 5)
      baseClass += ' page-position-5'

    return baseClass
  },
  set(val) {
    return val
  },
})

appBus.on((message) => {
  if (message === 'setup-done')
    showSplashScreen.value = false
    // appInit.value.init = true
  if (message === 'close-splash-screen')
    showSplashScreen.value = false
})

function swipe(direction: string) {
  if (direction === 'Down') {
    if (uiStore.pagePosition > 0) {
      uiStore.prevPagePosition = uiStore.pagePosition
      uiStore.pagePosition = 0
      mapBus.emit('map-resize')
    }
  }
  else if (direction === 'Up') {
    if (uiStore.pagePosition < 4) {
      uiStore.pagePosition = uiStore.prevPagePosition
      mapBus.emit('map-resize')
    }
  }
}

function getPosition(position: number) {
  if (position === 0)
    return 'page-container page-position-0'
  else if (position === 1)
    return 'page-container page-position-1'
  else if (position === 2)
    return 'page-container page-position-2'
  else if (position === 3)
    return 'page-container page-position-3'
  else if (position === 4)
    return 'page-container page-position-4'
  else
    return 'page-container'
}

onMounted(() => {
  const interval = setInterval(() => {
    if (splashScreenCounter.value < 1) {
      clearInterval(interval)
      return
    }
    splashScreenCounter.value--
  }, 1000)
})

watch(() => uiStore.pagePosition, () => {
  pageContainerClass.value = getPosition(uiStore.pagePosition)
})
</script>

<template>
  <v-container class="app-wrapper">
    <transition name="splash-screen" appear>
      <TheSplashScreen v-if="showSplashScreen" />
    </transition>
    <TheMap />
    <div>
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
          <v-sheet :class="pageContainerClass" pb-14>
            <div
              v-touch="{
                left: () => swipe('Left'),
                right: () => swipe('Right'),
                up: () => swipe('Up'),
                down: () => swipe('Down'),
              }"
              class="page-handle"
              mx-auto
            >
              {{ appVersion }}
            </div>
            <div class="route-container">
              <RouterView pa-0 />
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
    <TheBottomNavigation />
  </v-container>
</template>

<style scoped>
.app-wrapper {
  position: relative;
  height: 100vh;
  width: 100%;
  max-width: 800px;
  background-color: white;
  /* overflow: hidden; */
}
.page-handle {
  display: flex;
  height: 20px;
  width: 80px;
  margin-top: -10px;
  background-color: #e65100;
  border-radius: 10px;
  color: white;
  font-size: 0.8em;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid white;
}
.page-container {
  border-top: 2px solid #e65100;
  transition: all 0.3s ease-in-out;
  padding: 0;
  background-color: white;
  position: fixed;
  bottom: 56px;
  left: 0;
  width: 100%;
  height: 20vh;
}

.page-position-4 {
  height: calc(100vh - 56px);
}
.page-position-3 {
  height: calc(80vh - 56px);
}
.page-position-2 {
  height: calc(50vh - 56px);
}
.page-position-1 {
  background: #e65100;
  height: 90px;
}
.page-position-0 {
  height: 5px;
}

.route-container {
  overflow-y: hidden;
  height: 100%;
}

.splash-screen-enter-active {
  transition: opacity 0.5s;
}
.splash-screen-leave-active {
  transition: all 0.5s;
}
.splash-screen-enter-from {
  opacity: 1;
}
.splash-screen-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
</style>
