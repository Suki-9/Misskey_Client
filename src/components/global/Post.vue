<script setup lang="ts">
//TS Module
import { ref } from 'vue';
import { readCookie } from '../../scripts/cookie';
import { getUserData } from '../../scripts/API/userdata';
import { postNote } from '../../scripts/API/note'

const Active = ref<boolean>(false)
const postText = ref<string>("")
const visibility = ref<string>("")

const userData = JSON.parse(await getUserData(readCookie("loginHost").unwrap()))

const post = () => {
  if (postText.value !== "") postNote(undefined, undefined, (visibility.value == "") ? "public" : visibility.value, postText.value)
  Active.value = !Active.value
  postText.value = ""
}
</script>


<template>
  <i class="icon-pencil" :class="$style.postButton" @click="Active = !Active"></i>
  <div v-show="Active" :class="$style.root">
    <div :class="$style.header">
      <i class="icon-cancel" :class="$style.closeButton" @click="Active = !Active"></i>
      <div :class="$style.submitButtons">
        <a @click="post">ノート</a>
        <a >下書き</a>
      </div>
    </div>
    <div :class="$style.content">
      <img :class="$style.avatar" :src="userData.avatarUrl">
      <div :class="$style.text">
        <select v-model="visibility">
          <option value="public">パブリック</option>
          <option value="home">ホーム</option>
          <option value="followers">フォロワー</option>
        </select>
        <textarea v-model="postText"></textarea>
      </div>
    </div>
    <div :class="$style.footer">
    </div>
  </div>
</template>

<style module lang="scss">
@import "../../assets/css/globalComponent.css";
@import "../../assets/css/animation.css";
.postButton {
  position: fixed;
  bottom: 12.5vh;
  right: 7.5vw;

  border-radius: var(--default-border-radius);

  padding: 3%;

  font-size: 1.5em;
  line-height: 0;
  color: var(--tertiary-text-color);

  background-color: var(--accent-color);
}
.postButton::before {
  margin: 0;
}
.root {
  display: flex;
  flex-direction: column;

  position: fixed;
  top: 6.35vh;

  width: calc(95vw - 2px);

  margin: 0 2.5vw 0 2.5vw;

  border: solid 1px var(--primary-border-color);

  background-color: var(--primary-bg-color);

  font-size: 80%;

  animation-name: moveIn;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;

  transform: translateY(-100%);
  opacity: 0;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 6.35vh;

    font-size: 80%;

    border-bottom: solid 1px var(--primary-border-color);

    .closeButton::before {
      font-size: 150%;
    }

    .submitButtons {
      display: flex;
      flex-direction: row-reverse;

      white-space: nowrap;
      a {
        padding: 1% 4%;
        margin-right: 3.125vw;

        border: solid 1px var(--primary-border-color);
        border-radius: var(--default-border-radius);
      }
    }
  }
  .content {
    display: flex;
    flex-direction: row;

    width: calc(100% - 6.25vw);

    padding: 3.125vw;

    .text {
      display: flex;
      flex-direction: column;

      width: 100%;
      height: 25vh;

      padding-left: 3.125vw;

      select {
        width: fit-content;
        height: 3.125vh;

        margin-bottom: 1vh;

        border: none;
        border-radius: var(--default-border-radius);
        border: solid 1px var(--primary-border-color);

        color: var(--secondary-text-color);
        font-size: 90%;

        background-color: var(--primary-bg-color);
      }

      textarea {
        height: 10em;

        padding: 1%;

        border: none;
        border-radius: var(--default-border-radius);
        border: solid 1px var(--primary-border-color);

        color: var(--secondary-text-color);
        font-size: 100%;

        background-color: var(--primary-bg-color);

        resize: none;
      }
    }
  }
  .footer {
    display: flex;
    flex-direction: row;

    width: 100%;
    height: 6.35vh;
  }
}
</style>
