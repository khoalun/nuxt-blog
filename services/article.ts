import { trasnformArticleData } from "~/mock/transform";
import { api, delay } from ".";
import type { ArticleItemApi } from "~/types";
// import mockArticles from '~/mock/articles'

type PostParams = {
  page?: number;
  per_page?: number;
  orderby?: string;
  search?: string;
};

const ArticleService = {
  async getList({ page = 1, per_page = 10, orderby, search }: PostParams) {
    try {
      const response = await api.call().get<ArticleItemApi[]>("/wp/v2/posts", {
        params: {
          page,
          per_page,
          orderby,
          search,
        },
      });
      // return {
      //   articles: mockArticles,
      //   totalArticle: mockArticles.length
      // }
      const articles = response.data.map(trasnformArticleData);
      console.log('articles', response.data)
      const totalArticle = response.headers['x-wp-total']
      return { articles, totalArticle, error: '' };
    } catch (err) {
      return { articles: [], totalArticle: 0, error: 'Something went wrong white fetching data, please try again!' };
    }
  },
  getLatest() {
    return ArticleService.getList({
      page: 1,
      per_page: 3,
    }).then((response) => {
      return response.articles;
    });
  },
  async getPopular() {
    try {
      const response = await ArticleService.getList({
        page: 1,
        per_page: 3,
        orderby: "post_views",
      });

      return response.articles;
    } catch (err) {
      console.log("failed to load articles", err);
    }
  },


};

export default ArticleService;
