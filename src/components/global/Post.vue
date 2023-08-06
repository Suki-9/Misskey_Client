<script setup lang="ts">
const CreatePost = () => {};
</script>

<template>
  <i class="icon-pencil" :class="$style.postButton" @click="CreatePost"></i>
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
  color: var(--tertiary-bg-color);

  background-color: var(--accent-color);
}
.postButton::before {
  margin: 0;
}
</style>
