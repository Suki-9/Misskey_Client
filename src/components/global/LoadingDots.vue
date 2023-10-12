<script setup lang="ts">
// TS module -------------------------------------------///
import { ref } from "vue";

const dots = ref<string>("");

setInterval(async () => {
  dots.value = dots.value == "..." ? "" : dots.value + ".";
}, 1000);
</script>

<template>
  <p><slot></slot>{{ dots }}</p>
</template>
