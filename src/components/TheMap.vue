<script setup lang="ts">
import { useEventBus, useGeolocation } from '@vueuse/core'

const { t } = useI18n()
const bus = useEventBus<string>('map-events')
const { navigateTo } = useNavigation()
const map = ref(null)
const markers = ref(null)
const circles = ref(null)
const userMarker = ref(null)
const userAccuracyCircle = ref(null)
const leafletTileUrl = import.meta.env.VITE_LEAFLET_TILE_URL
const businessStore = useBusinessStore()
const userStore = useUserStore()
const { coords, locatedAt, error, resume, pause, isSupported } = useGeolocation()

bus.on(mapEventListener)

const mapHeight = computed(() => {
  switch (useUIStore().pagePosition) {
    case 0:
      return '100vh'
    case 1:
      return '80vh'
    case 2:
      return '50vh'
    case 3:
      return '20vh'
    case 4:
      return '10vh'

    default:
      return '100vh'
  }
})

function initMap(elementId: string, initCoordinates: { latitude: any, longitude: any }) {
  const map = L.map(elementId, {
    zoomControl: false,
  }).setView([initCoordinates.latitude, initCoordinates.longitude], 13)

  L.tileLayer(leafletTileUrl, {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">',
  }).addTo(map)

  return map
}

function addMarker(map: any, latLong: any, icon: any) {
  const marker = L.marker(latLong, { icon }).addTo(map)
  return marker
}

function addCircle(map: any, latLong: any, radius: any, color: any) {
  const circle = L.circle(latLong, {
    color: color ?? '#E6510030',
    fillColor: color ?? '#E65100',
    fillOpacity: 0.15,
    radius,
  }).addTo(map)

  return circle
}

function addMarkerPopup(marker: { bindPopup: (arg0: any) => void }, popupContent: any) {
  marker.bindPopup(popupContent)
}

function addCirclePopup(circle: { bindPopup: (arg0: any) => void }, popupContent: any) {
  circle.bindPopup(popupContent)
}

function mapEventListener(event: string) {
  map.value?.invalidateSize()

  console.log('Map center', (map.value as L.Map)?.getCenter())
  console.log(`Map event: ${event}`)
  if (event === 'fit-business-list-markers') {
    const bounds: any[] = []
    for (const marker of markers.value.getLayers())
      bounds.push(marker.getLatLng())
    setTimeout(() => {
      map.value?.invalidateSize(true)
      map.value?.flyToBounds(bounds, { padding: [20, 20], maxZoom: 9 })
    }, 200)
    // map.value?.panTo(newCenter)
  }
  else if (event === 'focus-business-marker') {
    map.value?.invalidateSize()
    setTimeout(() => {
      const mainAddress = businessStore.selectedBusiness.addresses[0]
      const latLong = L.latLng(mainAddress.latitude, mainAddress.longitude)
      map.value?.invalidateSize(true)
      map.value?.flyTo(latLong, 15)

      setTimeout(() => {
        const selectedBusinessMarker = markers.value?.getLayers().find((layer: { _icon: { classList: { contains: (arg0: string) => any } } }) => layer._icon.classList.contains(`business-marker-selected`))

        if (selectedBusinessMarker) {
          const sIcon = selectedBusinessMarker.getElement()
          sIcon.classList.remove('business-marker-selected')
        }

        // Add the new selected business marker
        const businessMarker = markers.value?.getLayers().find((layer: { options: { icon: { options: { className: string } } } }) => layer.options.icon.options.className === `business-${businessStore.selectedBusiness.id}`)
        const icon = businessMarker.getElement()
        icon.classList.add('business-marker-selected')
        businessMarker?.openPopup()
      }, 100)
    }, 700)
  }
  else if (event === 'center-map-on-user') {
    map.value?.invalidateSize()
    setTimeout(() => {
      resume()
      map.value?.invalidateSize()
      map.value?.setView([coords.value.latitude, coords.value.longitude], 13)
    }, 100)
  }
}

function offsetMapCenter() {
  const offset = 0.35 // useUIStore().pagePosition === 3 ? 0.35 : 0.25
  const centerPixel = map.value?.latLngToContainerPoint(map.value?.getCenter())

  centerPixel.y += map.value?.getSize().y * offset
  const newCenter = map.value?.containerPointToLatLng(centerPixel)
  return newCenter
}

onBeforeMount(() => {
  if (isSupported.value)
    console.log('Geolocation is supported')

  else
    console.log('Geolocation is not supported')
})

