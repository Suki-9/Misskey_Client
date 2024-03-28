<script setup lang="ts">
const inputText = defineModel<string | undefined>("text", {
  required: true,
});

defineProps<{
  placeholder?: string;
  name?: string,
}>();
</script>

<template>
  <fieldset :class="$style.root">
    <legend v-if="name">{{ name }}</legend>
    <input :class="$style.form" :placeholder="placeholder" v-model="inputText" />
    <span class="material-symbols-outlined" @click="inputText = ''">close</span>
  </fieldset>
</template>

<style module lang="scss">
.root {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: content-box;

  padding: 0rem 1rem 0.5rem 1rem;

  border-radius: var(--default-border-radius);
  border: solid 2px var(--primary-border-color);
  input {
    background-color: var(--primary-bg-color);

    width: 100%;

    color: var(--primary-text-color);
    font-size: 1rem;

    &::placeholder {
      font-size: 0.9em;
    }
  }
  span {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
  }
}
</style>
