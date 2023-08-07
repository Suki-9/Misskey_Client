<script setup lang="ts">
//TS Module
import { ref } from "vue";
import { getUserData } from "../../scripts/API/userdata"
import { useRouter } from "vue-router";
const router = useRouter();

//vue Component
import FormInput from "../../components/global/FormInput.vue";


const host = ref("");

const input = (text: string) => {
  host.value = text;
};

const login = (text: string) => {
  document.cookie = `${host.value}_token=${text}; path=/`;
  document.cookie = `loginHost=${host.value}; path=/`;
  getUserData(host.value)
  router.push("/");
};
</script>

<template>
  <FormInput :class="$style.input" title="Host name" @receive="input" />
  <FormInput
    :class="$style.input"
    title="Your Token"
    :button="{ isEnable: true, title: 'login!' }"
    @receive="login"
  />
</template>

<style module lang="scss">
.input {
  margin-top: 5%;
}
</style>
