import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
  const results = ref([])
  const radius = ref(50) // in km
  const searchQuery = ref('')
  const baseUrl = import.meta.env.VITE_API_URL

  const searchById = async (id: number, type: string, radius: number, lat: number, lng: number) => {
    const queryParam = new URLSearchParams({
      search_by_type: type,
      id: id.toString(),
      radius: radius.toString(),
      lat: lat.toString(),
      lng: lng.toString(),
    })
    const { data, pending, error, refresh } = await useFetch(
      `${baseUrl}/pwa/search/business/id?${queryParam.toString()}`,
      {
        method: 'GET',
      },
    )

    // businessStore.businesses.value = JSON.parse(data.value)

    return { data, pending, error, refresh }
  }

  const searchByQuery = async (query: string, type: string = 'all', radius: number, lat: number, lng: number) => {
    const queryParam = new URLSearchParams({
      query,
      type,
      radius: radius.toString(),
      lat: lat.toString(),
      lng: lng.toString(),
    })
    const { data, pending, error, refresh } = await useFetch(
      `${baseUrl}/pwa/search/business/query?${queryParam.toString()}`,
      {
        method: 'GET',
      },
    )

    return { data, pending, error, refresh }
  }

  return {
    results,
    radius,
    searchQuery,
    searchById,
    searchByQuery,
  }
})
