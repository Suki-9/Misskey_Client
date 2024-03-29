<script setup lang="ts">
import { ref } from "vue";
import { components } from "misskey-js/autogen/types.js";

const prprs = defineProps<{
  mediaData: components['schemas']['DriveFile'];
}>();

const isPopUpImage = ref<boolean>(false);
const showSensitive = ref<boolean>(!prprs.mediaData.isSensitive);
</script>

<template>
  <img :src="mediaData.thumbnailUrl ?? ''" :class="$style.media" v-show="showSensitive" @click="isPopUpImage = true" />
  <div :class="$style.sensitiveAlert" v-if="!showSensitive" @click="showSensitive = !showSensitive">
    <p>センシティブな画像</p>
  </div>
  <div v-if="isPopUpImage" :class="$style.popUpImage" @click="isPopUpImage = false">
    <img :src="mediaData.url" />
  </div>
</template>

<style module lang="scss">
.media,
.sensitiveAlert {
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

  background-color: color-mix(in srgb, var(--primary-bg-color), rgba(0, 0, 0, 0) 20%);

  img {
    position: fixed;
    top: 50%;
    right: 50%;

    transform: translate(51%, -49%);

    margin: 1%;

    max-width: 98%;
    max-height: 98%;
  }
}
</style>
