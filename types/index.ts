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
    date: string
}
