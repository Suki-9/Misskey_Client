<script setup lang="ts">
// TS Module -----------------------------------------------------///
import cookie from "../../scripts/cookie";
import { useRoute, useRouter } from "vue-router";
import { addUsersData } from "../../scripts/API/userdata";
const router = useRouter();


const host = cookie.read("loginHost");


(useRoute().query["session"] && host) && fetch(
  `${host}/api/miauth/${useRoute().query["session"]}/check`, {
    method: "POST",
  }).then(async response => {
    if (response.ok) {
      cookie.write("loginUser", await addUsersData(host, (await response.json()).token));
      router.push("/");
    } else {
      cookie.delete("loginHost");
      alert("トークンの取得に失敗しました!!!");
      router.push("/login");
    }
  }
);
</script>

<template>
  <p style="text-align: center">少し待ってね。</p>
</template>
