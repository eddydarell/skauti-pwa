import type { LocationQueryRaw } from 'vue-router'
import { useRouter } from 'vue-router'

export function useNavigation() {
  const router = useRouter()
  const navigateTo = (pathString: string, queryObject?: LocationQueryRaw) => {
    router.push(pathString)
    if (queryObject)
      router.push({ path: pathString, query: queryObject })
  }

  return {
    navigateTo,
  }
}
