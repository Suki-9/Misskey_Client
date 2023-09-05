<script setup lang="ts">
//TS Module
import { fetchMisskeyAPI } from "../../scripts/API/fetchAPI";
import { readCookie } from "../../scripts/cookie";

const props = defineProps<{
  noteId: string;
  replyText: string;
}>();

const renote = () => {
  fetchMisskeyAPI("notes/create",
    {
      i: readCookie(`${readCookie("loginHost").unwrap()}_token`).unwrap(),
      renoteId: props.noteId,
    }
  )
}
</script>

<template>
  <div :class="$style.root">
    <a @click="renote()">Renote</a>
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
