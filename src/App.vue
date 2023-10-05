<script setup lang="ts">
//vue component
import BottomBar from "./components/global/BottomBar.vue";
</script>

<template>
  <div :class="$style.root">
      <Suspense>
        <router-view />
      </Suspense>
  </div>
  <BottomBar v-show="$route.name !== 'Login'"/>
</template>

<style module lang="scss">
.root {
  height: calc(100vh - var(--bottom-bar-height));

  overflow: scroll;
}
</style>