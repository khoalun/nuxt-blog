<script setup lang="ts">
import dayjs from "dayjs";
import dayjsVi from "dayjs/locale/vi";
import relativeTime from "dayjs/plugin/relativeTime";
import type { ArticleItem } from "~/types";

dayjs.locale(dayjsVi);
dayjs.extend(relativeTime);

type Props = {
  article?: ArticleItem;
  isCard?: boolean
  isRow?: boolean
  isShowAvatar?: boolean
  isShowCategories?: boolean
  isShowDescription?: boolean
  isShowCountView?: boolean
};

const props = withDefaults(defineProps<Props>(), {
  isShowAvatar: true,
  isShowCountView: true
});
const article = toRef(props.article);
const isShowAvatar = toRef(props.isShowAvatar ?? true)

const isShowCountView = toRef(props.isShowCountView ?? true)

const createdAt = computed(() => {
  if (!article.value)
    return {
      formatted: "",
      relativeFormatted: "",
    };
  const date = dayjs(article.value.createdAt);
  return {
    formatted: date.format("MMM DD, YYYY"),
    relativeFormatted: date.fromNow(),
  };
});

const { hashCategories } = await useCategories()

const classes = computed(() => {
  return {
    "article-item": true,
    "style-row": props.isRow,
    "style-card": props.isCard,
  };
});

const categories = computed(() => {
  if (!props.isShowCategories || !Array.isArray(article.value?.listCategoryIds)) return []
  return article.value.listCategoryIds.map((categoryId) => {
    return hashCategories.value[categoryId]
  })
})

</script>

