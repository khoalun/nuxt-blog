import CategoryService from "~/services/category"
import type { CategoryItem } from "~/types"

// React: Custom Hook
// Vue: Composable
type HashCategories = Record<string, CategoryItem>

const useCategories = async () => {
    const hashCategories = useState('hashCategories', () => {
        return {} as HashCategories
    })
    const categories = useState('categories', () => {
        return [] as CategoryItem[]
    })

    await callOnce(async () => {
        const listCategories = await CategoryService.getList()
        const hashObject: HashCategories = {}

        listCategories.forEach((categoryItem) => {
            hashObject[categoryItem.id] = categoryItem
            // hashObject[key] = value
        })

        categories.value = listCategories
        hashCategories.value = hashObject
    })

    return { categories, hashCategories }
}

export default useCategories
