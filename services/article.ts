import { trasnformArticleData } from "~/mock/transform"
import { api } from "."
import type { ArticleItem, ArticleItemApi } from "~/types"

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
    }
}

export default ArticleService
