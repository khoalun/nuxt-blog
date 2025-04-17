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