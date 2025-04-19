import dayjs from "dayjs";
import type { ArticleItem, ArticleItemApi } from "~/types";
import type { CategoryItemApi, CategoryItem } from "~/types";
export const trasnformArticleData = (
articleApi: ArticleItemApi,
categories?: CategoryItem[]
): ArticleItem => {
  return {
    id: articleApi.id,
    title: articleApi.title.rendered,
    thumbnail: articleApi.featured_media_url,
    slug: `/post/${articleApi.slug}`,
    author: {
      slug: `/author/${articleApi.author}`, // /author/{id}
      avatar: articleApi.author_data.avatar,
      fullName: articleApi.author_data.nickname,
    },
    categories: categories || [],
    viewCount: 0,
    description: articleApi.excerpt?.rendered.replace(/<[^>]*>/g, "") ?? "" ,
    createdAt: dayjs(articleApi.date).toDate(),
  };
};


export const transformCategoryData = (categoryApi: CategoryItemApi): CategoryItem => ({
    id: categoryApi.id,
    title: categoryApi.name,
    slug: `/${categoryApi.name}/${categoryApi.slug}`
});


// slug" 'react/'