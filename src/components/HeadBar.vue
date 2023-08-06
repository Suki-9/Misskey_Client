<script setup lang="ts">
import { ref } from "vue";

import { HamburgerMenuList } from "../scripts/types";

import HamburgerMenuButton from "./HamburgerMenuButton.vue";
import XHamburgerMenuList from "./HamburgerMenuList.vue";

defineProps<{ title?: string; listData: HamburgerMenuList }>();

const isActive = ref(false);
</script>

<template>
  <div :class="$style.root">
    <HamburgerMenuButton :isActive="isActive" @switch="isActive = !isActive" />
    <h4>{{ title }}</h4>
  </div>
  <XHamburgerMenuList
    v-show="isActive"
    :listData="listData"
    @switch="isActive = !isActive"
  />
</template>

<style module lang="scss">
.root {
  display: flex;
  align-items: center;
  flex-direction: row;

  width: 100%;

  border-bottom: solid 1px var(--primary-border-color);
}
</style>
