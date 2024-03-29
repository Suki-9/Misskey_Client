<script setup lang="ts">
import cookie from "../../scripts/cookie";
import { useRoute, useRouter } from "vue-router";
import { IndexedDB } from "@/scripts/indexedDB";
import { api } from 'misskey-js';


const isArray = Array.isArray;
const router = useRouter();
const route = useRoute();

const host = cookie.read('loginHost');
const session = route.query["session"];
if (host && !isArray(session)) {
  const token = await fetch(`https://kurage-dev.kawaii-music.xyz/api/miauth/authorize?session=${session}&host=${host}`, {
  })
    .then((r) => r.json())
    .then((res) => res.token)
    .catch(() => router.push('/login'));
  if (token) {
    const mk = new api.APIClient({
      origin: host,
      credential: token,
    });
    const userData = await mk.request('i', {});
    const db = new IndexedDB();
    const result = db.addUser({
      host: host,
      token: token,
      userId: userData.id,
      userData: userData,
    });
    if (await result.then(() => true).catch(() => false)) {
      router.push('/');
    } else {
      router.push('/login');
    }
  }
} else {
  router.push('/login');
}
</script>

<template>
  <p style="text-align: center">少し待ってね。</p>
</template>
