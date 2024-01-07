import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([])
  const flatCategories = ref([])

  const baseUrl = import.meta.env.VITE_API_URL

  const fetchAllCategories = async () => {
    const {
      data,
      error,
      isFinished,
    } = await useFetch(
      `${baseUrl}/categories`,
      {
        method: 'GET',
      },
    )

    categories.value = JSON.parse(data.value)
    flatCategories.value = categories.value.map((category) => {
      return {
        id: category.id,
        name: category.name,
        color: category.color,
        subcategories: category.subcategories.map((subcategory) => {
          return {
            id: subcategory.id,
            name: subcategory.name,
            color: subcategory.color,
          }
        }),
      }
    }).flat()

    return { data, error, isFinished }
  }

  const fetchCategoryById = async (id: number) => {
    const { data, pending, error, refresh } = await useFetch(
      `${baseUrl}/categories/${id}`,
      {
        method: 'GET',
      },
    )

    return { data, pending, error, refresh }
  }

  const getCategoryById = (id: number) => {
    return categories.value.find(category => category.id === id)
  }

  const getSubcategoryParentCategory = (id: number) => {
    return categories.value.find(category => category.subcategories.some(subcategory => subcategory.id === id))
  }

  const getSubcategoryById = (id: number) => {
    const parentCategory = getSubcategoryParentCategory(id)
    return parentCategory.subcategories.find(subcategory => subcategory.id === id)
  }

  const categoryIsParent = (categoryId: number, subcategoryId: number) => {
    return categories.value.find(category => category.id === categoryId).subcategories.some(subcategory => subcategory.id === subcategoryId)
  }

  const fetchMostPopularCategories = async () => {
    const { data, pending, error, refresh } = await useFetch(
      `${baseUrl}/categories/most-popular`,
      {
        method: 'GET',
      },
    )

    return { data, pending, error, refresh }
  }

  return {
    categories,
    flatCategories,
    fetchAllCategories,
    fetchCategoryById,
    getCategoryById,
    getSubcategoryParentCategory,
    categoryIsParent,
    getSubcategoryById,
    fetchMostPopularCategories,
  }
})
