import ArticleService from "~/services/article";
import type { ArticleItem } from "~/types";


const PER_PAGE = 2;

export const useArticles = async () => {
  const { data } = await useAsyncData(() =>
    ArticleService.getList({ page: 1, per_page: PER_PAGE })
  );

  const articles = ref<ArticleItem[]>(data.value?.articles || []);
  const page = ref(1);
  const previousPage = ref(1);
  const totalArticle = ref(data.value?.totalArticle || 0);
  const loading = ref(false);

  watch(page, (_, oldPage) => {
    previousPage.value = oldPage
  })

  const fetchArticles = async () => {
    try {
      loading.value = true;
      const response = await ArticleService.getList({
        page: page.value,
        per_page: PER_PAGE,
      });

      if (response.error) {
        // page.value--
        page.value = previousPage.value
        setTimeout(() => {
          alert(response.error)
        }, 100);
        return
      }

      // articles.value = [...articles.value, ...response.articles];
      articles.value = response.articles
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

  const handleFetchArticleForPage = (newPage: number) => {
    if (page.value === newPage || loading.value) return
    page.value = newPage
    fetchArticles()
  }

  const isAbleToLoadMore = computed(() => {
    return articles.value.length < totalArticle.value
  })

  const totalPage = computed(() => {
    return Math.ceil(totalArticle.value / PER_PAGE)
    // Math.floor
  })

  return {
    articles,
    page,
    loading,
    totalPage,
    isAbleToLoadMore,
    handleFetchArticleForPage,
    handleLoadMore
  };
};
