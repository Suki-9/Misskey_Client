<script setup lang="ts">
import { ref, Ref, inject } from "vue";
import { Endpoints, api } from "misskey-js";
const props = defineProps<{
  noteId?: string;
}>();

const isActive = defineModel<boolean>('isActive', { required: true });

const postText = ref<string>();
const visibility = ref<Endpoints["notes/create"]["req"]["visibility"]>("home");
const loginUser = inject<Ref<LoginUser>>("userData");
const misskeyApi = inject<Ref<api.APIClient>>('api');

const post = () => {
  if (misskeyApi?.value) {
    misskeyApi.value.request('notes/create', {
      visibility: visibility.value,
      text: postText.value,
    }).then(() => { 
      isActive.value = false;
      postText.value = undefined;
    })
  }
};
</script>

<template>{{ isActive }}
  <i class="icon-pencil" :class="$style.postButton" v-show="!isActive" @click="isActive != isActive"></i>
  <div :class="$style.bg" v-show="isActive" @click="((isActive = false), console.log('!'))"></div>
  <div v-show="isActive" :class="$style.root">
    <div :class="$style.header">
      <i class="icon-cancel" :class="$style.closeButton" @click="isActive = false"></i>
      <div :class="$style.submitButtons">
        <a @click="post()">ノート</a>
        <a>下書き</a>
      </div>
    </div>
    <div :class="$style.content">
      <img :class="$style.avatar" :src="loginUser?.userData.avatarUrl ?? ''" />
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

  background-color: var(--accent-color-200);

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
