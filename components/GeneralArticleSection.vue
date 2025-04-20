<script setup lang="ts">
import mockArticles from "@/mock/latest-articles";
import type { ArticleItem } from "~/types";
import CategoryService from "~/services/category";
import ArticleService from "~/services/article";
import { api } from "~/services";
import type { ArticleItemApi } from "~/types";
import { trasnformArticleData } from "~/mock/transform";

// const { data } = await useAsyncData(() => ArticleService.getPopular() , {
//   server:false,
// });

const articles = ref<ArticleItem[]>([]);
const loading = ref(false); 
const page = ref(1);
const isEnd = ref(false);

const fetchArticles = async () => {
  loading.value = true;
  try {
    const { data } = await api.get<ArticleItemApi[]>("/wp/v2/posts", {
      params: {
        page: page.value,
        per_page: 2,
      },
    });
    console.log("✅ Fetched data:", data);

    if (data.length === 0) {
      isEnd.value = true;
    } else {
      articles.value.push(...data.map(trasnformArticleData));
      page.value++; 
    }
    if (data.length < 2) {
     isEnd.value = true;
  }
  } catch (err) {
    console.error(" Error loading articles:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchArticles();
});

/**
  - Tinh nang Pagination
  - Khi Nguoi Dung F5 lai trang -> Load 2 bai viet -> Tren UI co 2 bai
  - Nguoi dung bam nut "Load More" - "Xem Them" -> Load tiep 2 bai viet nua -> Tren UI se thanh 4 bai
  - Nguoi dung bam nut "Xem Them" lan thu 2 -> Load tiep 1 bai viet nua -> Tren UI se thanh 5 bai
  - Gia su tong bai viet trong Database co 5 bai -> Nut "Xem Them" phai an di. User khong nhan duoc nua

  - Luu y ve UI: Button "Xem Them" phai co loading.
  //  Khi goi API data chua tra ve -> Show Loading: true. Data tra ve thanh cong -> Loading: false
*/
</script>

<template>
  <div class="articles-list section">
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

      <div class="text-center" v-if="!isEnd">
        <SharedButton
          :loading="loading"
          variant="primary"
          size="large"
          loadingPos="left"
          v-on:click="fetchArticles"
        >
         Load More
        </SharedButton>
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
