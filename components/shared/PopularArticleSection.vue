<script setup lang="ts">
import mockArticles from '@/mock/latest-articles'
import type { ArticleItem } from "~/types";

// Goi Article
// Goi Category

const articles = ref<ArticleItem[]>(mockArticles);


</script>


<template>
    <div class="popular-news section bg-white-blue">
        <div class="tcl-container">
            <SharedMainTitle class="d-flex tcl-jc-between tcl-ais-center">
                <template v-slot:default>
                    Popular Articles
                </template>
                <template v-slot:action>
                    <SharedButton>View more</SharedButton>
                </template>
            </SharedMainTitle>

            <div class="popular-news__list spacing">
                <div class="popular-news__list--left">
                    <div class="popular-news__list--row">
                        <!-- Popular news card -->
                        <div class="popular-news__list--card">
                            <SharedArticleItem :article="articles[0]" :is-show-categories="true"
                                :is-show-description="true" :is-card="true" />
                        </div>
                        <!-- End Popular news card -->

                        <!-- Popular news card -->
                        <div class="popular-news__list--card">
                            <SharedArticleItem :article="articles[1]" :is-show-categories="true"
                                :is-show-description="true" :is-card="true" />
                        </div>
                        <!-- End Popular news card -->
                    </div>
                </div>
                <div class="popular-news__list--right">
                    <div class="popular-news__list--row">
                        <!-- Popular news card -->
                        <div class="popular-news__list--card">
                            <SharedArticleItem :article="articles[2]" :is-show-categories="true"
                                :is-show-description="true" :is-card="true" :is-row="true" />
                        </div>
                        <!-- End Popular news card -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.popular-news__list {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
}

.popular-news__list--left {
    flex: 1 1 0%;
}

.popular-news__list--right {
    width: 100%;
    max-width: 1140px;
    flex-basis: 33.3333%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    margin: 1rem 0 0 auto;
}

.popular-news__list--row {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin: -0.5rem;
}

.popular-news__list--card {
    -webkit-box-flex: 1;
    flex-grow: 1;
    padding: 0.5rem;
}

@media screen and (min-width: 768px) {
    .popular-news__list {
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
    }

    .popular-news__list--right {
        padding-left: 1rem;
        margin-top: 0;
    }
}
</style>
