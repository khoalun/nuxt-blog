<script setup lang="ts">
    import mockLatestArticles from '@/mock/latest-articles'

    const articles = ref(mockLatestArticles)
</script>

<template>
    <div class="latest-news section">
        <div class="tcl-container">
            <SharedMainTitle>Bài Viết Mới Nhất</SharedMainTitle>

            <div class="latest-news__list spacing">
                <div v-for="item in articles" :key="item.id" class="latest-news__card">
                    <SharedArticleItem v-bind:article="item" />
                </div>
                <!-- <div class="latest-news__card">
                    <SharedArticleItem></SharedArticleItem>
                </div>
                <div class="latest-news__card">
                    <SharedArticleItem></SharedArticleItem>
                </div> -->
            </div>
        </div>
    </div>
</template>

<style scoped>
.latest-news__list {
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
}

.latest-news__card {
    flex-basis: 100%;
    padding: 0.5rem;
    -webkit-box-flex: 1;
    flex-grow: 1;
}

@media screen and (min-width: 640px) {
    .latest-news__card {
        flex-basis: 50%;
        max-width: 50%;
    }
}

@media screen and (min-width: 768px) {
    .latest-news__card {
        flex-basis: 33.3333%;
        min-width: 33.3333%;
    }
}
</style>