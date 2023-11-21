<script setup lang="ts">
import TimeLine from "../components/Home/TimeLine.vue";
import Post from "../components/global/PostNote.vue";
import SideSwipeMenu from "../components/Home/SideSwipeMenu.vue";

import cookie from "../scripts/cookie";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useSwipeMenu } from "../scripts/SideSwipeMenu";

// トークンの有無を確認 --------------------------------///
const loginUser = cookie.read("loginUser");
//TODO ここの any
const usersData: any = JSON.parse(localStorage.getItem("usersData")!);

if (loginUser) {
  // Animation -----------------------------------------///
  useSwipeMenu();
} else {
  useRouter().push("/login");
}

// 仮
const selectTimeLine = ref<{
  channel?: "Home" | "hybrid" | "local" | "global";
  autoReConnection: boolean;
  timeLineSymbol: symbol;
  hostName: string;
  token: string;
}>({
  channel: "local",
  autoReConnection: true,
  timeLineSymbol: Symbol("tl"),
  hostName: String(loginUser?.split("_")[0]),
  token: loginUser && usersData[loginUser].token,
});
</script>

<template>
  <SideSwipeMenu />
  <div :class="$style.hoverPage" id="hoverPage">
    <TimeLine :selectTimeLine="selectTimeLine" />
  </div>
  <Post />
</template>

<style module lang="scss">
.hoverPage {
  position: fixed;
  top: 0;

  height: var(--display-height);

  overflow-y: scroll;

  background-color: var(--primary-bg-color);
}
</style>
