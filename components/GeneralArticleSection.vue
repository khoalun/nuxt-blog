<script setup lang="ts">
import { useArticles } from "~/composables/useArticles";

const {
  page,
  articles,
  loading,
  handleLoadMore,
  isAbleToLoadMore,
  totalPage,
  handleFetchArticleForPage,
} = await useArticles();
</script>

<template>
  <div class="articles-list section" v-if="articles.length">
    <div class="tcl-container">
      <SharedMainTitle class="d-flex tcl-jc-between tcl-ais-center">
        <template v-slot:default>General Articles</template>
        <template v-slot:action>
          <SharedButton>View more</SharedButton>
        </template>
      </SharedMainTitle>

      <div class="tcl-row">
        <div
          v-for="item in articles"
          :key="item.id"
          class="tcl-col-12 tcl-col-md-6"
        >
          <SharedArticleItem
            :article="item"
            :is-card="true"
            :is-show-categories="false"
            :is-show-description="false"
            :is-show-avatar="false"
          />
        </div>
      </div>

      <div
        class="text-center flex gap-1 items-center justify-center"
        v-if="isAbleToLoadMore"
      >
        <SharedButton
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
        >
        <!-- 5 bai, 2 bai -> tong 3 trang -->
        <!-- <SharedButton :loading="loading" variant="primary" size="large" loadingPos="left" v-on:click="handleLoadMore">
          Load More
        </SharedButton> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.articles-list .tcl-row > [class^="tcl-col-"] {
  margin-bottom: 30px;
}

.articles-list .tcl-row .article-item {
  height: 100%;
}
</style>
