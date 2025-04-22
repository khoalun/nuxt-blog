<script setup lang="ts">
import useUserInfo from "~/composables/useUserInfo";
import Cookies from "js-cookie";
import { COOKIE_TOKEN_NAME } from "~/services/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const userInfo = await useUserInfo();

const logout = () => {
  Cookies.remove(COOKIE_TOKEN_NAME);
  userInfo.value = null;
  router.push("/");
};
</script>

<template>
  <header id="header">
    <div class="tcl-container">
      <div class="tcl-row tcl-no-gutters header">
        <div class="tcl-col-2">
          <!-- Logo -->
          <SharedLogo class="header-logo" />
        </div>
        <div class="tcl-col-4">
          <!-- Header Search -->
          <form action="/search.html" method="get">
            <div class="header-search">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                style="flex-shrink: 0"
              >
                <path
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
              <input
                class="header-search__input"
                type="text"
                placeholder="Search articles here ..."
                aria-label="Search"
                name="query"
              />
            </div>
          </form>
        </div>
        <div class="tcl-col-6">
          <!-- Nav -->
          <div class="header-nav">
            <ul class="header-nav__lists">
              <li><a href="#">Home</a></li>
              <li>
                <a href="#">Our Team</a>
                <ul>
                  <li><a href="#">Our Team 1</a></li>
                  <li><a href="#">Our Team 2</a></li>
                  <li><a href="#">Our Team 3</a></li>
                </ul>
              </li>
              <li>
                <a href="#">Contact</a>
                <ul>
                  <li><a href="#">Contact 1</a></li>
                  <li><a href="#">Contact 2</a></li>
                  <li>
                    <a href="#">Contact 3</a>
                    <ul>
                      <li><a href="#">Contact 11</a></li>
                      <li><a href="#">Contact 12</a></li>
                      <li><a href="#">Contact 13</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
            <ul class="header-nav__lists">
              <li class="user" v-if="!userInfo">
                <NuxtLink href="/login"
                  ><i class="icons ion-person"></i> Tài khoản</NuxtLink
                >
              </li>
              <li class="user" v-if="userInfo">
                <div class="flex hover:#5a67d8">
                  <NuxtLink
                    href="/profile"
                    class="mb-0 !flex items-center gap-2 hover:text-[#5a67d8]"
                  >
                    <img
                      class="w-6 h-6 rounded-full"
                      src="data:image/jpeg;base64,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"
                    />
                    {{ userInfo.nickname }}
                  </NuxtLink>
                </div>
                <ul>
                  <li>
                    <NuxtLink
                      class="ml-2 cursor-pointer hover:!text-[#5a67d8]"
                      @click="logout"
                    >
                      <i class="icons ion-log-out"></i> Sign Out
                    </NuxtLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
