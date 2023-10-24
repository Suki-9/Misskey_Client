<script setup lang="ts">
//vue component ----------------------------------------///
import TimeLine from "../components/Home/TimeLine.vue";
import Post from "../components/global/Post.vue";
import SideSwipeMenu from "../components/Home/SideSwipeMenu.vue";

// TS module -------------------------------------------///
import { readCookie } from "../scripts/cookie";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useSwipeMenu } from "../scripts/SideSwipeMenu";

// トークンの有無を確認 --------------------------------///
const loginUser = readCookie("loginUser");
const usersData: any = JSON.parse(localStorage.getItem("usersData")!);

if (loginUser.value) {
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
  hostName: String(loginUser.value?.split("_")[0]),
  token: usersData![loginUser.value!].token,
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
