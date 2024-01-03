import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUIStore = defineStore('ui', () => {
  const searchActive = ref(false)
  const menuActive = ref(false)
  const businessListKey = ref(0)
  const businessSelected = ref(false)
  const pagePosition = ref(1)

  const pageStatus = ref({
    1: '0%',
    2: '20%',
    3: '50%',
    4: '80%',
    5: '100%',
  })

  return {
    searchActive,
    menuActive,
    businessListKey,
    businessSelected,
    pageStatus,
    pagePosition,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUIStore as any, import.meta.hot))
