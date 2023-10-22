<script setup lang="ts">
//vue component ----------------------------------------///
import TimeLine from "../components/Home/TimeLine.vue";
import Post from "../components/global/Post.vue";
import SideSwipeMenu from "../components/Home/SideSwipeMenu.vue";

// TS module -------------------------------------------///
import { getUserData } from "../scripts/API/userdata";
import { readCookie } from "../scripts/cookie";
import { genUuid } from "../scripts/UUID";
import { useRouter } from "vue-router";
import { provide, ref } from "vue";
import { useSwipeMenu } from "../scripts/SideSwipeMenu"

// トークンの有無を確認 --------------------------------///
const loginHost = readCookie("loginHost");

if (!loginHost.isOk) {
  useRouter().push("/login");
} else {
  // provide -------------------------------------------///
  const userData = await getUserData(loginHost.value!);
  if (userData.isOk) {
    provide("LoginUserData", JSON.parse(userData.value!));
  }
}

const timeLines: Record<
  string,
  {
    channel: "Home" | "hybrid" | "local" | "global";
    autoReConnection: boolean;
    timeLineSymbol: symbol;
    hostName: string;
  }
> = {
  Home: { channel: "Home", timeLineSymbol: Symbol(genUuid()), hostName: loginHost.value!, autoReConnection: true },
  Hybrid: { channel: "hybrid", timeLineSymbol: Symbol(genUuid()), hostName: loginHost.value!, autoReConnection: true },
  local: { channel: "local", timeLineSymbol: Symbol(genUuid()), hostName: loginHost.value!, autoReConnection: true },
  global: { channel: "global", timeLineSymbol: Symbol(genUuid()), hostName: loginHost.value!, autoReConnection: true },
};

const
  selectTimeLine = ref(timeLines["local"]),
  resetKey = ref<number>(0)

// Animation 
useSwipeMenu()
</script>

<template>
  
  <SideSwipeMenu />
  <div :class="$style.hoverPage" id="hoverPage">
    <TimeLine v-if="loginHost.isOk && selectTimeLine" :key="resetKey" :selectTimeLine="selectTimeLine" />
  </div>
  <Post />
</template>

<style module lang="scss">
.hoverPage {
  position: fixed;
  top: 0;

  height: var(--display-height);

  overflow-y: scroll;
}
</style>
