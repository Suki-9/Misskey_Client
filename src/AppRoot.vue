<script setup lang="ts">
import PostNote from "./components/global/PostNote.vue";

import { provide, ref } from "vue";
import { IndexedDB } from "@/scripts/indexedDB";
import { api, Stream } from 'misskey-js';
import { Emoji } from '@/scripts/emoji';
import router from "@/plugin/router_index";
import cookie from "./scripts/cookie";

const loginUser = ref<LoginUser>();
const misskeyApi = ref<api.APIClient>();
const stream = ref<Stream>();
const db = ref<IndexedDB>(new IndexedDB());
const emojis = ref<Emoji>();

const users = await db.value.readUser();
if (!users.length) router.push('/login');
else {
  let LoginUserId = cookie.read('loginUser') ?? users[0].userId;
  for (const user of users) if (user.userId == LoginUserId) {
    loginUser.value = user;
    break;
  }

  misskeyApi.value = loginUser.value && new api.APIClient({
    origin: loginUser.value.host,
    credential: loginUser.value.token,
  });

  stream.value = loginUser.value && new Stream(loginUser.value.host, {
    token: loginUser.value.token,
  });

  emojis.value = loginUser.value && new Emoji(loginUser.value.host);
}

const postNoteIsActive = ref<boolean>(false);

// provides
provide('appService', {
  db: db,
  misskeyApi: misskeyApi,
  loginUser: loginUser,
  stream: stream,
});
provide('globalComponents', {
  postNote: postNoteIsActive
})
</script>

<template>
  <PostNote v-bind:isActive="postNoteIsActive" />
  <router-view />
</template>

<style module lang="scss">
</style>