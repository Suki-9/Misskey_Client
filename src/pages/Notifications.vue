<script setup lang="ts">
// Type ------------------------------------------------///
import { ModifiedNotification } from "../scripts/Types/types";

// TS Module -------------------------------------------///
import { fetchMisskeyAPI } from "../scripts/API/fetchAPI";
import { notificationGen } from "../scripts/API/notification";
//import { streamMain } from "../scripts/API/stream";
import { readCookie } from "../scripts/cookie";
import { ref } from "vue";

//Vue Component ----------------------------------------///
import Notification from "../components/global/Notification.vue";

const host = readCookie("loginHost").value;
const notifications = ref<ModifiedNotification[]>([]);
//const autoReConnection = true;

//Entry point
if (host) {
  fetchMisskeyAPI<"i/notifications">("i/notifications", {
    i: readCookie(`${host}_token`).value,
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
  <div :class="$style.head">
    <i class="icon-bell-alt"></i>
    <p>通知</p>
  </div>
  <div :class="$style.root">
    <Notification v-for="notification in notifications" :notification="notification" />
  </div>
</template>

<style module lang="scss">
.head {
  position: fixed;

  display: flex;
  align-items: center;
  justify-content: center;

  height: var(--head-bar-height);
  width: 100vw;

  border-bottom: solid 1px var(--primary-border-color);
  background-color: var(--primary-bg-color);
}

.root {
  padding-top: var(--head-bar-height);
}
</style>
../scripts/Types/types
