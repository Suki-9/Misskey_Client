<script setup lang="ts">
// TS Module -------------------------------------------///
import { fetchMisskeyAPI } from "../../../scripts/API/fetchAPI";
import { readCookie } from "../../../scripts/cookie";
import { searchEmoji } from "../../../scripts/emoji";

// Type ------------------------------------------------///
import { ModifiedNote } from "../../../scripts/Types/types";

const props = defineProps<{
  reaction: [string, number];
  note: ModifiedNote;
}>();

let emojiURL: string | Result<string> = searchEmoji(props.reaction[0]);
emojiURL = emojiURL.isOk ? emojiURL.value : props.note.reactionEmojis[props.reaction[0].replaceAll(":", "")];

const createReaction = async (reactionName: string) => {
  const body = {
    i: readCookie(`${readCookie("loginHost").value}_token`).value,
    noteId: props.note.id,
    reaction: reactionName,
  };
  if (props.note.myReaction) {
    fetchMisskeyAPI("notes/reactions/delete", body);
  } else {
    fetchMisskeyAPI("notes/reactions/create", body);
  }
};
</script>

<template>
  <p
    :class="[$style.reaction, { [$style.reacted]: note?.myReaction == reaction[0] }]"
    @click="createReaction(reaction[0])"
  >
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
</style>
../../../scripts/Types/types
