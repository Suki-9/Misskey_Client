<script setup lang="ts">
//TS Module
import { ref } from "vue";

//vue Component
import Post from "../global/Post.vue";
import LeftMenu from "../global/LeftMenu.vue";
import EmojiPalette from "../global/EmojiPalette.vue";
import ReNoteMenu from "../global/ReNoteMenu.vue";
</script>

<script lang="ts">
const PopUpMenuList_Listcontent = ref();

const reNoteId = ref<string>("");
const replyText = ref<string>("");

const show = ref<Record<string, boolean>>({
  NotificationView: false,
  LeftMenu: false,
  emojiPalette: false,
  reNoteMenu: false,
});

export const Show_LeftMenu = () => {
  show.value.LeftMenu = !show.value.LeftMenu;
};

export const Show_emojiPalette = () => {
  show.value.emojiPalette = !show.value.emojiPalette;
};

export const Show_reNoteMenu = (noteId: string) => {
  if (noteId == reNoteId.value || reNoteId.value == "") {
    show.value.reNoteMenu = !show.value.reNoteMenu;
    reNoteId.value = noteId;
  }
  if (!show.value.reNoteMenu) reNoteId.value = noteId;
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
  <div
    :class="$style.bg"
    v-show="show.reNoteMenu"
    @click="show.reNoteMenu = !show.reNoteMenu"
  ></div>
  <LeftMenu v-show="show.LeftMenu" :class="$style.LeftMenu" />
  <Post />
  <ReNoteMenu
    :noteId="reNoteId"
    :replyText="replyText"
    :class="$style.reNoteMenu"
    v-show="show.reNoteMenu"
  />
  <EmojiPalette v-show="show.emojiPalette" :class="$style.emojiPalette" />
</template>

<style module lang="scss">
@import "../../assets/css/animation.css";
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

.emojiPalette,
.reNoteMenu {
  position: fixed;
  bottom: 8.75vh;

  animation-name: moveIn;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;

  transform: translateY(-100%);
  opacity: 0;
}
.emojiPalette {
  height: 40vh;
}

.bg {
  position: fixed;
  top: 0;
  right: 0;

  height: 100%;
  width: 100%;

  background-color: color-mix(
    in srgb,
    var(--primary-bg-color),
    rgba(0, 0, 0, 0) 20%
  );
}
</style>
