<script setup lang="ts">
defineProps<{
  text: string;
  icon: string;
}>();
</script>

<template>
  <div :class="$style.root">
    <i :class="icon"></i>
    <p>{{ text }}</p>
  </div>
</template>

<style module lang="scss">
.root {
  display: flex;
  align-items: center;
  justify-content: center;

  height: var(--head-bar-height);

  border-bottom: solid 1px var(--primary-border-color);
}
</style>
