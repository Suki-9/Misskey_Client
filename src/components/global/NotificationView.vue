<script setup lang="ts">
//Type
import { ModifiedNotification } from "../../scripts/types";

//TS Module
import { ref } from "vue";
//import { getNotifications } from "../../scripts/API/notification";
//import { streamEventHandler } from "../../scripts/API/stream";
import { readCookie } from "../../scripts/cookie";
//import { genUuid } from "../../scripts/UUID"

//Vue Component
import Notification from "./Notification.vue";


const host = readCookie("loginHost").unwrap();
const notifications = ref<ModifiedNotification[]>([]);

if (host) {
  //getNotifications(host).then(
  //  getNotifications => (notifications.value = getNotifications)
  //);

  //streamTimeLine()
}


</script>

<script lang="ts">
export const test = () => {
  console.log("OK!")
}
</script>



<template>
  <div :class="$style.root">
    <div :class="$style.head">
      <i class="icon-bell-alt"></i>
      <p>通知</p>
    </div>
    <Notification
      v-for="notification in notifications"
      :notification="notification"
    />
  </div>
</template>

<style module lang="scss">
.root {
  width: 98vw;

  border-radius: var(--default-border-radius);

  position: relative;
  overflow: scroll;

  border: solid 1px;

  background-color: var(--primary-bg-color);

  .head {
    display: flex;
    flex-direction: row;
    justify-content: center;

    margin: 1%;

    font-size: 80%;

    border-bottom: solid 1px var(--primary-border-color);
  }
}
</style>
