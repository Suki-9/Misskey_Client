<script setup lang="ts">
import { readCookie } from "../../scripts/cookie";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const session = route.query["session"];
const host = readCookie("loginHost").unwrap();
const res = await fetch(`https://${host}/api/miauth/${session}/check`, {
  method: "POST",
})
  .then(response => response.json())
  .then(data => data);

document.cookie = `${host}_token=${res.token}; path=/`;
router.push("/");
</script>

<template>
  <p style="text-align: center">少し待ってね。</p>
</template>
