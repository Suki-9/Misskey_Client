<script setup lang="ts">
//TS Module
import { postReNote } from "../../scripts/API/note";

defineProps<{
  noteId: string;
  replyText: string;
}>();
</script>

<template>
  <div :class="$style.root">
    <a @click="postReNote(noteId)">Renote</a>
    <a>引用</a>
  </div>
</template>

<style module lang="scss">
.root {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  height: 10vh;
  width: calc(90vw - 2px);

  margin: 0 2.5vw;
  padding: 2.5vw 2.5vw 0 2.5vw;

  border: solid 1px var(--primary-border-color);
  background-color: var(--primary-bg-color);

  p {
    font-size: 80%;
  }
  p::before {
    content: "・";
  }
}
</style>
