<script setup lang="ts">
//TS Module
import { ref } from "vue";
import { getNote, noteGen } from "../../scripts/API/note";
import { streamTimeLine } from "../../scripts/API/stream";

//type
import { ModifiedNote } from "../../scripts/types";

//vue Component
import Note from "./Note.vue";


const props = defineProps<{
  hostName: string;
  channel?: string;
  autoReConnection: boolean;
}>();

const notes = ref<ModifiedNote[]>([]);
const noteKeep = ref<ModifiedNote[]>([]);

let maxIndexSize = 10;
let scrollY = 0

const firstFetchNote = async () => {
  (await getNote(props.hostName, props.channel, maxIndexSize)).forEach(note => {
    notes.value.push(note)
  })
}

const addNoteAfter = (note: ModifiedNote) => {
  if (maxIndexSize < notes.value.length) notes.value.pop();
  scrollY < 100
    ? notes.value.unshift(note)
    : noteKeep.value.unshift(note)
}

const stream = () => {
  const TimeLine = streamTimeLine(props.hostName, props.channel);

  TimeLine.addEventListener("message", event => {
    console.log("GetNote!");
    addNoteAfter(noteGen(JSON.parse(event.data).body.body))
  });

  TimeLine.addEventListener("close", () => {
    console.log("Connection to TL has been disconnected...");
    if (props.autoReConnection) stream()
    return;
  });
}

//EntryPoint
if (props.hostName) {
  firstFetchNote()
  stream()
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
