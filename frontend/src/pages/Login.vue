<script setup lang="ts">
import { HamburgerMenuList } from "../scripts/types";

import HeadBar from "../components/HeadBar.vue";

const listData: HamburgerMenuList = [
  {
    title: "MiAuthでログイン",
    link: "/login",
  },
  {
    title: "Tokenでログイン",
    link: "/login/token",
  },
];
</script>

<template>
  <HeadBar
    v-if="$route.name !== 'Callback'"
    :title="`${
      typeof $route.name === 'string' ? $route.name : 'unknown'
    }でログイン`"
    :listData="listData"
  />
  <router-view />
</template>
