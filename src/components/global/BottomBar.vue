<script setup lang="ts">
const reload = () => {
  location.reload();
};
</script>

<template>
  <div :class="$style.root">
    <i class="icon-dot-3" @click=""></i>
    <i class="icon-home" @click="$router.push('/')"></i>
    <i class="icon-bell-alt" @click="$router.push('/notification')"></i>
    <i class="icon-cw" @click="reload()"></i>
    <i class="icon-mail-alt" @click="$router.push('/directmessage')"></i>
  </div>
</template>

<style module lang="scss">
.root {
  display: flex;
  justify-content: space-evenly;

  width: 100vw;
  height: var(--bottom-bar-height);

  border-top: solid 1px;

  i {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 12.5vw;
    height: 100%;

    font-size: 150%;

    &::before {
      margin: 0;
    }
  }
}
</style>
