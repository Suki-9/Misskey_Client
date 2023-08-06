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
  channel?: string; // homeの場合はなにも指定しない(undefinedにする)
}>();

const maxIndexSize = 10;
const autoReConnection = true;


//EntryPoint
if (props.hostName) {
  getNote(props.hostName, props.channel, maxIndexSize).then(
    getNotes => (notes.value = getNotes.reverse())
  );
  const channel = props.channel ?? "home";
  streamTimeLine(props.hostName, channel, autoReConnection);
}

//VirtualScroller
//const BeforeNote = ref<ModifiedNote>()
//const NoteIndexSize = ref<number>(0)

//let onAddNote: boolean = false
//onUpdated(() => {
//  if (onAddNote) {
//    NoteIndexSize.value += document.getElementById("BeforeNote")?.getBoundingClientRect().height ?? 0
//    onAddNote = !onAddNote
//  }
//})
</script>

<script lang="ts">
const notes = ref < ModifiedNote[] > ([]);
const noteKeep = ref < ModifiedNote[] > ([]);
const maxIndexSize = 10;
let scrollY = 0


export const addNote = (note: ModifiedNote) => { 
  if (maxIndexSize < notes.value.length) notes.value.shift();
  scrollY < 100
    ? notes.value.push(note)
    : noteKeep.value.push(note);
}


window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  if (scrollY < 100) {
    noteKeep.value.forEach(note => {
      notes.value.push(note);
    });
    noteKeep.value = [];
  }
});
</script>


<template>
  <div :class="$style.root">
    <Note v-for="note in notes" :note="note" />
  </div>
</template>


<style module lang="scss">
.root {
  display: flex;
  flex-direction: column-reverse;

  min-width: 300px;
  max-width: 600px;
}
</style>
