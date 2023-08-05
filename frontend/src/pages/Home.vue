<script setup lang="ts">
//vue component
import TimeLine from "../components/global/TimeLine.vue";
import Post from "../components/global/Post.vue";
import BottomBar from "../components/global/BottomBar.vue";

//TS module
import { readCookie } from "../scripts/Cookie";
import { useRouter } from "vue-router";
const router = useRouter();

/* トークンの有無を確認 */
const loginHost: string | undefined = readCookie("loginHost");
const Hosts: string | undefined = readCookie("Hosts");

if (!loginHost) {
  router.push("/login");
} else if (Hosts?.split(",").indexOf(loginHost) == undefined) {
  document.cookie = `Hosts=${loginHost},${
    Hosts ? readCookie("Hosts") : ""
  }; path=/`;
}
</script>

<template>
  <TimeLine :hostName="loginHost" channel="" />
  <Post />
  <BottomBar />
</template>

<style module lang="postcss"></style>
