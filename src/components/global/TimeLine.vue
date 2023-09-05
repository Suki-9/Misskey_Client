<script setup lang="ts">
//TS Module
import { ref } from "vue";
import { fetchMisskeyAPI } from "../../scripts/API/fetchAPI";
import { noteGen } from "../../scripts/API/note";
import { streamTimeLine } from "../../scripts/API/stream";
import { readCookie } from "../../scripts/cookie";

//type
import { ModifiedNote } from "../../scripts/types";
import { Endpoints, channels, ElementOf } from "../../scripts/API/api";

//vue Component
import Note from "./Note.vue";


const notes = ref<ModifiedNote[]>([]);
const noteKeep = ref<ModifiedNote[]>([]);

let maxIndexSize = 10

const props = defineProps<{
  hostName: string;
  channel?: ElementOf<typeof channels>;
  autoReConnection: boolean;
}>();

const firstFetchNote = async () => {
  const endpoint = `notes/${(props.channel ?? "Home") == "Home" ? "" : props.channel + "-"}timeline` as keyof Endpoints
  const fetchNote = await fetchMisskeyAPI(
    endpoint,
    {
      i: readCookie(`${props.hostName}_token`).unwrap(),
      limit: 10,
    },
    props.hostName,
  )
  fetchNote?.forEach(note => { 
    notes.value.push(noteGen(note));
  })
};

const addNoteAfter = (note: ModifiedNote) => {
  if (maxIndexSize < notes.value.length) notes.value.pop();
  scrollY < 100 ? notes.value.unshift(note) : noteKeep.value.unshift(note);
};

const stream = () => {
  const TimeLine = streamTimeLine(props.hostName, props.channel);

  TimeLine.addEventListener("message", event => {
    console.log("GetNote!");
    addNoteAfter(noteGen(JSON.parse(event.data).body.body));
  });

  TimeLine.addEventListener("close", () => {
    console.log("Connection to TL has been disconnected...");
    if (props.autoReConnection) stream();
    return;
  });
};

//EntryPoint
if (props.hostName) {
  firstFetchNote();
  stream();
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

  margin: 0 var(--primary-margin-w);
  padding-bottom: var(--bottom-bar-height);
  .note {
    margin: 1vh 0;
  }
}
</style>
