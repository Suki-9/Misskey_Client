<script setup lang="ts">
//Type
import { ModifiedNotification } from "../../scripts/types";

//TS Module
import { ref } from "vue";
//import { getNotifications } from "../../scripts/API/notification";
import { streamMain } from "../../scripts/API/stream";
import { readCookie } from "../../scripts/cookie";

//Vue Component
import Notification from "./Notification.vue";


const host = readCookie("loginHost").unwrap();
const autoReConnection = true;


if (host) {
  //getNotifications(host);
  streamMain(host, autoReConnection)
}
</script>

<script lang="ts">
const notifications = ref<ModifiedNotification[]>([]);

export const addNotifications = (notification: ModifiedNotification) => {
  notifications.value.push(notification)
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
