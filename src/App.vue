<script setup lang="ts">
// Vue component ---------------------------------------///
import BottomBar from "./components/global/BottomBar.vue";


// TS Module -------------------------------------------///
import { getUserData } from "./scripts/API/userdata";
import { readCookie } from "./scripts/cookie";
import { useRouter } from "vue-router";
import { provide } from "vue";


// Symbols ---------------------------------------------///
import sym from "./scripts/provideSymbols/tokens"


const
  loginHost = readCookie("loginHost"),
  loginHost_token = readCookie(loginHost),
  userData = loginHost && JSON.parse(await getUserData(loginHost));

if (loginHost && loginHost_token) {
  provide<string>(sym.loginHost, loginHost)
  provide<string>(sym.loginHost_token, loginHost_token);
  provide<string>("LoginUserData", userData);
} else {
  useRouter().push("/login");
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
