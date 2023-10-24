<script setup lang="ts">
// TS Module -----------------------------------------------------///
import { readCookie, deleteCookie, writeCookie } from "../../scripts/cookie";
import { useRoute, useRouter } from "vue-router";
import { addUsersData } from "../../scripts/API/userdata";

const session = useRoute().query["session"];
const host = readCookie("loginHost");

if (session && host.isOk) {
  fetch(`${host.value}/api/miauth/${session}/check`, {
    method: "POST",
  })
    .then(async (response) => {
      if (response.ok) {
        writeCookie("loginUser", await addUsersData(host.value!, (await response.json()).token))
        useRouter().push("/");
      } else {
        deleteCookie("loginHost")
        alert("トークンの取得に失敗しました!!!")
        useRouter().push("/login");
      }
    })
}
</script>

<template>
  <p style="text-align: center">少し待ってね。</p>
</template>
