<script setup lang="ts">
//TS Module
import { useRouter } from "vue-router";
const router = useRouter();

//Vue Component function
import { Show_LeftMenu } from "../Home/PopUpUIs.vue";

const reload = () => {
  location.reload();
};
</script>

<template>
  <div :class="$style.root">
    <i class="icon-dot-3" @click="Show_LeftMenu()"></i>
    <i class="icon-home" @click="router.push('/')"></i>
    <i class="icon-bell-alt" @click="router.push('/notification')"></i>
    <i class="icon-cw" @click="reload()"></i>
    <i class="icon-mail-alt" @click="router.push('/directmessage')"></i>
  </div>
</template>

<style module lang="scss">
.root {
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  position: fixed;
  bottom: 0;
  left: 0;

  width: 100vw;
  height: var(--bottom-bar-height);

  border-top: solid 1px;

  background-color: var(--primary-bg-color);

  i {
    width: 12.5vw;

    font-size: 150%;
    text-align: center;
    line-height: 0;

    &::before {
      margin: 0;
    }
  }
}
</style>
