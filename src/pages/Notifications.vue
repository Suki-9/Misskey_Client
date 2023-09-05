<script setup lang="ts">
//Type
import { ModifiedNotification } from "../scripts/types";

//TS Module
import { ref } from "vue";
import { getNotifications } from "../scripts/API/notification";
//import { streamMain } from "../scripts/API/stream";
import { readCookie } from "../scripts/cookie";

//Vue Component
import Notification from "../components/global/Notification.vue";
import BottomBar from "../components/global/BottomBar.vue";

const host = readCookie("loginHost").unwrap();
//const autoReConnection = true;

//Entry point
if (host) {
  getNotifications(host);
  //streamMain(host, autoReConnection)
}
</script>

<script lang="ts">
const notifications = ref<ModifiedNotification[]>([]);

export const addNotificationsBefore = (notification: ModifiedNotification) => {
  notifications.value.push(notification);
};

export const addNotificationsAfter = (notification: ModifiedNotification) => {
  notifications.value.unshift(notification);
};
</script>

<template>
  <div :class="$style.root" id="NotificationView">
    <div :class="$style.head">
      <i class="icon-bell-alt"></i>
      <p>通知</p>
    </div>
    <Notification
      v-for="notification in notifications"
      :notification="notification"
    />
  </div>
  <BottomBar />
</template>

<style module lang="scss">
.root {
  width: 100vw;

  padding-bottom: var(--bottom-bar-height);

  .head {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 6.25vh;

    font-size: 80%;

    border-bottom: solid 1px var(--primary-border-color);
  }
}
</style>
