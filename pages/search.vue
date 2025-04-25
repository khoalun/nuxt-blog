<script setup lang="ts">
import { useArticles } from "~/composables/useArticles";

const route = useRoute();
const searchParams = computed(() => {
  return {
    search: String(route.query.q || '')
  }
})

const {
  page,
  articles,
  totalArticle,
  loading,
  isAbleToLoadMore,
  handleLoadMoreArticles,
  totalPage,
  handleFetchArticleForPage,
  reInitArticles
} = await useArticles(searchParams);

watch(searchParams, () => {
  reInitArticles()
})

</script>

<template>
  <div>
    <div class="articles-list section">
      <div class="tcl-container">
        <SharedMainTitle class="main-title__search">
          {{ totalArticle }} Results found for "{{ route.query.q }}"
        </SharedMainTitle>

        <div v-if="loading" class="text-center py-8">
          <div>Loading...</div>
        </div>

        <div
          v-for="article in articles"
          :key="article.id"
          class="tcl-row tcl-jc-center"
        >
          <div class="tcl-col-12 tcl-col-md-8 mb-[30px]">
            <SharedArticleItem
              :article="article"
              :is-show-categories="true"
              :is-card="true"
              :isShowAvatar="false"
              :isShowCountView="false"
            />
          </div>
        </div>

        <!-- Pagination -->
        <div
          class="text-center flex gap-1 items-center justify-center"
          v-if="isAbleToLoadMore"
        >
          <!-- <SharedButton
            :disabled="page <= 1"
            variant="category"
            v-on:click="() => handleFetchArticleForPage(page - 1)"
            ><</SharedButton
          >
          <SharedButton
            v-for="index in totalPage"
            :disabled="page === index"
            :variant="page === index ? 'primary' : 'default'"
            v-on:click="() => handleFetchArticleForPage(index)"
            >{{ index }}
          </SharedButton>
          <SharedButton
            :disabled="page >= totalPage"
            variant="category"
            v-on:click="() => handleFetchArticleForPage(page + 1)"
            >></SharedButton
          > -->
          <!-- 5 bai, 2 bai -> tong 3 trang -->
        <SharedButton :loading="loading" variant="primary" size="large" loadingPos="left" v-on:click="handleLoadMoreArticles">
          Load More
        </SharedButton>
        </div>
      </div>
    </div>
  </div>
</template>
