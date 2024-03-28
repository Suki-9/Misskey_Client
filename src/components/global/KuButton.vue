<script setup lang="ts">
defineProps<{
  action?: () => void,
  isDisabled?: boolean,
  text: string,
}>();
const voidFn = () => {};
</script>

<template>
  <button @click="(!(isDisabled ?? false) ? action ?? voidFn : voidFn)()"
    :class="[{ [$style.isDisabled]: isDisabled ?? false }]">{{text}}</button>
</template>

<style module lanfg="scss">
button {
  font-size: 1em;
  padding: 0.4em 1em;
  box-sizing: border-box;

  width: fit-content;

  border-radius: var(--default-border-radius);
  border: none;
  background-color: var(--accent-color-300);

  &:active {
    background-color: var(--accent-color-600);
    transform: scale(0.95);
  }
  &.isDisabled {
    color: var(--is-disabled-text-color);
    background-color: var(--accent-color-600);
    &:active {
      transform: scale(1);
    }
  }
}
</style>