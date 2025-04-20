import { api } from ".";
import type { CategoryItemApi, CategoryItem } from "~/types";
import { transformCategoryData } from "~/mock/transform";

const CategoryService = {
  async getList() {
    const result = await api.call().get<CategoryItemApi[]>("/wp/v2/categories", {
        params: {
          page: 1,
          per_page: 100,
        },
      })
      .then((response) => {
        return response.data.map(transformCategoryData);
      })
      .catch((err) => {
        return [] as CategoryItem[];
      });
    // await delay(3);
    return result;
  },
};

export default CategoryService;
