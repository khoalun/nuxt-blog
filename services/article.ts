import { trasnformArticleData } from "~/mock/transform";
import { api } from ".";
import type { ArticleItem, ArticleItemApi } from "~/types";
import CategoryService from "./category";

type PostParams = {
  page?: number;
  per_page?: number;
  orderby?: string;
};

const ArticleService = {
  async getList({ page = 1, per_page = 10, orderby }: PostParams) {
    const result = await api.get<ArticleItemApi[]>("/wp/v2/posts", {
      params: {
        page,
        per_page,
        orderby,
      },
    });
    // await delay(5);
    return result;
  },
  async getLatest() {
    return ArticleService.getList({
      page: 1,
      per_page: 3,
    })
      .then((response) => {
        // return response.data.map((articleApi: ArticleItemApi) => {
        //     return trasnformArticleData(articleApi)
        // })
        return response.data.map(trasnformArticleData);
      })
      .catch((err) => {
        return [] as ArticleItem[];
      });
  },
  async getPopular() {
    try {
      const articles = await ArticleService.getList({
        page: 1,
        per_page: 3,
        orderby: "post_views",
      });

      const finalArticles: ArticleItem[] = articles.data.map(trasnformArticleData);

      return finalArticles;
    } catch (err) {
      console.log("failed to load articles", err);
    }
  },
};

export default ArticleService;
