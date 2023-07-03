<template>
  <v-app
    class="overflow-hidden"
  >
    <HeadBar />
    <default-view />
  </v-app>
</template>

<script setup>
import DefaultView from './View.vue'
import HeadBar from "@/components/vue/home/HeadBar.vue";
</script>
