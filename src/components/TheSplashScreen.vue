<script setup lang="ts">
import anime from 'animejs'
import { useEventBus, useStorage } from '@vueuse/core'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const bus = useEventBus<string>('app-events')

const setupState = useStorage('setup', {
  step: 0,
  setupDone: false,
})

const kTranslateXKeyframes = [
  { value: 50, duration: 500, delay: 200 },
  { value: 0, duration: 500, delay: 2000 },
  { value: 0, duration: 500, delay: 3300 },
]

const sOpacityKeyframes = [
  { value: 0, duration: 500, delay: 200 },
  { value: 1, duration: 500, delay: 2600 },
  { value: 1, duration: 500, delay: 300 },
]

const autiOpacityKeyframes = [
  { value: 0, duration: 500, delay: 200 },
  { value: 1, duration: 500, delay: 2600 },
  { value: 1, duration: 500, delay: 300 },
]

onMounted(() => {
  const splashScreenBG = document.querySelector('div.splash-screen')
  const svgContainer = document.querySelector('div.svg-container')
  const k = document.querySelector('#path3')
  const s = document.querySelector('#path2')
  const auti = document.querySelector('#path4')
  const setup = document.querySelector('.setup')
  const infoBox = document.querySelector('.info-box')

  const kHeight = k?.getBoundingClientRect().height ?? 300

  const spotlightClipPathKeyframes = [
    { value: `circle(${kHeight + 10}px at center)`, duration: 500, delay: 800 },
    { value: 'circle(1500px at center)', duration: 500, delay: 1300 },
    { value: 'circle(1500px at center)', duration: 500, delay: 3600 },
  ]

  anime({
    targets: svgContainer,
    clipPath: spotlightClipPathKeyframes,
    direction: 'alternate',
    loop: false,
    easing: 'easeInOutSine',
    duration: 700,
    delay: (el, i) => { return i * 500 },
  })
  anime({
    targets: k,
    translateX: kTranslateXKeyframes,
    direction: 'alternate',
    loop: false,
    easing: 'easeInOutSine',
    duration: 700,
    delay: 2000,
  })
  anime({
    targets: s,
    // keyframes: spotlightKeyframes,
    opacity: sOpacityKeyframes,
    direction: 'alternate',
    loop: false,
    easing: 'easeInOutSine',
    duration: 200,
    delay: 2800,
  })

  const scaleDownAndMoveUp = anime({
    targets: svgContainer,
    translateY: [
      { value: 0, duration: 500, delay: 200 },
      { value: -300, duration: 500, delay: 4000 },
      { value: -300, duration: 500, delay: 4500 },
    ],
    scale: [
      { value: 1, duration: 500, delay: 200 },
      { value: 0.3, duration: 500, delay: 4000 },
      { value: 0.3, duration: 500, delay: 4500 },
    ],
    borderRadius: [
      { value: '0px', duration: 500, delay: 200 },
      { value: '50px', duration: 500, delay: 4000 },
      { value: '50px', duration: 500, delay: 4500 },
    ],
    direction: 'alternate',
    loop: false,
    easing: 'easeInOutSine',
    autoplay: false,
    duration: 700,
  })

  anime({
    targets: auti,
    opacity: autiOpacityKeyframes,
    direction: 'alternate',
    loop: false,
    easing: 'easeInOutSine',
    duration: 200,
    delay: 2800,
    complete() {
      if (setupState.value.setupDone)
        bus.emit('close-splash-screen')

      else
        scaleDownAndMoveUp.play()
    },
  })

  anime({
    targets: splashScreenBG,
    backgroundColor: '#FFF',
    easing: 'easeInOutSine',
    duration: 700,
    delay: 3500,
  })

  anime({
    targets: setup,
    opacity: [
      { value: 1, duration: 500, delay: 5300 },
      { value: 1, duration: 500, delay: 5500 },
    ],
    translateY: [
      { value: 100, duration: 300, delay: 100 },
      { value: 0, duration: 500, delay: 4800 },
    ],
    direction: 'alternate',
    loop: false,
    easing: 'easeInOutSine',
    duration: 700,
  })

  anime({
    targets: infoBox,
    opacity: [
      { value: 1, duration: 500, delay: 5300 },
      { value: 1, duration: 500, delay: 5500 },
    ],
    translateY: [
      { value: 100, duration: 300, delay: 100 },
      { value: 0, duration: 500, delay: 4800 },
    ],
    direction: 'alternate',
    loop: false,
    easing: 'easeInOutSine',
    duration: 700,
  })

  if (!setupState.value.setupDone)
    scaleDownAndMoveUp.play()
})
</script>

