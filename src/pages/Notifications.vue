<script setup lang="ts">
// Type ------------------------------------------------///
import { ModifiedNotification } from "../scripts/types";

// TS Module -------------------------------------------///
import { fetchMisskeyAPI } from "../scripts/API/fetchAPI";
import { notificationGen } from "../scripts/API/notification";
//import { streamMain } from "../scripts/API/stream";
import { readCookie } from "../scripts/cookie";
import { ref } from "vue";

//Vue Component ----------------------------------------///
import Notification from "../components/global/Notification.vue";
import BottomBar from "../components/global/BottomBar.vue";

const host = readCookie("loginHost").unwrap();
const notifications = ref<ModifiedNotification[]>([]);
//const autoReConnection = true;

//Entry point
if (host) {
  fetchMisskeyAPI<"i/notifications">("i/notifications", {
    i: readCookie(`${host}_token`).unwrap(),
    maxSize: 20,
    following: false,
    unreadOnly: false,
    markAsRead: false,
  }).then(
    fetchNotification =>
      fetchNotification?.forEach(Notification => notifications.value.push(notificationGen(Notification)))
  );
  //streamMain(host, autoReConnection)
}
</script>

<template>
  <div :class="$style.root" id="NotificationView">
    <div :class="$style.head">
      <i class="icon-bell-alt"></i>
      <p>通知</p>
    </div>
    <Notification v-for="notification in notifications" :notification="notification" />
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

    height: var(--head-bar-height);

    border-bottom: solid 1px var(--primary-border-color);
  }
}
</style>
