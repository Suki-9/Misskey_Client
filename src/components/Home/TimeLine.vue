<script setup lang="ts">
// TS Module -------------------------------------------///
import { streamTimeLine, provideTimeLine } from "../../scripts/API/stream";

// Vue Component ---------------------------------------///
import Note from "../global/Note.vue";
import LoadingDots from "../global/LoadingDots.vue";

const props = defineProps<{
  selectTimeLine: {
    channel?: "Home" | "hybrid" | "local" | "global";
    autoReConnection: boolean;
    timeLineSymbol: symbol;
    hostName: string;
    token: string;
  };
}>();

// EntryPoint ------------------------------------------///
const usersData = localStorage.getItem("usersData")

if (props.selectTimeLine.hostName && usersData) {
  streamTimeLine(
    props.selectTimeLine.hostName,
    props.selectTimeLine.timeLineSymbol,
    props.selectTimeLine.token,
    props.selectTimeLine.channel,
    props.selectTimeLine.autoReConnection
  );
}
</script>

<template>
  <div :class="$style.root" v-if="provideTimeLine[selectTimeLine.timeLineSymbol]">
    <div :class="$style.fetchButton">
      <a>更に読み込む</a>
    </div>
    <Note
      :class="$style.note"
      v-for="(note, index) in provideTimeLine[selectTimeLine.timeLineSymbol].timeLine"
      :note="note"
      :key="index"
    />
    <LoadingDots v-show="!provideTimeLine[selectTimeLine.timeLineSymbol].isConnected" :class="$style.loadingState"
      >接続中</LoadingDots
    >
  </div>
  <div v-else>読み込み中...</div>
</template>

<style module lang="scss">
.root {
  display: flex;
  flex-direction: column-reverse;

  width: calc(100vw - (var(--primary-margin-w) * 2));

  padding: 2% var(--primary-margin-w) 0 var(--primary-margin-w);
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
  .loadingState {
    position: absolute;

    top: 0;
    right: 0;

    padding: 0.5% 1%;
    margin: 1%;

    width: 5rem;

    text-align: center;

    border-radius: var(--default-border-radius);
    border: solid 1px var(--primary-border-color);
  }
}
</style>
