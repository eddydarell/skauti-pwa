<script setup lang="ts">
import { useGeolocation } from '@vueuse/core'

const map = ref(null)
const leafletTileUrl = import.meta.env.VITE_LEAFLET_TILE_URL
const userCoordinates = ref({ latitude: 0, longitude: 0 })
const businessStore = useBusinessStore()
const { coords, locatedAt, error, resume, pause, isSupported } = useGeolocation()

onBeforeMount(() => {
  if (isSupported.value)
    console.log('Geolocation is supported')

  else
    console.log('Geolocation is not supported')
})

onMounted(() => {
  if (navigator.geolocation) {
    // console.log('Before mount')
    // console.log('Map', map.value)
    // console.log('Businesses', businessStore.businesses)
    // console.log('User coordinates', userCoordinates.value)
    // console.log('Geolocation', coords.value)
    // console.log('Located at', locatedAt.value)
    // console.log('Error', error.value)
    // console.log('Resume', resume)
    // console.log('Pause', pause)

    navigator.geolocation.getCurrentPosition(async (position) => {
      console.log(position)
      userCoordinates.value = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }

      await businessStore.fetchBusinessesInVicinity(userCoordinates.value.latitude, userCoordinates.value.longitude)

      function onLocationFound(e) {
        const radius = e.accuracy
        console.log(radius)
        const icon = L.icon({
          iconUrl: '/assets/rec.png',
          // shadowUrl: '/assets/shadow_bw2.png',

          iconSize: [32, 32], // size of the icon
          // shadowSize: [50, 64], // size of the shadow
          iconAnchor: [16, 31], // point of the icon which will correspond to marker's location
          // shadowAnchor: [28, 55], // the same for the shadow
          popupAnchor: [0, -16], // point from which the popup should open relative to the iconAnchor
        })

        L.marker(e.latlng, { icon }).addTo(map)
          .bindPopup(`You are within ${radius} meters from this point`).openPopup()

        L.circle(e.latlng, {
          color: '#1976D220',
          fillColor: '#1976D2',
          fillOpacity: 0.15,
          radius,
        }).addTo(map)
      }
      function onLocationError(e) {
        alert(e.message)
      }

      map.value = L.map(`map`, {
        zoomControl: false,
      }).setView([0, 0], 13)

      L.tileLayer(leafletTileUrl, {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map.value)

      map.value?.whenReady(() => {
        console.log('Map ready')
        // map.locate({ setView: true, maxZoom: 16 })
      })

      map.value?.panTo([userCoordinates.value.latitude, userCoordinates.value.longitude], 13)
      const icon = L.icon({
        iconUrl: '/assets/rec.png',
        // shadowUrl: '/assets/shadow_bw2.png',

        iconSize: [32, 32], // size of the icon
        // shadowSize: [50, 64], // size of the shadow
        iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
        // shadowAnchor: [28, 55], // the same for the shadow
        popupAnchor: [0, -16], // point from which the popup should open relative to the iconAnchor
      })
      const marker = L.marker([userCoordinates.value.latitude, userCoordinates.value.longitude], { icon }).addTo(map.value)
      L.circle([userCoordinates.value.latitude, userCoordinates.value.longitude], {
        color: '#1976D220',
        fillColor: '#1976D2',
        fillOpacity: 0.15,
        radius: 100 * 1000,
      }).addTo(map.value)
      // .bindPopup(`You are here`)
      // .openPopup()
      // map.locate({ setView: true, maxZoom: 16 })
      // const marker = L.marker([userCoordinates.value.latitude, userCoordinates.value.longitude]).addTo(map)

      // map.on('locationfound', onLocationFound)
      // map.on('locationerror', onLocationError)

      // const latLongs = business.value?.addresses.map(address => L.latLng(address.latitude, address.longitude))
      // map.fitBounds(latLongs)
      // const markers = []
      // const circles = []

      // for (const address of business.value?.addresses) {
      //   const icon = L.icon({
      //     iconUrl: '/assets/default_marker_blue_2_tone_pale_32.png',
      //     shadowUrl: '/assets/shadow_bw2.png',

      //     iconSize: [32, 35], // size of the icon
      //     // shadowSize: [50, 64], // size of the shadow
      //     iconAnchor: [16, 31], // point of the icon which will correspond to marker's location
      //     shadowAnchor: [28, 55], // the same for the shadow
      //     popupAnchor: [0, -16], // point from which the popup should open relative to the iconAnchor
      //   })
      //   const marker = L.marker([address.latitude, address.longitude], { icon }).addTo(map)
      //   const circle = L.circle([address.latitude, address.longitude], {
      //     color: '#E65100DD',
      //     fillColor: '#E65100',
      //     fillOpacity: 0.15,
      //     radius: address.radius * 1000,
      //   }).addTo(map)

      //   marker.bindPopup(`popup`)
      //   circle.bindPopup(`Circle`)

      //   markers.push(marker)
      //   circles.push(circle)
      // }

      // map.setMinZoom(map.getBoundsZoom(map.getBounds()))

      // const popup = L.popup()

      // function onMapClick(e) {
      //   popup
      //     .setLatLng(e.latlng)
      //     .setContent(`You clicked the map at ${e.latlng.toString()}`)
      //     .openOn(map)
      // }

      // map.on('click', onMapClick)
    })
  }
  else {
    console.log(`Geolocation is not supported by this browser.`)
  }
})

watch(() => businessStore.businesses, () => {
  console.log(businessStore.businesses)
  console.log('Watcher called')
  setTimeout(() => {
    if (map.value) {
      for (let i = 0; i < businessStore.businesses.length; i++) {
        const business = businessStore.businesses[i]
        const latLongs = business.addresses.map(address => L.latLng(address.latitude, address.longitude))
        for (let j = 0; j < latLongs.length; j++) {
          const latLong = latLongs[j]
          const icon = L.icon({
            iconUrl: '/assets/default_marker_blue_2_tone_pale_32.png',
            shadowUrl: '/assets/shadow_bw2.png',

            iconSize: [32, 32], // size of the icon
            // shadowSize: [50, 64], // size of the shadow
            iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
            // shadowAnchor: [28, 55], // the same for the shadow
            popupAnchor: [0, -16], // point from which the popup should open relative to the iconAnchor
          })
          const marker = L.marker(latLong).addTo(map.value)
          const circle = L.circle(latLong, {
            color: '#E6510030',
            fillColor: '#E65100',
            fillOpacity: 0.15,
            radius: business.addresses[j].radius * 1000,
          }).addTo(map.value)

          marker.bindPopup(`popup`)
          circle.bindPopup(`Circle`)
        }

        // const marker = L.marker(latLongs[0]).addTo(map.value)
        //   .bindPopup(`BUSINESS: <b>${business.name}</b> with addresses: <em>${business.addresses.map(address => address.street).join(', ')}</em>`)
        //   .openPopup()
        // const circle = L.circle(latLongs[0], {
        //   color: '#E6510020',
        //   fillColor: '#E65100',
        //   fillOpacity: 0.15,
        //   radius: business.addresses[0].radius * 1000,
        // }).addTo(map.value)

        // marker.bindPopup(`popup`)
        // circle.bindPopup(`Circle`)
      }
    }
    else {
      console.log('No map', map.value)
    }
  }, 100)
})
</script>

<template>
  <div id="map" />
</template>

<style scoped>
#map {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}
</style>
