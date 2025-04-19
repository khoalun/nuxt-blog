import { trasnformArticleData } from "~/mock/transform"
import { api } from "."
import type { ArticleItem, ArticleItemApi } from "~/types"
import CategoryService from "./category"

const ArticleService = {
    getLatest() {
        return api.get<ArticleItemApi[]>('/wp/v2/posts', {
            params: {
                page: 1,
                per_page: 3
            }
        }).then((response) => {
            // return response.data.map((articleApi: ArticleItemApi) => {
            //     return trasnformArticleData(articleApi)
            // })
            return response.data.map(trasnformArticleData)
        }).catch(err => {
            return [] as ArticleItem[]
        })
    },
    async getPopular() {    
    try {
        const articles = await api.get<ArticleItemApi[]> ('/wp/v2/posts', {
            params: {
                page: 1,
                per_page: 3,
                orderby: 'post_views' 
            }
        }); 
        const categories = await CategoryService.getList()

        const finalArticles: ArticleItem[] = articles.data.map((articleApi) => {
            const matchedCategories = categories.filter((cat) =>
                articleApi.categories.includes(cat.id)
            );
      
            return trasnformArticleData(articleApi, matchedCategories);
          });
          console.log(" all categories id:", categories.map((c) => c.id));
          console.log('finalAPI', finalArticles )
          return finalArticles;
 
    } catch(err) {
        console.log('failed to load articles',err)
    }
    }
}

export default ArticleService
