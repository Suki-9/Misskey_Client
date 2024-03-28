<script setup lang="ts">
import KuTextInput from "@/components/global/KuTextInput.vue";
import KuToggleSwitch from '@/components/global/KuToggleSwitch.vue';
import KuButton from "@/components/global/KuButton.vue";

import cookie from '@/scripts/cookie';
import { $HOST_URL } from "../plugin/vite_env";
import { genUuid } from "../scripts/UUID";
import { IdexedDB } from "@/scripts/indexedDB";
//import { useRouter } from "vue-router";
import { ref } from "vue";
import { api } from "misskey-js";
import router from "@/plugin/router_index";
//const router = useRouter();

const hostURL = ref<string>();
const token = ref<string>();
const useMiAuth = ref<boolean>(true);

const Login = async () => {
  if (!useMiAuth.value && token.value && hostURL.value) {
    if (hostURL.value.slice(-1)[0] == '/') hostURL.value = hostURL.value.slice(0, -1);
    const mk = new api.APIClient({
      origin: hostURL.value,
      credential: token.value,
    });
    const userData = await mk.request('i', {});
    const db = new IdexedDB();
    const result = db.addUser({
      host: hostURL.value,
      token: token.value,
      userId: userData.id,
      userData: userData
    });
    if (await result.then(() => true).catch(() => false)) {
      router.push('/');
    } else {
      //失敗時処理
    }
  } else if (useMiAuth.value && hostURL.value) {
    if (hostURL.value.slice(-1)[0] == '/') hostURL.value = hostURL.value.slice(0, -1);
    cookie.write('loginHost', hostURL.value);
    window.location.href = `${hostURL.value}/miauth/${genUuid()}?name=Kurage&callback=${$HOST_URL}/callback&permission=read:account,write:account,read:blocks,write:blocks,read:drive,write:drive,read:favorites,write:favorites,read:following,write:following,read:messaging,write:messaging,read:mutes,write:mutes,write:notes,read:notifications,write:notifications,write:reactions,write:votes,read:pages,write:pages,write:page-likes,read:page-likes,write:gallery-likes,read:gallery-likes`;
  }
};
</script>

<template>
  <div :class="$style.head">
    <h4>Kurage</h4>
    <p>misskey third party client.</p>
  </div>
  <KuToggleSwitch :class="$style.inputs" label="Use MiAuth" v-model="useMiAuth" />
  <KuTextInput :class="$style.inputs" name="Host origin" placeholder="https://exmple.tld" v-model:text="hostURL" />
  <KuTextInput :class="$style.inputs" name="Your Token" placeholder="Some alphanumeric characters." v-model:text="token"
    v-show="!useMiAuth" />
  <KuButton :action="Login" text="login" :is-disabled="!Boolean(useMiAuth ? hostURL : hostURL && token)" />
</template>

<style>
#app {
  height: 100%;
  margin: 0 5%;
}
</style>

<style module lang="scss">
.inputs {
  margin: 0 0 0.5em 0;
}

.head {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin: 2em 0;

  h4 {
    font-size: 140%;
  }

  p {
    color: var(--placeholder-text-color);
  }
}
</style>
