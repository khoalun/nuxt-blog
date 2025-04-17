import dayjs from 'dayjs'
import type { ArticleItem, ArticleItemApi } from "~/types";

export const trasnformArticleData = (articleApi: ArticleItemApi): ArticleItem => {
    return {
        id: articleApi.id,
        title: articleApi.title.rendered,
        thumbnail: articleApi.featured_media_url,
        slug: `/post/${articleApi.slug}`,
        author: {
            slug: `/author/${articleApi.author}`, // /author/{id}
            avatar: articleApi.author_data.avatar,
            fullName: articleApi.author_data.nickname
        },
        createdAt: dayjs(articleApi.date).toDate()
    }
}
