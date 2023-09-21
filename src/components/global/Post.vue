<script setup lang="ts">
// TS Module -------------------------------------------///
import { ref, nextTick, onMounted } from "vue";
import { readCookie } from "../../scripts/cookie";
import { getUserData } from "../../scripts/API/userdata";
import { fetchMisskeyAPI } from "../../scripts/API/fetchAPI";

// Type ------------------------------------------------///
import { Endpoints } from "../../scripts/API/api";

const emit = defineEmits(["close"]);
const props = withDefaults(
  defineProps<{
    isShowWindow?: boolean;
    postText?: string;
    noteId?: string;
  }>(),
  {
    isShowWindow: false,
    postText: "",
  }
);

const isActive = ref<boolean>(!props.isShowWindow);
const postText = ref<string>(props.postText);
const visibility = ref<Endpoints["notes/create"]["req"]["visibility"]>("home");
const userData = JSON.parse(await getUserData(readCookie("loginHost").unwrap()));

const post = () => {
  if (postText.value !== "")
    fetchMisskeyAPI("notes/create", {
      i: readCookie(`${readCookie("loginHost").unwrap()}_token`).unwrap(),
      text: postText.value,
      visibility: visibility.value,
      replyId: props.noteId,
    });
  console.log(props.noteId);
  isActive.value = false;
  postText.value = "";
};

const showPostWindow = () => {
  isActive.value = !isActive.value;
  nextTick(() => {
    document.getElementById("inputText")?.focus();
  });
};

onMounted(() => {
  showPostWindow();
});
</script>

<template>
  <i class="icon-pencil" :class="$style.postButton" v-show="!isActive" @click="showPostWindow"></i>
  <div :class="$style.bg" v-show="isActive" @click="(isActive = false), emit('close')"></div>
  <div v-show="isActive" :class="$style.root">
    <div :class="$style.header">
      <i class="icon-cancel" :class="$style.closeButton" @click="(isActive = false), emit('close')"></i>
      <div :class="$style.submitButtons">
        <a @click="post">ノート</a>
        <a>下書き</a>
      </div>
    </div>
    <p :class="$style.reply" v-show="noteId">Reply to {{ noteId }}</p>
    <div :class="$style.content">
      <img :class="$style.avatar" :src="userData.avatarUrl ?? ''" />
      <div :class="$style.text">
        <select v-model="visibility">
          <option value="public">パブリック</option>
          <option value="home">ホーム</option>
          <option value="followers">フォロワー</option>
        </select>
        <textarea v-model="postText" id="inputText"></textarea>
      </div>
    </div>
    <div :class="$style.footer"></div>
  </div>
</template>

<style module lang="scss">
@import "../../styles/globalComponent.css";
@import "../../styles/animation.css";
.postButton {
  position: fixed;
  bottom: 12.5vh;
  right: 7.5vw;

  border-radius: var(--default-border-radius);

  padding: 3%;

  font-size: 2.5rem;
  line-height: 0;
  color: var(--primary-text-color);

  background-color: var(--accent-color);

  &::before {
    margin: 0;
  }
}
.root {
  display: flex;
  flex-direction: column;

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;

  margin: 0;

  background-color: var(--primary-bg-color);

  animation-name: moveIn;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;

  transform: translateY(-100%);
  opacity: 0;

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 6.35vh;

    border-bottom: solid 1px var(--primary-border-color);

    .closeButton::before {
      font-size: 150%;
    }

    .submitButtons {
      display: flex;
      flex-direction: row-reverse;

      white-space: nowrap;
      a {
        margin-right: 10%;
        padding: 3% 6%;

        font-size: 120%;

        border: solid 1px var(--primary-border-color);
        border-radius: var(--default-border-radius);
      }
    }
  }
  .reply {
    margin: 2% 2% 0 2%;
  }
  .content {
    display: flex;
    flex-direction: row;

    padding: 2%;

    .avatar {
      height: var(--avater-size-L);
      width: var(--avater-size-L);
    }

    .text {
      display: flex;
      flex-direction: column;

      width: 100%;
      height: 25vh;

      padding-left: 3.125vw;

      select {
        width: fit-content;
        height: 2rem;

        margin-bottom: 1vh;

        border: none;
        border-radius: var(--default-border-radius);
        border: solid 1px var(--primary-border-color);

        color: var(--primary-text-color);

        background-color: var(--primary-bg-color);
      }

      textarea {
        height: 10rem;

        padding: 1%;

        border: none;
        border-radius: var(--default-border-radius);
        border: solid 1px var(--primary-border-color);

        color: var(--primary-text-color);
        font-size: 130%;

        background-color: var(--primary-bg-color);

        resize: none;
      }
    }
  }
  .footer {
    display: flex;
    flex-direction: row;

    width: 100%;
  }
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
