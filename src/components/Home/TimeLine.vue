<script setup lang="ts">
// TS Module -------------------------------------------///
import { onMounted, ref } from "vue";
import { genUuid } from "../../scripts/UUID";
import { fetchFirstNotes } from "../../scripts/API/note";
import { streamTimeLine, provideTimeLine } from "../../scripts/API/stream";

// Type ------------------------------------------------///
import { ModifiedNote } from "../../scripts/types";

// Vue Component ---------------------------------------///
import Note from "../global/Note.vue";

const props = defineProps<{
  selectTimeLine: {
    hostName: string;
    channel?: "Home" | "hybrid" | "local" | "global";
    autoReConnection: boolean;
  };
}>();

const timelineSymbol = Symbol(genUuid());
const notes = ref<ModifiedNote[]>();

// EntryPoint ------------------------------------------///
if (props.selectTimeLine.hostName) {
  streamTimeLine(
    props.selectTimeLine.hostName,
    timelineSymbol,
    props.selectTimeLine.channel,
    props.selectTimeLine.autoReConnection
  );
  notes.value = provideTimeLine.value[timelineSymbol];
  onMounted(async () => {
    (await fetchFirstNotes(props.selectTimeLine.hostName, props.selectTimeLine.channel)).forEach(note => {
      notes.value?.unshift(note);
    });
  });
}
</script>

<template>
  <div :class="$style.root">
    <Note :class="$style.note" v-for="(note, index) in notes" :note="note" :id="index" />
    <div :class="$style.fetchButton">
      <a>更に読み込む</a>
    </div>
  </div>
</template>

<style module lang="scss">
.root {
  display: flex;
  flex-direction: column;

  width: calc(100vw - (var(--primary-margin-w) * 2));

  padding: calc(var(--head-bar-height) + 2%) var(--primary-margin-w);
  padding-bottom: var(--bottom-bar-height);

  scroll-snap-align: start;
  .note {
    margin-bottom: var(--primary-margin-w);
  }
  .fetchButton {
    display: flex;
    justify-content: center;
    a {
      padding: 2%;
      margin-bottom: 2%;

      border-radius: var(--default-border-radius);
      background-color: var(--accent-color);
    }
  }
}
</style>