<template>
  <v-sheet class="splash-screen">
    <v-row>
      <v-col cols="12" align="center">
        <div class="svg-container">
          <svg
            id="svg1"
            width="192.24522mm"
            height="50.987118mm"
            viewBox="0 0 192.24522 50.987118"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:svg="http://www.w3.org/2000/svg"
          >
            <defs
              id="defs1"
            />
            <g
              id="layer1"
              transform="translate(-6.9959823,-119.50755)"
            >
              <g
                id="text1"
                style="font-size:68.2065px;font-family:'.SF Soft Numeric';-inkscape-font-specification:'.SF Soft Numeric';stroke-width:2.13145"
                transform="scale(0.93640413,1.067915)"
                aria-label="SKAUTI"
              >
                <path
                  id="path2"
                  style="font-family:Phosphate;-inkscape-font-specification:Phosphate"
                  d="m 13.336873,152.55844 q 0.954891,0.20462 2.046195,0.34103 0.954891,0.13641 1.977988,0.27282 1.091304,0.0682 2.182608,0.0682 1.909782,0 3.683151,-0.40924 1.841575,-0.47744 3.273912,-1.50054 1.432336,-1.0231 2.250814,-2.59185 0.886685,-1.63695 0.886685,-3.95597 0,-1.97799 -1.023098,-3.75136 -0.954891,-1.77337 -2.52364,-3.41033 -1.500543,-1.63695 -3.273912,-3.1375 -1.705162,-1.50054 -3.273912,-3.00108 -1.500543,-1.56875 -2.52364,-3.06929 -0.954891,-1.56875 -0.954891,-3.20571 0,-2.45543 1.568749,-3.75136 1.56875,-1.36413 5.047281,-1.36413 0.545652,0 1.091304,0.0682 0.613858,0 1.15951,0.0682 0.545652,0.0682 1.091304,0.0682 v -1.77337 q -0.477445,0 -1.023097,-0.0682 -0.477446,-0.0682 -1.091304,-0.0682 -0.545652,-0.0682 -1.159511,-0.0682 -3.68315,0 -6.070378,1.70517 -2.387227,1.63695 -2.387227,5.18369 0,1.90978 0.954891,3.61494 1.023097,1.63696 2.52364,3.27392 1.56875,1.56875 3.273912,3.06929 1.773369,1.50054 3.273912,3.06929 1.568749,1.50054 2.52364,3.1375 1.023098,1.63696 1.023098,3.41033 0,3.27391 -2.250815,4.97907 -2.182608,1.70516 -6.070378,1.70516 -2.319021,0 -4.228803,-0.34103 -1.023097,-0.13641 -1.977988,-0.34103 z m -5.7293459,-8.18478 q 1.5005429,0.47744 3.1374989,0.75027 1.36413,0.34103 3.069292,0.54565 1.773369,0.20462 3.546738,0.20462 3.137499,0 3.137499,-2.31902 0,-0.88669 -0.954891,-1.77337 -0.954891,-0.95489 -2.455434,-2.0462 -1.432336,-1.15951 -3.137499,-2.52364 -1.636956,-1.36413 -3.137499,-3.13749 -1.432336,-1.77337 -2.3872269,-3.95598 -0.954891,-2.25082 -0.954891,-5.11549 0,-3.2057 1.1595105,-5.66114 1.1595104,-2.45543 3.2057054,-4.09239 2.046195,-1.63695 4.774455,-2.45543 2.796466,-0.88669 5.933965,-0.88669 1.636956,0 3.273912,0.20462 1.636956,0.13642 2.932879,0.27283 1.500543,0.20462 2.93288,0.40924 v 12.75461 q -0.545652,-0.0682 -1.227717,-0.13641 -0.545652,-0.0682 -1.227717,-0.13641 -0.682065,-0.0682 -1.432337,-0.0682 -0.409239,0 -1.023097,0.0682 -0.613859,0 -1.159511,0.13641 -0.545652,0.13641 -0.954891,0.47745 -0.409239,0.34103 -0.409239,0.95489 0,0.54565 0.886685,1.36413 0.954891,0.81847 2.250814,1.90978 1.36413,1.0913 2.93288,2.52364 1.636956,1.43234 2.932879,3.27391 1.36413,1.84158 2.250814,4.1606 0.954891,2.31902 0.954891,5.18369 0,3.00109 -0.954891,5.66114 -0.954891,2.59185 -3.001085,4.56984 -1.977989,1.90978 -5.115488,3.00108 -3.137499,1.15951 -7.434508,1.15951 -2.591847,0 -4.842661,-0.27282 -2.182608,-0.20462 -3.887771,-0.54566 -1.977988,-0.34103 -3.6149439,-0.81847 z"
                />
                <path
                  id="path3"
                  style="font-family:Phosphate;-inkscape-font-specification:Phosphate;fill:#e65100"
                  d="m 39.52822,112.99867 h 14.732603 v 10.5038 l 8.594019,-10.5038 H 80.656738 L 64.628211,133.80165 81.475216,158.4924 H 63.946146 L 54.260823,144.44186 V 158.4924 H 39.52822 Z m 8.594019,40.03721 V 143.828 l 7.093475,-8.79863 12.413583,18.00651 h 2.114401 L 56.443431,133.59703 68.652394,118.45519 H 66.469786 L 48.122239,141.09974 V 118.45519 H 46.34887 v 34.58069 z"
                />
                <path
                  id="path4"
                  style="font-family:Phosphate;-inkscape-font-specification:Phosphate"
                  d="m 96.34425,112.99867 h 10.91304 l 17.25624,45.49373 h -14.32336 l -1.50054,-4.09239 H 94.911914 l -1.500543,4.09239 H 79.088007 Z m 8.52581,31.37499 -3.06929,-7.98016 -3.069292,7.98016 z m -15.619285,8.66222 1.295923,-3.41032 h 22.508142 l 1.29593,3.41032 h 1.90978 l -13.16386,-34.58069 h -2.59184 l -13.163857,34.58069 z m 12.549995,-32.94374 10.64021,27.89646 H 91.160557 Z m 40.30995,39.55977 q -4.29701,0 -7.77554,-1.0913 -3.47853,-1.09131 -5.93396,-3.27391 -2.45544,-2.18261 -3.81957,-5.52473 -1.29592,-3.34212 -1.29592,-7.84375 v -28.91955 h 14.52798 v 28.30569 q 0,2.38723 0.9549,3.68315 1.02309,1.22772 3.34211,1.22772 2.31902,0 3.27392,-1.22772 1.02309,-1.29592 1.02309,-3.68315 v -28.30569 h 14.59619 v 28.91955 q 0,4.50163 -1.36413,7.84375 -1.29592,3.34212 -3.81956,5.52473 -2.45543,2.1826 -5.93397,3.27391 -3.47853,1.0913 -7.77554,1.0913 z m 0,-8.18478 q -10.23097,0 -10.23097,-10.02635 v -22.98559 h -1.77337 v 22.98559 q 0,5.72934 3.06929,8.79863 3.1375,3.00109 8.93505,3.00109 5.79756,0 8.93505,-3.00109 3.1375,-3.06929 3.1375,-8.79863 v -22.98559 h -1.84157 v 22.98559 q 0,10.02635 -10.23098,10.02635 z m 29.46525,-26.53233 h -8.3894 v -11.93613 h 31.78423 v 11.93613 h -8.3894 v 33.5576 h -15.00543 z m 8.3894,28.10108 v -32.94374 h 9.75353 v -1.63695 h -21.28043 v 1.63695 h 9.75353 v 32.94374 z m 17.39264,-40.03721 h 15.41467 v 45.49373 h -15.41467 z m 8.59402,40.03721 v -34.58069 h -1.77337 v 34.58069 z"
                />
              </g>
            </g>
          </svg>
        </div>
      </v-col>
    </v-row>
    <TheMobileInfoBox v-if="!mobile" class="info-box" />
    <TheSetup v-if="mobile && !setupState.setupDone" class="setup" />
  </v-sheet>
</template>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #e65100;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20000;
}
svg#svg1 {
  width: 90vw;
  height: auto;
  z-index: 20000;
}
div.svg-container {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: white;
  z-index: 20001;
  clip-path: circle(0px at center);
}

path#path2 {
  opacity: 0;
}

path#path3 {
  transform: translateX(50px);
}

path#path4 {
  opacity: 0;
}

.setup,
.info-box {
  opacity: 0;
}
</style>
```
