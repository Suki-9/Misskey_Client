<script setup lang="ts">
//vue component ----------------------------------------///
import BottomBar from "./components/global/BottomBar.vue";

// TS module -------------------------------------------///
import { readCookie } from "./scripts/cookie";
import { provide } from "vue";

const loginUser = readCookie("loginUser"),
  loginUserData = localStorage.getItem(`${loginUser.value}_UserData`),
  usersData = localStorage.getItem("usersData");

if (loginUser.value) {
  if (loginUserData) provide<UserData>("loginUserData", JSON.parse(loginUserData));
  if (usersData) provide<LoginUser>("loginUser", JSON.parse(usersData)[loginUser.value]);
}
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
