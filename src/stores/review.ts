import { acceptHMRUpdate, defineStore } from 'pinia'

export const useReviewStore = defineStore('review', () => {
  const addReview = async (review: any) => {
    const baseUrl = import.meta.env.VITE_API_URL
    const {
      error,
      data,
    } = await useFetch(`${baseUrl}/pwa/reviews`).post(review).json()
    if (error.value) {
      console.error('Error: ', error.value)
      return
    }
    return data.value
  }

  const fetchUserReview = async (userId: number, businessId: number) => {
    const baseUrl = import.meta.env.VITE_API_URL
    const {
      error,
      data,
    } = await useFetch(`${baseUrl}/pwa/reviews/${userId}/${businessId}`).get().json()
    if (error.value) {
      console.error('Error: ', error.value)
      return
    }
    return data.value
  }

  return {
    addReview,
    fetchUserReview,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useReviewStore as any, import.meta.hot))
