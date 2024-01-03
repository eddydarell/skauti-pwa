import { defineStore } from 'pinia'

const businessStore = useBusinessStore()

export const useSearchStore = defineStore('search', () => {
  const results = ref([])

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

  const searchByQuery = async (query: string, type: string = 'all') => {
    const queryParam = new URLSearchParams({
      query,
      type,
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
    searchQuery,
    searchById,
    searchByQuery,
  }
})
