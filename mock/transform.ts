import dayjs from "dayjs";
import type { ArticleItem, ArticleItemApi, MenuItem, MenuItemApi } from "~/types";
import type { CategoryItemApi, CategoryItem } from "~/types";
export const trasnformArticleData = (
articleApi: ArticleItemApi
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
    listCategoryIds: articleApi.categories,
    viewCount: articleApi.view_count,
    description: articleApi.excerpt?.rendered.replace(/<[^>]*>/g, "") ?? "" ,
    createdAt: dayjs(articleApi.date).toDate(),
  };
};


export const transformCategoryData = (categoryApi: CategoryItemApi): CategoryItem => ({
    id: categoryApi.id,
    title: categoryApi.name,
    slug: `/category/${categoryApi.slug}`
});


export const transformMenuData = (menuApi: MenuItemApi) : MenuItem => ({
  id: menuApi.ID,
  label: menuApi.title,
  slug: menuApi.url,
  items: menuApi.child_items?.map(transformMenuData) || []
})