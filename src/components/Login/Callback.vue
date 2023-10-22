<script setup lang="ts">
// TS Module -----------------------------------------------------///
import { readCookie } from "../../scripts/cookie";
import { useRoute, useRouter } from "vue-router";
import { addUsersData } from "../../scripts/API/userdata";

// TODO 失敗時の動作
const session = useRoute().query["session"];
const host = readCookie("loginHost");

if (session && host.isOk) {
  const res = await fetch(`${host.value}/api/miauth/${session}/check`, {
    method: "POST",
  })
    .then(response => response.json())
    .then(data => data);

  const loginUser = await addUsersData(host.value!, res.token)
  document.cookie = `loginUser=${loginUser}; path=/`;
  useRouter().push("/");
}
</script>

<template>
  <p style="text-align: center">少し待ってね。</p>
</template>
