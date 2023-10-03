<script setup lang="ts">
//TS Module
import { ref } from "vue";

//vue Component
import LeftMenu from "../global/LeftMenu.vue";
</script>

<script lang="ts">
const PopUpMenuList_Listcontent = ref();

const show = ref<Record<string, boolean>>({
  NotificationView: false,
  LeftMenu: false,
  emojiPalette: false,
});

export const Show_LeftMenu = () => {
  show.value.LeftMenu = !show.value.LeftMenu;
};

export const popUpMenuList = (
  Listcontent?: {
    text: string;
    action: string;
  }[]
) => {
  PopUpMenuList_Listcontent.value = Listcontent;
};
</script>

<template>
  <div :class="$style.bg" v-show="show.reNoteMenu" @click="show.reNoteMenu = !show.reNoteMenu"></div>
  <LeftMenu v-show="show.LeftMenu" :class="$style.LeftMenu" />
</template>

<style module lang="scss">
@import "../../styles/animation.css";
.LeftMenu {
  position: fixed;
  top: 0;
  left: 0;

  height: 100vh;

  animation-name: moveIn_L;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;

  transform: translateX(-100%);
  opacity: 0;
}
.bg {
  position: fixed;
  top: 0;
  right: 0;

  height: 100%;
  width: 100%;

  background-color: color-mix(in srgb, var(--primary-bg-color), rgba(0, 0, 0, 0) 20%);
}
</style>
