<script setup lang="ts">
import BottomBar from "./components/global/BottomBar.vue";

import cookie from "./scripts/cookie";
import { provide } from "vue";

const loginUser = cookie.read("loginUser");

// 必要なデータが無いとき、これらはundefinedをprovideする( null )が帰るのを防ぐため。
provide<UserData>(
  "loginUserData",
  JSON.parse((loginUser && localStorage.getItem(`${loginUser}_UserData`)) ?? '{}')
);
provide<LoginUser>(
  "loginUser",
  JSON.parse(localStorage.getItem("usersData") ?? '{}')[loginUser ?? '']
);
</script>

<template>
  <div :class="$style.root">
    <Suspense>
      <router-view />
    </Suspense>
  </div>
  <BottomBar v-if="$route.name !== 'Login'" />
</template>

<style module lang="scss">
.root {
  height: calc(100vh - var(--bottom-bar-height));

  overflow: scroll;
}
</style>
