<script setup lang="ts">
import { HamburgerMenuList } from "../scripts/types";

defineProps<{ listData: HamburgerMenuList }>();
const emit = defineEmits<{ (e: "switch"): void }>();
</script>

<template>
  <div :class="$style.root">
    <a
      v-for="item in listData"
      :class="$style.active"
      @click="
        [
          $router.push(
            item.link
          ),
          emit('switch'),
        ]
      "
      v-text="item.title"
    ></a>
  </div>
</template>

<style module lang="scss">
.root {
  display: flex;
  flex-direction: column;

  font-size: 90%;
  a {
    border-bottom: solid 1px var(--primary-border-color);
  }
  .active {
    animation-name: fadein;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;

    transform: translateX(-50px);
    opacity: 0;
  }
}
@keyframes fadein {
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>
