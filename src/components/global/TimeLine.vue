<script setup lang="ts">
// TS Module -------------------------------------------///
import { fetchMisskeyAPI } from "../../scripts/API/fetchAPI";
import { streamTimeLine } from "../../scripts/API/stream";
import { noteGen } from "../../scripts/API/note";
import { readCookie } from "../../scripts/cookie";
import { onMounted, ref } from "vue";

// Type ------------------------------------------------///
import { ModifiedNote } from "../../scripts/types";
import { Endpoints } from "../../scripts/API/api";

// Vue Component ---------------------------------------///
import Note from "./Note.vue";

const notes = ref<ModifiedNote[]>([]);
const noteKeep = ref<ModifiedNote[]>([]);

const timelineBody = ref<HTMLElement | null>();

let maxIndexSize = 10;

const props = defineProps<{
  hostName: string;
  channel?: "Home" | "Hybrid" | "local" | "global";
  autoReConnection: boolean;
}>();

const firstFetchNote = async () => {
  const endpoint = `notes/${
    (props.channel ?? "Home") == "Home" ? "" : props.channel + "-"
  }timeline` as keyof Endpoints;
  fetchMisskeyAPI<
    | "notes/timeline"
    | "notes/hybrid-timeline"
    | "notes/local-timeline"
    | "notes/global-timeline"
  >(
    endpoint,
    {
      i: readCookie(`${props.hostName}_token`).unwrap(),
      limit: 10,
    },
    props.hostName
  ).then(
    fetchNotes => fetchNotes?.forEach(note => notes.value.push(noteGen(note)))
  );
};

const addNoteAfter = (note: ModifiedNote) => {
  if (maxIndexSize < notes.value.length) notes.value.pop();
  scrollY < 100 ? notes.value.unshift(note) : noteKeep.value.unshift(note);
};

const stream = () => {
  const TimeLine = streamTimeLine(props.hostName, props.channel);

  TimeLine.addEventListener("message", event => {
    console.log("GetNote!");
    const nowScrollTop = timelineBody.value?.scrollTop;
    addNoteAfter(noteGen(JSON.parse(event.data).body.body));
    timelineBody.value?.scrollTo(
      0,
      (nowScrollTop ?? 0) + (document.getElementById("0")?.clientHeight ?? 0)
    );
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
  onMounted(() => {
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
