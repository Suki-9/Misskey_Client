<script setup lang="ts">
import { genUuid } from "../../scripts/UUID";

import FormInput from "../../components/global/FormInput.vue";

const login = (text: string) => {
  const host = text;
  const callback = "http:/localhost:4000/login";
  const sessionId = genUuid();
  const miAuthUrl = `https://${host}/miauth/${sessionId}?name=Mive&callback=${callback}/callback&permission=read:account,write:account,read:blocks,write:blocks,read:drive,write:drive,read:favorites,write:favorites,read:following,write:following,read:messaging,write:messaging,read:mutes,write:mutes,write:notes,read:notifications,write:notifications,write:reactions,write:votes,read:pages,write:pages,write:page-likes,read:page-likes,write:gallery-likes,read:gallery-likes`;

  document.cookie = `loginHost=${host}; path=/`;
  window.location.href = miAuthUrl;
};
</script>

<template>
  <FormInput
    :class="$style.input"
    title="Host name"
    :button="{ isEnable: true, title: 'login!' }"
    @receive="login"
  />
</template>

<style module lang="postcss">
.input {
  margin-top: 5%;
}
</style>
