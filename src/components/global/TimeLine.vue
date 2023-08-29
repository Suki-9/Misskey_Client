<script setup lang="ts">
//type
import { ModifiedNote } from "../../scripts/types";

//TS Module
import { ref } from "vue";
import { getNote } from "../../scripts/API/note";
import { streamTimeLine } from "../../scripts/API/stream";

//vue Component
import Note from "./Note.vue";


const props = defineProps<{
  hostName: string;
  channel?: string;
}>();

//EntryPoint
if (props.hostName) {
  getNote(props.hostName, props.channel, maxIndexSize);
  streamTimeLine(props.hostName, props.channel, autoReConnection);
}

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  if (scrollY < 100) {
    noteKeep.value.forEach(note => {
      notes.value.push(note);
    });
    noteKeep.value = [];
  }
  if (document.documentElement.scrollHeight - window.innerHeight - scrollY < 50) {
    getNote(props.hostName, props.channel, maxIndexSize, notes.value[notes.value.length-1].id)
  }
});
</script>

<script lang="ts">
const notes = ref < ModifiedNote[] > ([]);
const noteKeep = ref<ModifiedNote[]>([]);

const autoReConnection = true;

let maxIndexSize = 10;
let scrollY = 0


export const addNoteAfter = (note: ModifiedNote) => {
  if (maxIndexSize < notes.value.length) notes.value.pop();
  scrollY < 100
    ? notes.value.unshift(note)
    : noteKeep.value.unshift(note)
}

export const addNoteBefore = (note: ModifiedNote) => {
  notes.value.push(note)
}
</script>


<template>
  <div :class="$style.root">
    <Note :class="$style.note" v-for="note in notes" :note="note" />
  </div>
</template>


<style module lang="scss">
.root {
  display: flex;
  flex-direction: column;

  margin: 0 2.5vw 0 2.5vw;
  .note {
    margin: 1vh 0;
  }
}
</style>
