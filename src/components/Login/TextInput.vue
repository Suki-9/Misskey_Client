<script setup lang="ts">
//TS Module

defineProps<{
    placeholder: string;
}>();
</script>


<template>
    <div :class="$style.root">
        <input :class="$style.form" :placeholder="placeholder"/>
    </div>
</template>


<style module lang="scss">
.root {
  width: calc(100% - 6.25vh);

  margin: 0 0 1.25vh 0;
  padding: 0 3.125vh;

  border-radius: 3.125vh;
  border: solid 1px var(--primary-border-color);

  input {
    height: 6.25vh;

    color: var(--primary-text-color);
    font-size: 70%;

    background-color: var(--primary-bg-color);
  }
}
</style>