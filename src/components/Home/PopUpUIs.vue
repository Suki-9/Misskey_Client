<script setup lang="ts">
//TS Module
import { ref } from "vue";

//vue Component
import Post from "../global/Post.vue";
import LeftMenu from "../global/LeftMenu.vue";
import EmojiPalette from "../global/EmojiPalette.vue";
</script>

<script lang="ts">
const PopUpMenuList_Listcontent = ref()
const show = ref<Record<string, boolean>>({
    NotificationView: false,
    LeftMenu: false,
    emojiPalette: false,
})

export const Show_LeftMenu = () => { 
    show.value.LeftMenu = !show.value.LeftMenu
}

export const Show_emojiPalette = () => {
    show.value.emojiPalette = !show.value.emojiPalette;
}

export const popUpMenuList = (
    Listcontent?: {
        text: string,
        action: string,
    }[]
) => {
    PopUpMenuList_Listcontent.value = Listcontent
}
</script>


<template>
    <LeftMenu v-show="show.LeftMenu" :class="$style.LeftMenu"/>
    <Post />
    <EmojiPalette v-show="show.emojiPalette" :class="$style.emojiPalette"/>
</template>

<style module lang="scss">
@import "../../assets/css/animation.css";
.notices {
  position: fixed;
  top: 2%;

  height: 90vh;

  animation-name: moveIn;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;

  transform: translateY(-100%);
  opacity: 0;
}

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

.emojiPalette {
  position: fixed;
  bottom: 8.75vh;

  height: 40vh;

  animation-name: moveIn;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;

  transform: translateY(-100%);
  opacity: 0;
}
</style>