<template>
  <article v-if="article" v-bind:class="classes">
    <div class="article-item__thumbnail">
      <NuxtLink :href="article.slug">
        <img :src="article.thumbnail" :alt="article.title" />
      </NuxtLink>
    </div>
    <!-- v-for="item in articles" :key="item.id" -->
    <div class="article-item__content">
      <ul v-if="props.isShowCategories" class="article-item__categories">
        <li v-for="item in categories" :key="item.id">
          <NuxtLink :to="item.slug" class="text-blue-500 hover:underline">
            <SharedButton :href="item.slug" variant="category">{{ item.title }}
            </SharedButton>
          </NuxtLink>
        </li>
      </ul>
      <ul v-if="props.isShowCategories" class="article-item__stats">
        <li>
          <i  v-if="isShowCountView" class="icons ion-ios-eye"></i>
          <span class="text" v-if="isShowCountView">{{ article.viewCount }}</span>
        </li>
      </ul>
      <h2 class="article-item__title">
        <NuxtLink :href="article.slug">{{ article.title }}</NuxtLink>
      </h2>
      <p v-if="props.isShowDescription" class="article-item__desc">{{ article.description }}</p>
      <div class="article-item__info">
        <div v-if="isShowAvatar" class="article-item__author-image">
          <NuxtLink v-bind:aria-label="article.author.fullName" :href="article.author.slug">
            <img :src="article.author.avatar" :alt="article.author.fullName" />
          </NuxtLink>
        </div>
        <div class="article-item__info-right">
          <div class="article-item__author-name">
            <NuxtLink v-bind:aria-label="article.author.fullName" :href="article.author.slug"><strong>{{
              article.author.fullName }}</strong></NuxtLink>
          </div>
          <div class="article-item__datetime">
            <div class="date">{{ createdAt.formatted }}</div>
            <div class="time">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="css-uk6cul"
                height="1em" width="2em" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z">
                </path>
              </svg>
              {{ createdAt.relativeFormatted }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.article-item {
  position: relative;
  box-shadow: rgba(1, 1, 1, 0.05) 1px 1px 5px 0px;
  background-color: #fff;
  border-radius: 1rem;
  overflow: hidden;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
}

.article-item__thumbnail {
  flex-basis: 33.3333%;
  max-width: 33.3333%;
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  margin: 0.5rem 0 0.5rem;
}

.article-item__thumbnail::before {
  content: "";
  display: block;
  padding-top: 130%;
}

.article-item__thumbnail a,
.article-item__thumbnail img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.article-item__thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

@media screen and (min-width: 640px) {
  .article-item__thumbnail {
    flex-basis: 100%;
    max-width: 100%;
    margin: 0;
  }
}

.article-item__content {
  flex: 1 1 0%;
  padding: 1rem;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

@media screen and (min-width: 640px) {
  .article-item__content {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 3;
    padding: 2rem;
    background: linear-gradient(0deg, #2d3748, 70%, transparent 100%);
  }
}

.article-item__title {
  margin: 0;
  padding: 0;
}

.article-item__title>a {
  font-family: Muli, sans-serif;
  line-height: 1.33;
  display: block;
  color: #2d3748;
  font-weight: bold;
  font-size: 1.25rem;
  margin: 0px 0px 1rem;
}

@media screen and (min-width: 640px) {
  .article-item__title>a {
    color: #edf2f7;
    font-size: 1.5rem;
    text-shadow: 1px 1px 2px #2d3748;
    margin-top: auto;
  }
}

@media screen and (min-width: 640px) {
  .article-item__title {
    margin-top: auto;
  }
}

.article-item__desc {
  font-size: 0.875rem;
  margin: 0px 0px 1rem;
  flex: 1 1 auto;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}

.article-item__categories {
  margin: 0 0 0.5rem;
  padding: 0;
  list-style: none;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.article-item__categories>li {
  margin: 0px 0.5rem 0.5rem 0;
}

.article-item__categories>li:last-child {
  margin-right: 0;
}

.article-item__stats {
  list-style: none;
  margin: 0;
  padding: 0.25rem 0;
  position: absolute;
  top: 1rem;
  right: 1rem;
}

@media screen and (min-width: 640px) {
  .article-item__stats {
    top: 2rem;
    right: 2rem;
  }
}

.article-item__stats li {
  font-size: 0;
}

.article-item__stats li .icons {
  margin-right: 0.2rem;
}

.article-item__stats li .icons::before {
  font-size: 1rem;
}

.article-item__stats li .text {
  font-size: 0.75rem;
}

.article-item__stats li .icons,
.article-item__stats li .text {
  display: inline-block;
  vertical-align: middle;
}

.article-item__info {
  font-size: 0.875rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.article-item__info-right {
  color: #a0aec0;
  flex: 1 1 0%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.article-item__author-image {
  width: 48px;
  height: 48px;
  background-color: #e2e8f0;
  display: none;
  vertical-align: middle;
  opacity: 0.9;
  margin: 0px 1rem 0px 0px;
  border-radius: 100%;
  overflow: hidden;
}

.article-item__author-image a,
.article-item__author-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-item__author-image:hover {
  opacity: 1;
}

@media screen and (min-width: 640px) {
  .article-item__author-image {
    display: inline-block;
  }
}

.article-item__author-name {
  flex-basis: 100%;
  padding-right: 0.5rem;
}

.article-item__author-name a {
  color: #718096;
  user-select: none;
  margin: 0px;
}

.article-item__author-name strong {
  font-weight: 500;
}

@media screen and (min-width: 640px) {
  .article-item__author-name {
    padding-right: 0px;
  }

  .article-item__author-name a,
  .article-item__author-name a:visited {
    color: #fff;
  }
}

.article-item__datetime {
  white-space: nowrap;
  text-overflow: ellipsis;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.article-item__datetime .time {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0px;
}

.article-item__datetime .time::before {
  content: " . ";
  display: inline-block;
}

.article-item.style-card {
  background-color: #fff;
  transition: all 250ms ease 0s;
}

.article-item.style-card:hover {
  transform: translateY(-0.25rem);
  box-shadow: rgba(46, 41, 51, 0.08) 0px 2px 4px,
    rgba(71, 63, 79, 0.16) 0px 5px 10px;
}

.article-item.style-card .article-item__thumbnail {
  flex-basis: 40%;
  max-width: 40%;
  margin: 0.5rem 0px 0.5rem 0.5rem;
  box-shadow: 0px 0px 2px 0 rgba(0, 0, 0, 0.3);
}

.article-item.style-card .article-item__thumbnail::before {
  padding-top: 76%;
}

.article-item.style-card .article-item__content {
  position: relative;
  width: auto;
  height: auto;
  background: transparent;
}

.article-item.style-card .article-item__title {
  margin-top: 0;
}

.article-item.style-card .article-item__title>a {
  color: #2d3748;
  font-size: 1.25rem;
  text-shadow: none;
}

.article-item.style-card .article-item__author-name a,
.article-item.style-card .article-item__author-name a:visited {
  color: #718096;
}

@media screen and (max-width: 480px) {
  .article-item.style-card {
    -webkit-box-align: stretch;
    -webkit-align-items: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .article-item.style-card .article-item__thumbnail {
    flex-basis: 100%;
    max-width: 100%;
    margin: 0.5rem 0.5rem 0px;
  }
}

@media screen and (min-width: 768px) {
  .article-item.style-card.style-row {
    height: 100%;
    -webkit-box-align: stretch;
    -webkit-align-items: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .article-item.style-card.style-row .article-item__thumbnail {
    flex-basis: 100%;
    max-width: 100%;
    margin: 0.5rem 0.5rem 0px;
  }
}

@media screen and (min-width: 640px) {
  .article-item {
    background-color: transparent;
  }
}
</style>
