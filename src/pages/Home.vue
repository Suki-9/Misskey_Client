<script setup lang="ts">
//vue component
import TimeLine from "../components/global/TimeLine.vue";
import BottomBar from "../components/global/BottomBar.vue";
import PopUpUIs from "./Home/PopUpUIs.vue"

//TS module
import { readCookie } from "../scripts/cookie";
import { useRouter } from "vue-router";
const router = useRouter();

// トークンの有無を確認
const loginHost = readCookie("loginHost");

let hosts: Result<string, Error>;

if (loginHost.isErr()) {
  router.push("/login");
} else if (
  ((hosts = readCookie("Hosts")),
  hosts.isErr() || hosts.value.split(",").indexOf(loginHost.value) === -1)
) {
  document.cookie = `Hosts=${loginHost.value},${hosts.unwrap_or("")}; path=/`;
}
</script>

<template>
  <TimeLine v-if="loginHost.isOk()" :hostName="loginHost.value"/>
  <BottomBar />
  <PopUpUIs />
</template>

<style module lang="scss"></style>
