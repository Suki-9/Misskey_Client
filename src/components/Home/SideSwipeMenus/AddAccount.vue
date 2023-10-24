<script setup lang="ts">
// TS Module -------------------------------------------///
import { $HOST_URL } from "../../../plugin/vite_env";
import { genUuid } from "../../../scripts/UUID";
import { ref } from "vue";
import { addUsersData } from "../../../scripts/API/userdata";

const
  hostURL = ref<string>(),
  token = ref<string>(),
  useToken = ref<boolean>(false),
  useMiAuth = ref<boolean>(true);

const Login = async () => {
  if (useToken.value && token.value && hostURL.value && !useMiAuth.value) {
    const loginUser = await addUsersData(hostURL.value, token.value)
    document.cookie = `loginUser=${loginUser}; path=/`;
    location.reload();
  } else if (useMiAuth.value && hostURL.value) {
    document.cookie = `loginHost=${hostURL.value}; path=/`;
    window.location.href = `${hostURL.value}/miauth/${genUuid()}?name=Kurage&callback=${$HOST_URL}/callback&permission=read:account,write:account,read:blocks,write:blocks,read:drive,write:drive,read:favorites,write:favorites,read:following,write:following,read:messaging,write:messaging,read:mutes,write:mutes,write:notes,read:notifications,write:notifications,write:reactions,write:votes,read:pages,write:pages,write:page-likes,read:page-likes,write:gallery-likes,read:gallery-likes`;
  }
};
</script>

<template>
  <div :class="$style.root">
    <p :class="$style.tileHead">アカウントを追加<span></span></p>
    <div :class="$style.tileContainer">
      <a :class="$style.button" @click="(useToken = false), (useMiAuth = true)">Use MiAuth</a>
      <a :class="$style.button" @click="(useToken = true), (useMiAuth = false)">Use Token</a>
    </div>
    <div :class="$style.textinput" v-show="useToken && !useMiAuth">
      <input :class="$style.form" placeholder="Your Token" v-model="token" />
      <i class="icon-cancel" @click="token = ''"></i>
    </div>
    <div :class="$style.textinput">
      <input :class="$style.form" placeholder="Host Name" v-model="hostURL"/>
      <i class="icon-cancel" @click="hostURL = ''"></i>
    </div>
    <div :class="$style.submitButtonBox">
      <a :class="$style.button" @click="Login">追加</a>
    </div>
  </div>
</template>

<style module lang="scss">
.root {
  display: flex;
  flex-direction: column;

  margin: 5% auto;
  position: relative;
  .tileHead {
    display: flex;
    align-items: center;
    flex-direction: row;

    margin: 0 0.7rem;
    margin-bottom: 1rem;

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

    margin: 0 0.7rem;
  }

  .submitButtonBox {
    text-align: right;

    margin: 0 0.7rem;
  }
}
.button {
  padding: 0.7em 3em;
  margin-bottom: 1rem;

  white-space: nowrap;

  font-size: 70%;
  text-align: center;

  border-radius: var(--default-border-radius);
  border: solid 1px var(--primary-border-color);

  background-color: var(--primary-bg-color);
}

.textinput {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 0 0.7rem;
  padding: 0.7em 1em;

  margin-bottom: 1rem;

  border-radius: 999px;
  border: solid 1px var(--primary-border-color);

  background-color: var(--primary-bg-color);
  input {
    width: 100%;

    font-size: 70%;
    color: var(--primary-text-color);

    background-color: var(--primary-bg-color);
  }
}
</style>