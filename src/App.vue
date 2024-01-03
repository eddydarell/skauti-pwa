<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Vitesse',
  meta: [
    {
      name: 'description',
      content: 'Opinionated Vite Starter Template',
    },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00aba9' : '#ffffff',
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

const pageContainerClass = computed(() => {
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
})

function swipe(direction: string) {
  console.log('swipe', direction)
  return
  const pageContainer: HTMLBaseElement | null = document.querySelector('.page-container')
  if (pageContainer) {
    switch (direction) {
      case 'Up':
        if (uiStore.pagePosition === 0) {
          uiStore.pagePosition = 1
          pageContainer.style.transform = 'translateY(80vh)'
        }
        else if (uiStore.pagePosition === 1) {
          uiStore.pagePosition = 2
          pageContainer.style.transform = 'translateY(50vh)'
        }
        else if (uiStore.pagePosition === 2) {
          uiStore.pagePosition = 3
          pageContainer.style.transform = 'translateY(20vh)'
        }
        else if (uiStore.pagePosition === 3) {
          uiStore.pagePosition = 4
          pageContainer.style.transform = 'translateY(10vh)'
        }
        else if (uiStore.pagePosition === 4) {
          uiStore.pagePosition = 5
          pageContainer.style.transform = 'translateY(5px)'
        }
        else { break }
        break
      case 'Down':
        if (uiStore.pagePosition === 0) {
          uiStore.pagePosition = 0
          pageContainer.style.transform = 'translateY(calc(100vh - 65px))'
        }
        else if (uiStore.pagePosition === 1) {
          uiStore.pagePosition = 0
          pageContainer.style.transform = 'translateY(80vh)'
        }
        else if (uiStore.pagePosition === 2) {
          uiStore.pagePosition = 1
          pageContainer.style.transform = 'translateY(50vh)'
        }
        else if (uiStore.pagePosition === 3) {
          uiStore.pagePosition = 2
          pageContainer.style.transform = 'translateY(20vh)'
        }
        else if (uiStore.pagePosition === 4) {
          uiStore.pagePosition = 3
          pageContainer.style.transform = 'translateY(10vh)'
        }
        else if (uiStore.pagePosition === 5) {
          uiStore.pagePosition = 4
          pageContainer.style.transform = 'translateY(5px)'
        }
        else { break }

        break
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

function cyclePosition() {
  if (uiStore.pagePosition === 0)
    uiStore.pagePosition = 1
  else if (uiStore.pagePosition === 1)
    uiStore.pagePosition = 2
  else if (uiStore.pagePosition === 2)
    uiStore.pagePosition = 3
  else if (uiStore.pagePosition === 3)
    uiStore.pagePosition = 4
  else if (uiStore.pagePosition === 4)
    uiStore.pagePosition = 5
  else if (uiStore.pagePosition === 5)
    uiStore.pagePosition = 0
}

watch(() => uiStore.pagePosition, () => {
  pageContainerClass.value = getPosition(uiStore.pagePosition)
})
</script>

<template>
  <div class="app-wrapper">
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
              @click="cyclePosition"
            />
            <div class="route-container">
              <RouterView pa-0 />
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
    <TheBottomNavigation />
  </div>
</template>

<style scoped>
.app-wrapper {
  position: relative;
  height: 100vh;
  width: 100%;
  /* overflow: hidden; */
}
.page-handle {
  height: 20px;
  width: 80px;
  margin-top: -10px;
  background-color: #e65100;
  border-radius: 10px;
}
.page-container {
  transition: all 0.3s ease-in-out;
  padding: 0;
  /* overflow-y: scroll; */
  /* background-color: white; */
  background-color: transparent;
  /* background-color: #fff3e0; */
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
  height: calc(20vh - 56px);
}
.page-position-0 {
  height: 5px;
}

.route-container {
  overflow-y: hidden;
  height: 100%;
}
</style>
