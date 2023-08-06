<script setup lang="ts">
//vue component
import TimeLine from "../components/global/TimeLine.vue";
import Post from "../components/global/Post.vue";
import BottomBar from "../components/global/BottomBar.vue";

//TS module
import { readCookie } from "../scripts/cookie";
import { useRouter } from "vue-router";
const router = useRouter();

// トークンの有無を確認
const loginHost: string | undefined = readCookie("loginHost").unwrap();
const hosts: string | undefined = readCookie("Hosts").unwrap();

if (!loginHost) {
  router.push("/login");
} else if (hosts?.split(",").indexOf(loginHost) == undefined) {
  document.cookie = `Hosts=${loginHost},${
    hosts ? readCookie("Hosts").unwrap() : ""
  }; path=/`;
}
</script>

<template>
  <TimeLine :hostName="loginHost" />
  <Post />
  <BottomBar />
</template>

<style module lang="scss"></style>
