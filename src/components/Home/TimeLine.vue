<script setup lang="ts">
import Note from '../global/Note.vue';
import BottomBar from '../global/BottomBar.vue';
import { inject, ref, Ref } from 'vue';
import { Stream, Channels, api, Endpoints } from 'misskey-js';
import { components } from "misskey-js/autogen/types.js";


const props = defineProps<{
  channel: keyof Channels,
}>();

const notes = ref<components['schemas']['Note'][]>([]);

const stream = inject<Ref<Stream>>('stream');
const misskeyApi = inject<Ref<api.APIClient>>('api');

if (misskeyApi?.value) {
  const result = await misskeyApi.value.request('notes/timeline', {
    limit: 20,
  }).catch(() => [])
  for (const note of result) notes.value.push(note);
}

if (stream?.value) {
  const timeLine = stream.value.useChannel(props.channel);
  timeLine.on('note', (e) => {
    console.log('getNote');
    notes.value.push(e);
  });
}
</script>

<template>
  <div :class="$style.notes">
    <Note v-for="note in notes" :note="note" :class="$style.note" />
  </div>
  <BottomBar :class="$style.bottomBar" />
</template>

<style>
#app {
  width: 100%;
  height: 100vh;
}
</style>

<style module lang="scss">
.notes {
  display: flex;
  flex-direction: column;

  width: 100%;

  overflow-y: scroll;

  .note {
    margin: 0.1em;
    flex-shrink: 0;
  }
}

.bottomBar {}
</style>