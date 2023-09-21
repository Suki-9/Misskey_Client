<script setup lang="ts">
// TS Module -------------------------------------------///
import { onMounted, ref } from "vue";
import { fetchFirstNotes } from "../../scripts/API/note";
import { streamTimeLine, provideTimeLine } from "../../scripts/API/stream";

// Type ------------------------------------------------///
import { ModifiedNote } from "../../scripts/types";

// Vue Component ---------------------------------------///
import Note from "./Note.vue";

const props = defineProps<{
  hostName: string;
  channel?: "Home" | "Hybrid" | "local" | "global";
  autoReConnection: boolean;
}>();

const notes = ref<ModifiedNote[]>(provideTimeLine.value[streamTimeLine(
  props.hostName,
  props.channel,
  props.autoReConnection,
)]);
const timelineBody = ref<HTMLElement | null>();

// EntryPoint ------------------------------------------///
if (props.hostName) {
  onMounted(async () => {
    (await fetchFirstNotes(props.hostName, props.channel)).forEach(note => {
      notes.value.unshift(note)
    });
    timelineBody.value = document.getElementById("timeline");
  });
}
</script>

<template>
  <div id="timeline" :class="$style.root">
    <Note
      :class="$style.note"
      v-for="(note, index) in notes"
      :note="note"
      :id="index"
    />
  </div>
</template>

<style module lang="scss">
.root {
  display: flex;
  flex-direction: column;

  overflow: auto;
  scroll-snap-type: y mandatory;

  height: calc(100vh - var(--bottom-bar-height));

  margin: 0 var(--primary-margin-w);
  padding-bottom: var(--bottom-bar-height);
  .note {
    margin-bottom: var(--primary-margin-w);
  }
}
</style>
