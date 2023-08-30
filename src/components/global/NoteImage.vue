<script setup lang="ts">
//TS Module
import { ref } from 'vue';

const prprs = defineProps<{
  thumbnailUrl: string;
  url: string;
  isSensitive: boolean;
  isActive: boolean;
}>();

const isPopUpImage = ref<boolean>(prprs.isActive)
const showSensitive = ref<boolean>(!prprs.isSensitive)
</script>

<template>
  <img
    :src="thumbnailUrl"
    :class="$style.media"
    v-show="showSensitive"
    @click="isPopUpImage = true"/>
  <div
    :class="$style.sensitiveAlert"
    v-show="!showSensitive"
    @click="showSensitive = !showSensitive">
    <p>センシティブな画像</p>
  </div>
  <div
    v-if="isPopUpImage"
    :class="$style.popUpImage"
    @click="isPopUpImage = false">
    <img :src="url"/>
  </div>
</template>

<style module lang="scss">
.media,.sensitiveAlert {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 98%;

  margin: 1%;

  object-fit: cover;
  aspect-ratio: 16 / 9;

  font-size: 70%;

  border-radius: var(--default-border-radius);
}
.popUpImage {
  position: fixed;
  top: 0;
  right: 0;

  height: 100%;
  width: 100%;

  background-color: color-mix(in srgb, var(--primary-bg-color), rgba(0,0,0,0) 20%);

  img {
    position: fixed;
    top: 50%;
    right: 0;

    width: 98%;

    margin: 1%;

    transform: translate(0, -50%);
  }
}
</style>