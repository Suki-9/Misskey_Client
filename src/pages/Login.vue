<script setup lang="ts">
//TS Module



//Vue Component
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.head">
      <router-link to="/login" :class="[($route.name == 'MiAuth') ? $style.active_L : $style.inActive_L]">MiAuth</router-link>
      <router-link to="/login/token" :class="[($route.name == 'Token') ? $style.active_R : $style.inActive_R]">Token</router-link>
    </div>
    <router-view />
  </div>
</template>

<style module lang="scss">

</style>