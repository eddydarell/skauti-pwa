import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const isUserLoggedIn = ref(true)
  const radius = ref(0)
  const userDbId = ref(0)
  const coordinates = ref({ lat: 0, lng: 0 })

  return {
    isUserLoggedIn,
    radius,
    userDbId,
    coordinates,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
