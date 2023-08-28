<script setup lang="ts">
//TS Module
import { readEmojiIndex } from "../../scripts/emoji";
const emojiCategorys = readEmojiIndex("category")
</script>

<template>
  <div :class="$style.root">
    <div v-for="category in Object.keys(emojiCategorys)">
      {{ category }}
    </div>
  </div>
</template>

<style module lang="scss">
.root {
  width: 98vw;
  border-radius: var(--default-border-radius);

  overflow: scroll;

  background-color: var(--primary-bg-color);
}

</style>