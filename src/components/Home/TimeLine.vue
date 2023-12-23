<script setup lang="ts">
import Note from '../global/Note.vue';

import { StreamTimeLine } from "../../scripts/API/stream";

const props = defineProps<{
  selectTimeLine: {
    hostName: string;
    token: string;
    channel?: "Home" | "hybrid" | "local" | "global";
    autoReConnection: boolean;
  };
}>();

const stream = new StreamTimeLine(
  props.selectTimeLine.hostName,
  props.selectTimeLine.token,
  props.selectTimeLine.channel,
  props.selectTimeLine.autoReConnection,
)

const TL = await stream.init()
</script>

<template>
  <div :class="$style.root">
    <Note :class="$style.note" v-for="(note, key) in TL" :key="key" :note="note"/>
  </div>
</template>

<style module lang="scss">
.root {
  width: 100%;
  .note {
    margin: 5px;
  }
}
</style>