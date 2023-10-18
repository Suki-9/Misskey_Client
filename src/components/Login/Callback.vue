<script setup lang="ts">
//TS Module
import { readCookie } from "../../scripts/cookie";
import { useRoute, useRouter } from "vue-router";

const session = useRoute().query["session"];
const host = readCookie("loginHost").value;

const res = await fetch(`https://${host}/api/miauth/${session}/check`, {
  method: "POST",
})
  .then(response => response.json())
  .then(data => data);

document.cookie = `${host}_token=${res.token}; path=/`;
useRouter().push("/");
</script>

<template>
  <p style="text-align: center">少し待ってね。</p>
</template>
