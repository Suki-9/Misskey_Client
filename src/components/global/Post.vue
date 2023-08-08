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
      <img :class="$style.avater" :src="userData.avatarUrl">
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
.postButton {
  position: fixed;
  bottom: 10%;
  right: 5%;

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
  top: 5%;

  width: 94vw;

  padding: 2%;

  border-radius: var(--default-border-radius);

  background-color: var(--primary-bg-color);

  font-size: 70%;

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

    margin-bottom: 3%;

    .closeButton::before {
      font-size: 150%;
    }

    .submitButtons {
      display: flex;
      flex-direction: row-reverse;

      width: 50%;

      white-space: nowrap;
      a {
        padding: 2% 4% 2% 4%;
        margin-left: 4%;

        background-color: var(--secondary-bg-color);

        border-radius: var(--default-border-radius);
      }
    }
  }
  .content {
    display: flex;
    flex-direction: row;

    width: 100%;
    .avater {
      height: 2em;
      width: 2em;

      object-fit: cover;

      border-radius: 0.4em;
    }

    .text {
      display: flex;
      flex-direction: column;

      width: calc(96% - 2em);

      padding: 0 2% 0 2%;

      select {
        width: fit-content;

        padding: 1%;

        border: none;
        border-radius: var(--default-border-radius);

        color: var(--secondary-text-color);
        font-size: 95%;

        background-color: var(--secondary-bg-color);
      }

      textarea {
        height: 10em;

        padding: 1%;
        margin-top: 1%;

        border: none;
        border-radius: var(--default-border-radius);

        color: var(--secondary-text-color);
        font-size: 120%;

        background-color: var(--secondary-bg-color);

        resize: none;
      }
    }
  }

  .footer {
    display: flex;
    flex-direction: row;
  }
}

@keyframes moveIn {
  0% {
    transform: translateY(20%);
    opacity: 0;
  }
  70% {
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
