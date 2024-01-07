import { defineStore } from 'pinia'

export const useBusinessStore = defineStore('business', () => {
  const businesses = ref([])
  const selectedBusiness = ref({})
  const isLoading = ref(false)
  const hasFinished = ref(false)
  const fetchStatusCode = ref(0)
  const fetchExecute = ref(false)
  const fetchCanAbort = ref(false)
  const fetchAbort = ref(false)
  const hasFetchFailed = ref(false)
  const baseUrl = import.meta.env.VITE_API_URL

  const fetchAllOwnerBusinesses = async (ownerSub: string) => {
    if (!ownerSub) {
      console.error('No owner id provided')
      return
    }

    const {
      isFetching,
      error,
      data,
      abort,
      statusCode,
      isFinished,
      canAbort,
      execute,
    } = await useFetch(`${baseUrl}/pwa/businesses/owner/${ownerSub}`).get().json()
    isLoading.value = isFetching.value
    hasFinished.value = isFinished.value
    fetchStatusCode.value = statusCode
    fetchExecute.value = execute.value
    fetchCanAbort.value = canAbort.value
    fetchAbort.value = abort.value

    if (error.value) {
      console.error('Error: ', error.value)
      hasFetchFailed.value = true
      isLoading.value = false
      return
    }
    businesses.value = data.value
  }

  const fetchBusinessesInVicinity = async (lat: number, lng: number) => {
    if (!lat || !lng) {
      console.error('No lat or lng provided')
      return
    }

    const {
      isFetching,
      error,
      data,
      abort,
      statusCode,
      isFinished,
      canAbort,
      execute,
    } = await useFetch(`${baseUrl}/pwa/businesses/vicinity/${lat}/${lng}/100`).get().json()
    isLoading.value = isFetching.value
    hasFinished.value = isFinished.value
    fetchStatusCode.value = statusCode
    fetchExecute.value = execute.value
    fetchCanAbort.value = canAbort.value
    fetchAbort.value = abort.value

    if (error.value) {
      console.error('Error: ', error.value)
      hasFetchFailed.value = true
      isLoading.value = false
      return
    }
    businesses.value = data.value
  }

  const fetchBusinessById = async (id: string) => {
    if (!id) {
      console.error('No id provided')
      return
    }

    const {
      isFetching,
      error,
      data,
      abort,
      statusCode,
      isFinished,
      canAbort,
      execute,
    } = await useFetch(`${baseUrl}/pwa/businesses/${id}`).get().json()
    isLoading.value = isFetching.value
    hasFinished.value = isFinished.value
    fetchStatusCode.value = statusCode
    fetchExecute.value = execute
    fetchCanAbort.value = canAbort.value
    fetchAbort.value = abort

    if (error.value) {
      console.error('Error: ', error.value)
      hasFetchFailed.value = true
      isLoading.value = false
      return
    }
    businesses.value = data.value
  }

  const getBusinessReviews = (id: number) => {
    return businesses.value.find((business: any) => business.id === id).reviews
  }

  const getBusinessById = (id: number) => {
    return businesses.value.find((business: any) => business.id === id)
  }

  return {
    businesses,
    selectedBusiness,
    isLoading,
    hasFetchFailed,
    hasFinished,
    fetchStatusCode,
    fetchExecute,
    fetchCanAbort,
    fetchAbort,
    fetchAllOwnerBusinesses,
    fetchBusinessById,
    fetchBusinessesInVicinity,
    getBusinessReviews,
    getBusinessById,
  }
})
