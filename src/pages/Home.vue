<script setup lang="ts">
//vue component ----------------------------------------///
import TimeLine from "../components/Home/TimeLine.vue";
import Post from "../components/global/Post.vue";

// TS module -------------------------------------------///
import { getUserData } from "../scripts/API/userdata";
import { readCookie } from "../scripts/cookie";
import { onMounted, provide, ref } from "vue";
import { genUuid } from "../scripts/UUID";
import { useRouter } from "vue-router";

// トークンの有無を確認 --------------------------------///
const loginHost = readCookie("loginHost");

if (!loginHost.isOk) {
  useRouter().push("/login");
} else {
  // provide -------------------------------------------///
  const userData = await getUserData(loginHost.value);
  if (userData.isOk) { 
    provide("LoginUserData", JSON.parse(userData.value));
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
  Home: { channel: "Home", timeLineSymbol: Symbol(genUuid()), hostName: loginHost.value, autoReConnection: true },
  Hybrid: { channel: "hybrid", timeLineSymbol: Symbol(genUuid()), hostName: loginHost.value, autoReConnection: true },
  local: { channel: "local", timeLineSymbol: Symbol(genUuid()), hostName: loginHost.value, autoReConnection: true },
  global: { channel: "global", timeLineSymbol: Symbol(genUuid()), hostName: loginHost.value, autoReConnection: true },
};

const
  showTimeLine = ref(),
  selectTimeLine = ref(),
  resetKey = ref<number>(0);

onMounted(() => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          showTimeLine.value = entry.target.id;
          selectTimeLine.value = timeLines[showTimeLine.value];
          resetKey.value++;
        }
      });
    },
    {
      threshold: 0.5,
    }
  );
  const targetElem = document.querySelectorAll(".timeLine");
  targetElem.forEach(elem => observer.observe(elem));
});
</script>

<template>
  <div :class="$style.headBar">
    <a v-for="timeLine in Object.keys(timeLines)" class="timeLine" :id="timeLine">{{ timeLine }}</a>
  </div>
  <Post />
  <TimeLine v-if="loginHost.isOk && selectTimeLine" :key="resetKey" :selectTimeLine="selectTimeLine" />
</template>

<style module lang="scss">
.headBar {
  position: fixed;

  display: flex;
  flex-wrap: nowrap;
  justify-content: unset;

  width: 100vw;
  height: var(--head-bar-height);

  overflow-x: scroll;
  scroll-snap-type: x mandatory;

  border-bottom: solid 1px var(--primary-border-color);
  background-color: var(--primary-bg-color);

  &::-webkit-scrollbar {
    display: none;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;

    min-width: 100%;

    scroll-snap-align: center;
  }
}
</style>
