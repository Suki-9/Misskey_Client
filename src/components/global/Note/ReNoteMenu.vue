<script setup lang="ts">
import { fetchMisskeyAPI } from '../../../scripts/API/fetchAPI';
import cookie from '../../../scripts/cookie';

const props = defineProps<{
  noteId: string;
  loginUser: LoginUser;
}>();

// TODO ここどうにかしろ
const usersData: Record<string, {
  avatarURL: string,
  host: string,
  token: string,
  userName: string,
}>  = JSON.parse(localStorage.getItem("usersData")!)[cookie.read("loginUser")!]

const reNote = () => fetchMisskeyAPI(
  'notes/create',
  {
    i: usersData.token,
    visibility: 'public',
    renoteId: props.noteId
  },
  usersData.host,
);


</script>

<template>
  <div :class="$style.root">
    <a @click="reNote()">Renote</a>
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
