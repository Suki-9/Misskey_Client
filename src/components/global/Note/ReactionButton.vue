<script setup lang="ts">
// TS Module -------------------------------------------///
import { fetchMisskeyAPI } from "../../../scripts/API/fetchAPI";
import { readCookie } from "../../../scripts/cookie";
import { searchEmoji } from "../../../scripts/emoji";
import { inject } from "vue";

// Type ------------------------------------------------///
import { ModifiedNote } from "../../../scripts/types";

const props = defineProps<{
  reaction: [string, number];
  noteId: string;
}>();

const note = inject<ModifiedNote>(props.noteId)
const emojiURL: string = searchEmoji(props.reaction[0]).unwrap_or(
  note!.reactionEmojis[props.reaction[0].replaceAll(":","")]
)

const createReaction = async (reactionName: string) => fetchMisskeyAPI("notes/reactions/create", {
  i: readCookie(`${readCookie("loginHost").unwrap()}_token`).unwrap(),
  noteId: props.noteId,
  reaction: reactionName,
});
</script>


<template>
  <p :class="[$style.reaction, { [$style.reacted]: note?.myReaction == reaction[0] }]" @click="createReaction(reaction.name)">
    <span :style="emojiURL && `content: url(${emojiURL});`" :class="$style.emoji">
      {{ reaction[0] }}
    </span>
    <span>{{ reaction[1] }}</span>
  </p>
</template>


<style module lang="scss">
@import "../../../styles/globalComponent.css";
.reacted {
  background-color: color-mix(in srgb, var(--accent-color), rgba(0, 0, 0, 0) 40%);
}
.emoji {

}
</style>