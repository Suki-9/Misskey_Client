<script setup lang="ts">
import { StreamTimeLine } from "../../scripts/API/stream";
import { VNode, h } from "vue";

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
const usersData = localStorage.getItem("usersData");

if (props.selectTimeLine.hostName && usersData) {
  const notes = new StreamTimeLine(
    props.selectTimeLine.hostName,
    props.selectTimeLine.token,
    props.selectTimeLine.channel,
    props.selectTimeLine.autoReConnection
  ).init();
}

</script>

<template>
  <div :class="$style.root">
    
  </div>
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
