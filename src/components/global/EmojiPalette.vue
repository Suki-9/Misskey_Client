<script setup lang="ts">
//TS Module
import { readEmojiIndex, searchEmoji } from "../../scripts/emoji";
import { ref } from "vue";

const emojiCategorys = readEmojiIndex("category");
const showCategorys = ref<Record<string, boolean>>({});

Object.keys(emojiCategorys).forEach(category => {
  showCategorys.value[category] = false;
});
</script>

<template>
  <div :class="$style.root">
    <div v-for="category in Object.keys(emojiCategorys)">
      <a
        :class="$style.category"
        @click="showCategorys[category] = !showCategorys[category]"
      >
        {{ category }}
        <span></span>
      </a>
      <div v-if="showCategorys[category]" :class="$style.emojiBox">
        <a v-for="emoji in emojiCategorys[category]">
          <img
            :src="
              //@ts-ignore
              searchEmoji(emoji).value
            "
            :class="$style.emoji"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
@import "../../styles/globalComponent.css";
.root {
  margin: 0 2.5vw;

  overflow: scroll;

  background-color: var(--primary-bg-color);

  border-radius: var(--default-border-radius) var(--default-border-radius) 0 0;
  border: solid 1px var(--primary-text-color);
  .category {
    display: flex;
    align-items: center;
    flex-direction: row;

    height: 2.5vh;
    width: calc(90vw - 2px);

    margin: 0 2.5vw 1.25vh 2.5vw;

    font-size: 60%;
    white-space: nowrap;
    overflow: hidden;
    span {
      padding: 1px 0 0 0;
      width: 100%;
      border-bottom: solid 1px var(--primary-border-color);
    }
  }
  .emojiBox {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    margin: 0 2.5vw;

    .emoji {
      width: 10vw;

      object-fit: cover;
      object-position: left;

      overflow: hidden;
    }
  }
}
</style>
