<script setup lang="ts">
defineProps<{
  text?: string;
  icon?: string;
}>();
</script>

<template>
  <div :class="$style.root">
    <i :class="icon"></i>
    <img :class="$style.emoji" :src="icon" v-show="icon"/>
    <p>{{ text }}</p>
  </div>
</template>

<style module lang="scss">
@import "../../styles/globalComponent.css";
.root {
  display: flex;
  align-items: center;
  justify-content: center;

  height: var(--head-bar-height);

  border-bottom: solid 1px var(--primary-border-color);

  p {
    margin-left: 1%;
  }
}
</style>
