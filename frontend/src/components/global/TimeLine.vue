<script setup lang="ts">
//type
import { ModifiedNote } from "../../scripts/types";

//TS Module
import { ref } from "vue";
import { genUuid } from "../../scripts/UUID";
import { readCookie } from "../../scripts/cookie";

//後にファイルを統合する予定
import { noteGen, getNote } from "../../scripts/API/note";
//vue Component
import Note from "./Note.vue";

const props = defineProps<{
  hostName?: string;
  channel?: string;
}>();

const notes = ref<ModifiedNote[]>([]);
const noteKeep = ref<ModifiedNote[]>([]);
const maxIndexSize: number = 10;
const autoReConnection: boolean = true;
let scrollIndex: number = 0;

//EntryPoint
if (props.hostName) {
  getNote(props.hostName, props.channel, maxIndexSize).then(
    getNotes => (notes.value = getNotes.reverse())
  );
  stream();
}

function stream() {
  const channel = props.channel ?? "home";
  console.log(channel);
  const token = readCookie(`${props.hostName}_token`);
  const uuid = genUuid();
  const timeLine = new WebSocket(
    `wss://${props.hostName}/streaming?i=${token}`
  );

  timeLine.addEventListener("open", () => {
    timeLine.send(
      JSON.stringify({
        type: "connect",
        body: {
          channel: `${channel}Timeline`,
          id: uuid,
          params: {},
        },
      })
    );
    console.log("Connection success!");
  });

  timeLine.addEventListener("message", event => {
    console.log("GetNote!");
    if (maxIndexSize < notes.value.length) notes.value.shift();
    scrollIndex < 100
      ? notes.value.push(noteGen(JSON.parse(event.data).body.body))
      : noteKeep.value.push(noteGen(JSON.parse(event.data).body.body));
  });

  timeLine.addEventListener("close", () => {
    console.log("Disconnection");
    if (autoReConnection) stream();
    return;
  });
}

window.addEventListener("scroll", () => {
  scrollIndex = window.scrollY;
  if (scrollIndex < 100) {
    noteKeep.value.forEach(note => {
      notes.value.push(note);
    });
    noteKeep.value = [];
  }
});

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
