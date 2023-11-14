<script setup lang="ts">
// TS Module -----------------------------------------------------///
import { ref, nextTick, onMounted, inject } from "vue";
import { fetchMisskeyAPI } from "../../scripts/API/fetchAPI";

// Emit Props ----------------------------------------------------///
const emit = defineEmits(["close"]),
  props = withDefaults(
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

// Variables -----------------------------------------------------///
const isActive = ref<boolean>(!props.isShowWindow);
const postText = ref<string>(props.postText);
const visibility = ref<Mi_Endpoints["notes/create"]["req"]["visibility"]>("home");
const loginUser = inject<LoginUser>("loginUser");

// functions -----------------------------------------------------///
const post = () => {
  if ((postText.value !== "", loginUser))
    fetchMisskeyAPI(
      "notes/create",
      {
        i: loginUser.token,
        text: postText.value,
        visibility: visibility.value,
        replyId: props.noteId,
      },
      loginUser.host
    );
  isActive.value = false;
  postText.value = "";
}

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
    <div :class="$style.content">
      <img :class="$style.avatar" :src="loginUser?.avatarURL ?? ''" />
      <div :class="$style.text">
        <div :class="$style.contentHead">
          <select v-model="visibility">
            <option value="public">パブリック</option>
            <option value="home">ホーム</option>
            <option value="followers">フォロワー</option>
          </select>
          <p :class="$style.reply" v-show="noteId">Reply to {{ noteId }}</p>
        </div>
        <textarea v-model="postText" id="inputText"></textarea>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
@import "../../styles/globalComponent.css";
@import "../../styles/animation.css";
.postButton {
  position: fixed;
  bottom: 12.5vh;
  right: 7.5vw;

  padding: 3%;

  font-size: 2.5rem;
  color: var(--primary-text-color);

  border-radius: var(--default-border-radius);

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

    padding: 2% 0;

    font-size: 120%;

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

        border: solid 1px var(--primary-border-color);
        border-radius: var(--default-border-radius);
      }
    }
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

      padding-left: 2%;
      .contentHead {
        display: flex;
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
        .reply {
          margin: 2% 2% 0 2%;
        }
      }
      textarea {
        height: 10rem;

        padding: 1%;

        color: var(--primary-text-color);
        font-size: 130%;

        border: none;
        border-radius: var(--default-border-radius);
        border: solid 1px var(--primary-border-color);

        background-color: var(--primary-bg-color);

        resize: none;
      }
    }
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
