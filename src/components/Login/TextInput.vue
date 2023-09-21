<script setup lang="ts">
//TS Module
import { ref } from "vue";

const emit = defineEmits<{ (e: "receive", text: string): string }>();
defineProps<{
  placeholder: string;
}>();
const inputText = ref<string>("");
</script>

<template>
  <div :class="$style.root">
    <input :class="$style.form" :placeholder="placeholder" v-model="inputText" @input="emit('receive', inputText)" />
    <i class="icon-cancel" @click="inputText = ''"></i>
  </div>
</template>

<style module lang="scss">
.root {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: calc(100% - 6.25vh);

  margin: 0 0 1.25vh 0;
  padding: 0 3.125vh;

  border-radius: 3.125vh;
  border: solid 1px var(--primary-border-color);

  input {
    height: 6.25vh;
    width: 100%;

    color: var(--primary-text-color);
    font-size: 70%;

    background-color: var(--primary-bg-color);
  }
}
</style>
