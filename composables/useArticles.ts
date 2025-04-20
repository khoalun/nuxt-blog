import ArticleService from "~/services/article";
import type { ArticleItem } from "~/types";


const PER_PAGE = 2;

export const useArticles = async () => {
  const { data } = await useAsyncData(() =>
    ArticleService.getList({ page: 1, per_page: PER_PAGE })
  );

  const articles = ref<ArticleItem[]>(data.value?.articles || []);
  const page = ref(1);
  const totalArticle = ref(data.value?.totalArticle || 0);
  const loading = ref(false);

  const fetchArticles = async () => {
    try {
      loading.value = true;
      const response = await ArticleService.getList({
        page: page.value,
        per_page: PER_PAGE,
      });

      if (response.error) {
        page.value--
        setTimeout(() => {
          alert(response.error)
        }, 100);
        return
      }

      articles.value = [...articles.value, ...response.articles];
    } catch (err) {
      console.error(" Error loading articles:", err);
    } finally {
      loading.value = false;
    }
  };

  const handleLoadMore = () => {
    if (loading.value) return
    page.value++;
    fetchArticles()
  }

  const isAbleToLoadMore = computed(() => {
    return articles.value.length < totalArticle.value
  })

  return {
    articles,
    page,
    loading,
    isAbleToLoadMore,
    handleLoadMore
  };
};
