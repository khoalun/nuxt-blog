<script setup>
import { generateArticle } from '~/mock/latest-articles';

const variant = ref("default");
const size = ref("");
const loading = ref(false);
const position = ref("left");
const content = ref("Content Example");

const articleA = generateArticle()
const articleB = generateArticle()

</script>

<template>
  <div class="tcl-container py-10">
    <div class="border border-solid border-[#ddd] p-3">
      <h1>Component Article</h1>

      <div class="flex flex-row gap-3 justify-center">
        <div class="w-[340px]">
          <SharedArticleItem :article="articleA" />
        </div>
        <div class="w-[340px]">
          <SharedArticleItem :article="articleB" :is-card="true" :is-row="true" :is-show-categories="true"
            :is-show-description="true" />
        </div>
      </div>
      <div class="flex flex-row gap-3 justify-center">
        <div class="w-[660px]">
          <SharedArticleItem :article="articleB" :is-card="true" :is-show-categories="true"
            :is-show-description="true" />
        </div>
        <div class="w-[660px]">
          <SharedArticleItem :article="articleB" :is-card="true" :is-show-categories="false"
            :is-show-description="false" :is-show-avatar="false" />
        </div>
      </div>
    </div>
    <div class="border border-solid border-[#ddd] p-3">
      <h1>Component Main Title</h1>
      <SharedMainTitle>
        Bai Viet Moi Nhat
      </SharedMainTitle>
      <SharedMainTitle>
        Bai Viet Gan Day
      </SharedMainTitle>
    </div>
    <div class="border border-solid border-[#ddd] p-3">
      <h1>Component Button</h1>
      <form>
        <h3>Button Variant</h3>
        <div class="flex items-center">
          <input v-model="variant" id="default-radio-1" type="radio" value="default" name="variant"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 mb-0">Variant Default</label>
        </div>
        <div class="flex items-center">
          <input v-model="variant" id="default-radio-2" type="radio" value="category" name="variant"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 mb-0">Variant Category</label>
        </div>
        <div class="flex items-center">
          <input v-model="variant" id="default-radio-2" type="radio" value="primary" name="variant"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 mb-0">Variant Primary</label>
        </div>
      </form>
      <form>
        <h3>Button Size</h3>
        <div class="flex items-center">
          <input v-model="size" id="size-radio-1" type="radio" value="" name="size"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 mb-0">Size Default</label>
        </div>
        <div class="flex items-center">
          <input v-model="size" id="size-radio-2" type="radio" value="large" name="size"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 mb-0">Size Large</label>
        </div>
      </form>

      <form>
        <h3>Button Loading Position</h3>
        <div class="flex items-center">
          <input v-model="position" id="position-radio-1" type="radio" value="left" name="position"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 mb-0">Left</label>
        </div>
        <div class="flex items-center">
          <input v-model="position" id="position-radio-2" type="radio" value="right" name="position"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 mb-0">Right</label>
        </div>

        <button v-on:click.prevent="loading = !loading">Trigger Loading</button>
      </form>
      <form>
        <label for="default-radio-2" class="ms-2 text-sm font-medium text-gray-900 mb-0">Button Content</label>
        <input v-model="content" class="w-[300px]" />
      </form>
      <hr />
      <SharedButton v-bind:loading="loading" v-bind:variant="variant" v-bind:size="size" v-bind:loadingPos="position"
        v-on:click="() => console.log('Hello')" data-name="Custom Data Name">{{ content }}</SharedButton>
      <SharedButton as="a" href="/" v-bind:loading="loading" v-bind:variant="variant" v-bind:size="size"
        v-bind:loadingPos="position" v-on:click="() => alert('Move to home page')" data-name="Custom Data Name">{{
          content }}</SharedButton>
    </div>
  </div>
</template>
