<script setup lang="ts">
const headBarData: Record<
  string,
  {
    text: string;
    icon: string;
  }
> = {
  "/settings/themecreate": {
    text: "テーマを作成",
    icon: "icon-cog-outline",
  },
};
</script>

<template>
  <HeadBar :text="headBarData[$route.path].text" :icon="headBarData[$route.path].icon" />
  <router-view />
</template>
