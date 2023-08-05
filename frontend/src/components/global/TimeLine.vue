<script setup lang="ts">
//type
import { ModifiedNote } from "../../scripts/types";

//TS Module
import { ref } from "vue";
import { UUIDGen } from "../../scripts/UUID";
import { readCookie } from "../../scripts/Cookie";

//後にファイルを統合する予定
import { noteGen } from "../../scripts/note";
import { getNote } from "../../scripts/API/note";

//vue Component
import Note from "./Note.vue";


const props = defineProps<{
  hostName?: string;
  channel?: string;
}>();

const notes = ref<ModifiedNote[]>([]);
const maxIndexSize: number = 10;
let scrollIndex: number = 0;

//VirtualScroller
//const BeforeNote = ref<ModifiedNote>()
//const NoteIndexSize = ref<number>(0)

//EntryPoint
if (props.hostName !== undefined) {
  getNote(props.hostName, props.channel, maxIndexSize).then(function (gatNotes) { 
    notes.value = gatNotes
  })
  stream()
}

function stream() {
  const token = readCookie(`${props.hostName}_token`);
  const uuid = UUIDGen();
  const timeLine = new WebSocket(
    `wss://${props.hostName}/streaming?i=${token}`,
  );

  timeLine.addEventListener("open", () => {
    timeLine.send(
      JSON.stringify({
        type: "connect",
        body: {
          channel: `${
            props.channel == undefined ? "home" : props.channel
          }Timeline`,
          id: uuid,
          params: {},
        },
      }),
    );
  });

  timeLine.addEventListener("message", (event) => {
    maxIndexSize < notes.value.length
      ? notes.value.shift()
      : scrollIndex < 100
      ? notes.value.push(noteGen(JSON.parse(event.data).body.body))
      : console.log("Lost note")
  });
}

//let onAddNote: boolean = false
//onUpdated(() => {
//  if (onAddNote) {
//    NoteIndexSize.value += document.getElementById("BeforeNote")?.getBoundingClientRect().height ?? 0
//    onAddNote = !onAddNote
//  }
//})


//TODO: 後で書き直す
//window.addEventListener("scroll", () => {
//  scrollIndex = window.scrollY;
//});
</script>

<template>
  <div :class="$style.root">
    <Note v-for="note in notes" :note="note" />
  </div>
</template>

<style module lang="postcss">
.root {
  display: flex;
  flex-direction: column-reverse;

  min-width: 300px;
  max-width: 600px;
}
</style>
