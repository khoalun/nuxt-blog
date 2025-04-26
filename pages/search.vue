<script setup lang="ts">
import { useArticles } from "~/composables/useArticles";
import { useVirtualList } from "@vueuse/core";

const route = useRoute();
const searchParams = computed(() => {
  return {
    search: String(route.query.q || ""),
  };
});

const {
  page,
  articles: allArticles, // data goc 10.000 phan tu [baiviet1, baiviet2, ...]
  totalArticle,
  loading,
  isAbleToLoadMore,
  handleLoadMoreArticles,
  totalPage,
  handleFetchArticleForPage,
  reInitArticles,
} = await useArticles(searchParams);

const {
  list: virtualArticleList, // data hien thi ra UI: 23 phan tu [ { data: baiviet1, index }, { data: baiviet2 } ]
  containerProps,
  wrapperProps,
  // scrollTo
} = useVirtualList(allArticles, {
  itemHeight: (index: number) => {
    return 213;
  },
  overscan: 10,
});

watch(searchParams, () => {
  reInitArticles();
});
</script>

<template>
  <div>
    <div class="articles-list section">
      <div class="tcl-container">
        <SharedMainTitle class="main-title__search">
          {{ totalArticle }} Results found for "{{ route.query.q }}"
          {{ virtualArticleList.length }}
        </SharedMainTitle>
      </div>
      <div v-if="loading" class="text-center py-8">
        <div>Loading...</div>
      </div>

      <div
        v-bind="containerProps"
        class="h-[100vh] overflow-auto py-5"
      >
        <div v-bind="wrapperProps">
          <div
            v-for="virtualItem in virtualArticleList"
            :key="virtualItem.data.id"
            class="tcl-row tcl-jc-center"
            v-bind:data-index="virtualItem.index + 1"
          >
            <div class="tcl-container">
              <div class="tcl-col-12 tcl-col-md-8 mb-[30px] mx-auto">
                <SharedArticleItem
                  :article="virtualItem.data"
                  :is-show-categories="true"
                  :is-card="true"
                  :isShowAvatar="false"
                  :isShowCountView="false"
                />
              </div>
            </div>
          </div>
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
        <SharedButton
          :loading="loading"
          variant="primary"
          size="large"
          loadingPos="left"
          v-on:click="handleLoadMoreArticles"
        >
          Load More
        </SharedButton>
      </div>
    </div>
  </div>
</template>
