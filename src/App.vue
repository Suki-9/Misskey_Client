<script setup lang="ts">
//vue component
import BottomBar from "./components/global/BottomBar.vue";
</script>

<template>
  <Suspense>
    <router-view />
  </Suspense>
  <BottomBar v-show="$route.name !== 'Login'"/>
</template>
