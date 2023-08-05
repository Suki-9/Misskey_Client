<script setup lang="ts">
defineProps<{ isActive: boolean }>();
const emit = defineEmits<{ (e: "switch"): void }>();
</script>

<template>
  <div :class="$style.root" @click="emit('switch')">
    <span v-show="!isActive"></span>
    <span
      :class="[$style.cross_L, { [$style.active]: isActive }]"
    ></span>
    <span
      :class="[$style.cross_R, { [$style.active]: isActive }]"
    ></span>
  </div>
</template>

<style lang="postcss" module>
.root {
  --component-size: 1.3em;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;

  width: calc(var(--component-size) * 0.6);
  height: calc(var(--component-size) * 0.6);

  margin: calc(var(--component-size) * 0.2);

  border-radius: 50%;

  & span {
    height: calc(var(--component-size) * 0.12);
    width: 100%;

    margin: 0px;

    background-color: var(--primary-text-color);

    border-radius: calc(var(--component-size) * 0.06);
  }
  .cross_L.active,
  .cross_R.active {
    position: absolute;
    top: calc(var(--component-size) * 0.25);

    animation-duration: 0.2s;
    animation-fill-mode: forwards;
    animation-timing-function: ease;

    transform: rotate(0deg);
  }
  .cross_L.active {
    animation-name: cross_L;
  }
  .cross_R.active {
    animation-name: cross_R;
  }
}
/* Animation */
@keyframes cross_L {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(45deg);
  }
}
@keyframes cross_R {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-45deg);
  }
}
</style>
