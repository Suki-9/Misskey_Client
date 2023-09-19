<script setup lang="ts">
// TS Module -------------------------------------------///
import { ref } from 'vue';

const styleItems = ref<Record<string, string>>({
  "--primary-bg-color": "#FFFFFF",
  "--primary-text-color": "#FFFFFF",
  "--secondary-text-color:": "#FFFFFF",
  "--primary-border-color": "#FFFFFF",
  "--shadow-color": "#FFFFFF",
  "--accent-color": "#FFFFFF",
})
</script>


<template>
  <div v-for="item in Object.keys(styleItems)">
    <p>{{ item }} : {{ styleItems[item] }}</p>
    <input type="color" v-model="styleItems[item]">
  </div>
</template>


<style module lang="scss">
  p {
    font-size: 90%;
  }
</style>