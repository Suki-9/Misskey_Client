<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import FormInput from "../../components/global/FormInput.vue";

const router = useRouter();

const host = ref("");

const input = (text: string) => {
  host.value = text;
};

const login = (text: string) => {
  document.cookie = `${host.value}_token=${text}; path=/`;
  document.cookie = `loginHost=${host.value}; path=/`;

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
