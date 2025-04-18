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
        // 1. API giong nhu cu, them params moi orderby: 'post_views'
        // 2. Goi them API get categories /wp/v2/categories?per_page=100&page=1
        const articles = await [] // Code day
        const categories = await CategoryService.getList()

        // Loop categories id tu BE -> tim ra duoc data tuong ung trong categories
        // Vi du. BE tra ve [6, 19]
        // Output [ { id: 6, title: '???', slug: '???' }, { id: 19, title: '???', slug: '???' } ]
    }
}

export default ArticleService
