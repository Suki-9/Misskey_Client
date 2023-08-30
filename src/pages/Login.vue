<script setup lang="ts">
//TS Module
import { ref } from "vue";
import { useRouter } from "vue-router";
import { genUuid } from "../scripts/UUID";
import { getUserData } from "../scripts/API/userdata";
const router = useRouter()


//Vue Component
import TextInput from "../components/Login/TextInput.vue";


const userName = ref<string>("");
const password = ref<string>("");

const hostName = ref<string>("");

const token = ref<string>("");
const avatarUrl = ref<string>("");

const useToken = ref<boolean>(false)

const Login = () => { 
  if (useToken.value) {
    document.cookie = `${hostName.value}_token=${token.value}; path=/`;
    document.cookie = `loginHost=${hostName.value}; path=/`;

    getUserData(hostName.value);
    router.push("/");
  }
}

const MiAuth = () => {
  const callback = "http:/localhost:4000/callback";
  const sessionId = genUuid();
  const miAuthUrl = `https://${hostName.value}/miauth/${sessionId}?name=Mive&callback=${callback}/callback&permission=read:account,write:account,read:blocks,write:blocks,read:drive,write:drive,read:favorites,write:favorites,read:following,write:following,read:messaging,write:messaging,read:mutes,write:mutes,write:notes,read:notifications,write:notifications,write:reactions,write:votes,read:pages,write:pages,write:page-likes,read:page-likes,write:gallery-likes,read:gallery-likes`;

  document.cookie = `loginHost=${hostName.value}; path=/`;
  window.location.href = miAuthUrl;
}
</script>

<template>
  <div :class="$style.root">
    <p :class="$style.head">Login!!</p>
    <div :class="$style.tile">
      <p :class="$style.tileHead">ログイン<span></span></p>
      <div :class="$style.tileContainer">
        <img :class="$style.avatar" :src="avatarUrl"/>
        <a :class="$style.button" @click="MiAuth">Use MiAuth</a>
        <a :class="$style.button" @click="useToken = !useToken">{{ useToken ? "Use PassWord" : "Use Token" }}</a>
      </div>
      <TextInput :placeholder="'UserName'" @receive="(e) => { userName = e }" v-show="!useToken"/>
      <TextInput :placeholder="'PassWord'" @receive="(e) => { password = e }" v-show="!useToken"/>
      <TextInput :placeholder="'Your Token'" @receive="(e) => { token = e }"  v-show="useToken"/>
      <p :class="$style.attentionText" v-show="!useToken">パスワードを忘れた場合</p>
      <div :class="$style.submitButtonBox">
        <a :class="$style.submitButton" @click="Login">Login</a>
      </div>
    </div>
    <div :class="$style.tile">
      <p :class="$style.tileHead">他のサーバーにログインする<span></span></p>
      <TextInput :placeholder="'Host Name'" @receive="(e) => { hostName = e }"/>
    </div>
    <div :class="$style.tile" v-if="false">
      <p :class="$style.tileHead">新規登録<span></span></p>
      <TextInput :placeholder="'UserName'" @receive="(e) => { userName = e }"/>
      <TextInput :placeholder="'Password'" @receive="(e) => { password = e }"/>
    </div>
  </div>
</template>

<style module lang="scss">
.root {
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
  .head {
    display: flex;
    align-items: center;

    height: 6.25vh;

    padding: 0 5vw;

    font-size: 110%;

    border-bottom: solid 1px var(--primary-border-color);
  }
  .tile {
    position: relative;

    margin: 1.25vh 5vw 0 5vw;

    .tileHead {
      display: flex;
      align-items: center;
      flex-direction: row;

      height: 2.5vh;

      margin: 0 0 1.25vh 0;

      font-size: 70%;

      white-space: nowrap;
      span {
        padding: 1px 0 0 0;

        width: 100%;

        border-bottom: solid 1px var(--primary-border-color);
      }
    }
    .tileContainer {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;

      width: 100%;

      margin: 0 0 1.25vh 0;
      .avatar {
        height: 7.5vh;
        width: 7.5vh;

        font-size: 70%;

        border-radius: 50%;
        border: solid 1px var(--primary-border-color);
      }
      .button {
        width: 30vw;

        padding: 1vh 1vw;

        font-size: 70%;
        text-align: center;

        border-radius: var(--default-border-radius);
        border: solid 1px var(--primary-border-color);
      }
    }
    .attentionText {
      margin: 0 0 1.25vh 0;

      padding: 0 2.5vw;

      font-size: 50%;
      text-align: right;
      color: var(--secondary-text-color);
    }
    .submitButtonBox {
      width: 100%;
      height: 3.75vh;

      margin: 0 0 1.25vh 0;

      text-align: right;
      .submitButton {
        height: 3.75vh;
        width: 25vw;

        padding: 1vh 7.5vw;

        font-size: 70%;
        text-align: center;

        border-radius: var(--default-border-radius);
        border: solid 1px var(--primary-border-color);
      }
    }
  }
}
</style>