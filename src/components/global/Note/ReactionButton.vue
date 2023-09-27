<script setup lang="ts">
// TS Module -------------------------------------------///
import { readCookie } from "../../../scripts/cookie";
import { fetchMisskeyAPI } from "../../../scripts/API/fetchAPI";

const props = defineProps<{
  reaction: any;
  noteId: string;
  myReaction?: string;
}>();

const createReaction = async (reactionName: string) => fetchMisskeyAPI("notes/reactions/create", {
  i: readCookie(`${readCookie("loginHost").unwrap()}_token`).unwrap(),
  noteId: props.noteId,
  reaction: reactionName,
});
</script>


<template>
  <p :class="[$style.reaction, { [$style.reacted]: myReaction == reaction.name }]" @click="createReaction(reaction.name)">
    <span :style="reaction.link && `content: url(${reaction.link})`" :class="$style.emoji">
      {{ reaction.name }}
    </span>
    <span> {{ reaction.count }}</span>
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