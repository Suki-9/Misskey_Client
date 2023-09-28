<script setup lang="ts">
// TS Module -------------------------------------------///
import { onMounted, ref } from "vue";
import { genUuid } from "../../scripts/UUID";
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
const loading = ref<boolean>(false);

// EntryPoint ------------------------------------------///
if (props.selectTimeLine.hostName) {
  streamTimeLine(
    props.selectTimeLine.hostName,
    timelineSymbol,
    props.selectTimeLine.channel,
    props.selectTimeLine.autoReConnection,
  );
  notes.value = provideTimeLine.value[timelineSymbol];
  onMounted(async () => {});
}
</script>

<template>
  <div :class="$style.root" v-if="!loading">
    <Note :class="$style.note" 
    v-for="(note, index) in notes" 
    :note="note" 
    :key="index" />
    <div :class="$style.fetchButton">
      <a>更に読み込む</a>
    </div>
  </div>
  <div v-else>読み込み中...</div>
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
