<script setup lang="ts">
const reload = () => {
  location.reload();
};
</script>

<template>
  <div :class="$style.root">
    <i class="icon-dot-3"></i>
    <i class="icon-home" @click="$router.push('/')"></i>
    <i class="icon-bell-alt" @click="$router.push('/notification')"></i>
    <i class="icon-cw" @click="reload()"></i>
    <i class="icon-mail-alt" @click="$router.push('/directmessage')"></i>
  </div>
</template>

<style module lang="scss">
.root {
  display: flex;
  justify-content: space-around;

  height: 10em;

  border-top: solid 1px;

  i {
    display: flex;
    align-items: center;
    box-sizing: border-box;

    font-size: 1.5em;

    &::before {
      margin: 0;
      padding: 0;
    }
  }
}
</style>
