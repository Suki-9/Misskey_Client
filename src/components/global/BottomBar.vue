<script setup lang="ts">
//TS Module
import { useRouter } from "vue-router";
const router = useRouter();

//Vue Component function
import { Show_NotificationView , Show_LeftMenu } from "../Home/PopUpUIs.vue";


const goHome = () => {
  router.push("/");
};
const reload = () => {
  location.reload();
};
</script>


<template>
  <div :class="$style.root">
    <i class="icon-dot-3" @click="Show_LeftMenu()"></i>
    <i class="icon-home" @click="goHome()"></i>
    <i class="icon-bell-alt" @click="Show_NotificationView()"></i>
    <i class="icon-cw" @click="reload()"></i>
    <i class="icon-mail-alt"></i>
  </div>
</template>


<style module lang="scss">
.root {
  display: flex;
  align-items: center;
  justify-content: space-around;

  position: fixed;
  bottom: 0;
  left: 0;

  width: 96vw;

  padding: 2%;

  border-top: solid 1px;

  background-color: var(--primary-bg-color);

  i {
    padding: 2% 3%;

    line-height: 0;
  }
  i::before {
    margin: 0;
  }
}
</style>
