<script setup lang="ts">
import { fetchMisskeyAPI } from "../../../scripts/API/fetchAPI";
import { searchEmoji } from "../../../scripts/emoji";
import { inject } from 'vue'

const props = defineProps<{
  reaction: [string, number];
  note: ModifiedNote;
}>();

const loginUser = inject<LoginUser>("loginUser");

// TODO ここ適当すぎる
let emojiURL: string | undefined | Result<string> =
  loginUser && searchEmoji(props.reaction[0], loginUser.host);
emojiURL = emojiURL?.isOk ? emojiURL.value : props.note.reactionEmojis[props.reaction[0].replaceAll(":", "")];

const createReaction = async (reactionName: string): Promise<void> => {
  if (loginUser) {
    const body = {
      i: loginUser.token,
      noteId: props.note.id,
      reaction: reactionName,
    };
    if (props.note.myReaction) {
      fetchMisskeyAPI("notes/reactions/delete", body, loginUser.host);
    } else {
      fetchMisskeyAPI("notes/reactions/create", body, loginUser.host);
    }
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
