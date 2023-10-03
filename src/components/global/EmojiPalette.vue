<script setup lang="ts">
// TS Module -------------------------------------------///
import { fetchMisskeyAPI } from "../../scripts/API/fetchAPI";
import { readEmojiIndex } from "../../scripts/emoji";
import { readCookie } from "../../scripts/cookie";
import { ref } from "vue";

const props = defineProps<{
  noteId: string;
}>();

const emojiCategorys = readEmojiIndex("category");
const index = readEmojiIndex();
const showCategorys = ref<Record<string, boolean>>({});

Object.keys(emojiCategorys).forEach(category => {
  showCategorys.value[category] = false;
});

const createReaction = async (reactionName: string) => fetchMisskeyAPI("notes/reactions/create", {
  i: readCookie(`${readCookie("loginHost").unwrap()}_token`).unwrap(),
  noteId: props.noteId,
  reaction: `:${reactionName}@.:`,
})
</script>


<template>
  <div :class="$style.root">
    <div v-for="category in Object.keys(emojiCategorys)">
      <a :class="$style.category" @click="showCategorys[category] = !showCategorys[category]">
        {{ category }}
        <span></span>
      </a>
      <div v-if="showCategorys[category]" :class="$style.emojiBox">
        <a
          v-for="emoji in emojiCategorys[category]"
          @click="createReaction(index[emoji].name)"
          :class="$style.emoji"
          :style="index[emoji].url && `content: url(${index[emoji].url});`">
        </a>
      </div>
    </div>
  </div>
</template>


<style module lang="scss">
.root {
  position: fixed;
  top: 60vh;

  height: 40vh;
  width: calc(90vw - 2px);

  padding: 0 2.5vw;

  overflow: scroll;

  background-color: var(--primary-bg-color);

  border-radius: var(--default-border-radius) var(--default-border-radius) 0 0;
  border: solid 1px var(--primary-text-color);
  .category {
    display: flex;
    align-items: center;
    flex-direction: row;

    height: 2rem;

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
    .emoji {
      width: 20%;
      height: 2rem;

      margin: 0.5% 0;

      object-fit: contain;
    }
  }
}
</style>
