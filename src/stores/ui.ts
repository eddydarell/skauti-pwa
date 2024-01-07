import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUIStore = defineStore('ui', () => {
  const searchActive = ref(false)
  const hasCategories = ref(false)
  const menuActive = ref(false)
  const businessListKey = ref(0)
  const businessSelected = ref(false)
  const pagePosition = ref(1)
  const prevPagePosition = ref(1)

  return {
    searchActive,
    hasCategories,
    menuActive,
    businessListKey,
    businessSelected,
    pagePosition,
    prevPagePosition,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUIStore as any, import.meta.hot))
