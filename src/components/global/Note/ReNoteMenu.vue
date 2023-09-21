<script setup lang="ts">
// TS Module -------------------------------------------///
import { fetchMisskeyAPI } from "../../../scripts/API/fetchAPI";
import { readCookie } from "../../../scripts/cookie";

const props = defineProps<{
  noteId: string
}>();

const renote = () => {
  fetchMisskeyAPI("notes/create", {
    i: readCookie(`${readCookie("loginHost").unwrap()}_token`).unwrap(),
    renoteId: props.noteId,
  });
};
</script>

<template>
  <div :class="$style.root">
    <a @click="renote()">Renote</a>
    <a>引用</a>
  </div>
</template>

<style module lang="scss">
@import "../../../styles/animation.css";
.root {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;


  border-top: solid 1px var(--primary-border-color);

  animation-name: moveIn_L;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;

  a {
    margin: 1% 2%;
    padding: 2% 2%;

    font-size: 120%;

    border-radius: var(--default-border-radius);

    &:hover {
      background-color: var(--secondary-bg-color);
    }
  }
}
</style>
