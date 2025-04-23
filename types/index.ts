import type { FormData as FormLoginData } from "~/pages/login.vue";
import type { FormData as FormRegisterData } from "~/pages/register.vue";

export type FormUserData = FormLoginData | FormRegisterData

export type CategoryItem = {
    id: number
    title: string
    slug: string
}


export type CategoryItemApi = {
    id: number;
    name: string;
    slug: string;
  };

export type ArticleItem = {
    id: number
    title: string
    thumbnail: string
    slug: string
    author: {
        slug: string
        avatar: string
        fullName: string
    }
    listCategoryIds: number[]
    viewCount: number
    description: string
    createdAt: Date
}

export type ArticleItemApi = {
    id: number
    title: {
        rendered: string
    }
    featured_media_url: string
    slug: string
    author: number
    author_data: {
        avatar: string
        nickname: string
    }
    excerpt: {
        rendered: string
        protected:false
    }
    date: string
    categories: number[]
    view_count: number
}
