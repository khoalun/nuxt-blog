
<script setup lang="ts">
import ArticleService from "~/services/article";
import type { ArticleItem } from "~/types";


const { articles, totalArticle, loading, handleSearch } = await useArticles();


const onSearch = async (keyword: string) => {
  await handleSearch(keyword);
}


</script>


<template>
  <h1>Article list</h1>
  <div class="articles-list section">
    <div class="tcl-container">
      <!-- Main Title -->
      <div class="main-title main-title__search spacing">
        <h2>4 Results found for "search query"</h2>
      </div>
      <!-- End Main Title -->

      <!-- End Row News List -->
      <div class="tcl-row tcl-jc-center">
        <div class="tcl-col-12 tcl-col-md-8">    
            <SharedArticleItem :key="articles[0]?.id" :article="articles[0]" :is-show-categories="true"
            :is-show-description="true" :is-card="true" />
        </div>

        <div class="tcl-col-12 tcl-col-md-8">    
            <SharedArticleItem :key="articles[0]?.id" :article="articles[0]" :is-show-categories="true"
            :is-show-description="true" :is-card="true" />
        </div>

        <div class="tcl-col-12 tcl-col-md-8">    
            <SharedArticleItem :key="articles[0]?.id" :article="articles[0]" :is-show-categories="true"
            :is-show-description="true" :is-card="true" />
        </div>

        <div class="tcl-col-12 tcl-col-md-8">    
            <SharedArticleItem :key="articles[0]?.id" :article="articles[0]" :is-show-categories="true"
            :is-show-description="true" :is-card="true" />
        </div>

        <div class="tcl-col-12 tcl-col-md-8">    
            <SharedArticleItem :key="articles[0]?.id" :article="articles[0]" :is-show-categories="true"
            :is-show-description="true" :is-card="true" />
        </div>
  
      </div>


      <!-- End Row News List -->

      <!-- Btn Loadmore -->
      <div class="text-center">
         <SharedButton :loading="true" variant="primary" size="large" loadingPos="left" >
           Load More
         </SharedButton>
      </div>
    </div>
  </div>
</template>


<style scoped>
.articles-list .tcl-row>[class^="tcl-col-"] {
  margin-bottom: 30px;
}

.articles-list .tcl-row .article-item {
  height: 100%;
}

.main-title h2 {
  font-family: Muli, sans-serif;
  line-height: 1.33;
  color: #2d3748;
  font-weight: bold;
  font-size: 1.5rem;
  position: relative;
  text-align: center; }
  @media screen and (min-width: 640px) {
    .main-title h2 {
      text-align: left;
      padding-left: 2rem; }
      .main-title h2::before {
        background-color: #e2e8f0;
        content: "";
        position: absolute;
        height: 100%;
        width: 5px;
        top: 0px;
        left: 0px;
        border-radius: 100%; } }

.main-title.tcl-jc-between h2 {
  text-align: left; }

.main-title.main-title__search h2 {
  text-align: center; }
  .main-title.main-title__search h2::before {
    content: none; }
</style>

