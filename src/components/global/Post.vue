<script setup lang="ts">
//TS Module
import { ref } from 'vue';

const Active = ref<boolean>(false)
</script>

<template>
  <i class="icon-pencil" :class="$style.postButton" @click="Active = !Active"></i>
  <div v-show="Active" :class="$style.root">
    わわ！
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
  position: fixed;
  top: 2%;

  border-radius: var(--default-border-radius);


  border: solid 1px var(--primary-border-color);
  background-color: var(--primary-bg-color);

  animation-name: moveIn;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;

  transform: translateY(-100%);
  opacity: 0;
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
