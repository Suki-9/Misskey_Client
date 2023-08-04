<script setup lang="ts">
import { ref } from "vue";
import { UUIDGen } from "../../scripts/UUID";
import { Note } from "../../scripts/types";
import { readCookie } from "../../scripts/Cookie";
import { noteGen } from "../../scripts/note";
import { getNote } from "../../scripts/API/note";

import XNote from "./Note.vue";

const props = defineProps<{
  hostName?: string;
  channel?: string;
}>();

const notes = ref<Note[]>([]);
const maxIndexSize: number = 10;

let scrollIndex: number = 0;

if (props.hostName !== undefined) {
  getNote(props.hostName, props.channel);
  stream();
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

  timeLine.addEventListener("message", async (event) => {
    maxIndexSize < notes.value.length
      ? notes.value.shift()
      : scrollIndex < 100
      ? notes.value.push(noteGen(JSON.parse(event.data).body.body))
      : console.log("Lost note");
  });
}

//TODO: 後で書き直す
window.addEventListener("scroll", () => {
  scrollIndex = window.scrollY;
});
</script>

<template>
  <XNote v-for="note in notes" :note="note" />
</template>

<style module lang="postcss"></style>
