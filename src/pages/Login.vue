<script setup lang="ts">
//TS Module
import { HamburgerMenuList } from "../scripts/types";

//Vue Component
import HeadBar from "../components/Login/HeadBar.vue";

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
