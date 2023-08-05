<script setup lang="ts">
//Types
import { ModifiedNotification } from '../../scripts/types';

//TS Module
import { ref } from 'vue';
import { getNotifications } from '../../scripts/API/notification';
import { readCookie } from '../../scripts/Cookie';

//Vue Component
import Notification from './Notification.vue';


const host = readCookie("loginHost");
const Notifications = ref<ModifiedNotification[]>([]);

if (host !== undefined) {
    getNotifications(host).then(
        getNotifications => (Notifications.value = getNotifications)
    );
}
</script>


<template>
    <div :class="$style.root">
        <Notification
            v-for="Notification in Notifications"
            :Notification="Notification"/>
    </div>
</template>


<style module lang="postcss">
.root {
    width: 98vw;

    border-radius: var(--default-border-radius);

    position:relative;
    overflow: scroll;

    border: solid 1px;

    background-color: var(--primary-bg-color);
}
</style>