onMounted(async () => {
  // setTimeout(() => {
  map.value = initMap('map', { latitude: 0, longitude: 0 })
  map.value?.on('resize', () => {
    console.log('Map resized')
    (map.value as L.Map)?.invalidateSize()
  })
  markers.value = L.layerGroup()
  circles.value = L.layerGroup()

  if (isSupported.value) {
    console.log(coords.value)
    console.log(map.value)
  }
  else {
    console.log(`Geolocation is not supported by this browser.`)
  }
  // }, 100)
})

watch(() => coords.value, () => {
  console.log('Coords changed')
  console.log(coords.value)
  const timeDiff = Date.now() - locatedAt.value

  // Prevents location from being updated too often
  if (coords.value.latitude !== Number.POSITIVE_INFINITY && coords.value.longitude !== Number.POSITIVE_INFINITY && timeDiff < 10000) { pause() }
  else {
    resume()
    console.log('Resumed coordinated refresh')
  }

  userStore.coordinates = {
    lat: coords.value.latitude,
    lng: coords.value.longitude,
  }

  userStore.radius = coords.value.accuracy

  if (map.value) {
    map.value.panTo([coords.value.latitude, coords.value.longitude], 13)

    const icon = L.icon({
      iconUrl: '/assets/rec.png',
      iconSize: [32, 32], // size of the icon
      iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -16], // point from which the popup should open relative to the iconAnchor
      className: 'user-marker-selected',
    })

    if (!userMarker.value) {
      userMarker.value = L.marker([coords.value.latitude, coords.value.longitude], { icon }).addTo(map.value)
        .bindPopup(`${t('labels.you-are-here')}`)
      userAccuracyCircle.value = userAccuracyCircle.value ?? L.circle([coords.value.latitude, coords.value.longitude], {
        color: '#1976D220',
        fillColor: '#1976D2',
        fillOpacity: 0.15,
        radius: coords.value.accuracy,
      }).addTo(map.value)
        .bindPopup(`${t('labels.you-are-within')} ${coords.value?.accuracy} ${t('labels.meters-from-this-point')}`)
    }
    else {
      userMarker.value.setLatLng([coords.value.latitude, coords.value.longitude])
      userAccuracyCircle.value?.setLatLng([coords.value.latitude, coords.value.longitude])
      userAccuracyCircle.value?.setRadius(coords.value.accuracy)
    }
  }
})

watch(() => businessStore.businesses, () => {
  markers.value?.clearLayers()
  circles.value?.clearLayers()
  setTimeout(() => {
    if (map.value) {
      const allLatLongs = []
      for (let i = 0; i < businessStore.businesses.length; i++) {
        const business = businessStore.businesses[i]
        const latLongs = business.addresses.map((address: { latitude: any, longitude: any }) => L.latLng(address.latitude, address.longitude))
        for (let j = 0; j < latLongs.length; j++) {
          const latLong = latLongs[j]
          allLatLongs.push(latLong)
          const icon = L.icon({
            iconUrl: `/assets/marker.png`,
            shadowUrl: '/assets/marker_shadow.png',

            iconSize: [32, 32], // size of the icon
            // shadowSize: [50, 64], // size of the shadow
            iconAnchor: [16, 21], // point of the icon which will correspond to marker's location
            shadowAnchor: [28, 55], // the same for the shadow
            popupAnchor: [0, -16], // point from which the popup should open relative to the iconAnchor
            className: `business-${business.id}`,
          })
          const marker = L.marker(latLong, { icon }) // .addTo(map.value)
          const circle = L.circle(latLong, {
            color: '#E6510030',
            fillColor: '#E65100',
            fillOpacity: 0.15,
            radius: business.addresses[j].radius * 1000,
          }) // .addTo(map.value)

          marker.bindPopup(`<b>${business.name}</b> : <em>${business.addresses.map((address: { street: any }) => address.street).join(', ')}</em>`)
          circle.bindPopup(`Circle`)

          marker.on('click', () => {
            console.log('Marker clicked')
            businessStore.selectedBusiness = business
            bus.emit('focus-business-marker')
            navigateTo(`/business/${business.id}`)
          })

          markers.value?.addLayer(marker)
          circles.value?.addLayer(circle)
        }
      }

      map.value?.addLayer(markers.value)
      map.value?.fitBounds(allLatLongs)
      // map.value?.addLayer(circles.value)
    }
    else {
      console.log('No map', map.value)
    }
  }, 100)
})
</script>

<template>
  <div id="map" :style="`height:${mapHeight}`" />
</template>

<style scoped>
#map {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  transition: height 0.3s ease-in-out;
}
</style>
