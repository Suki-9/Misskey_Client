<script setup lang="ts">
//Types
import { ModifiedNotification } from "../../scripts/types";

//Vue Component
import Note from "./Note.vue";

defineProps<{
  notification: ModifiedNotification;
}>();
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.head">
      <p
        v-if="notification.reaction"
        :class="$style.reaction"
        :style="notification.reaction.link && `content: url(${notification.reaction.link})`"
      >
        {{ notification.reaction?.name }}
      </p>
    </div>
    <div :class="$style.content">
      <img :class="$style.avatar" :src="notification.user.avatarUrl" />
      <p :class="$style.username">
        <span v-html="notification.user.name"></span>
        <span>さんがあなたの投稿に{{ notification.type }}しました。</span>
      </p>
    </div>
    <div :class="$style.text"></div>
    <Note v-if="notification.note" :note="notification.note" />
  </div>
</template>

<style module lang="scss">
.root {
  display: flex;
  flex-direction: column;

  padding: 2%;
  margin: 2%;

  background-color: var(--secondary-bg-color);

  border-radius: var(--default-border-radius);

  .head {
    margin-bottom: 1%;
    .reaction {
      display: flex;

      padding: 4px;

      height: 1.5em;

      font-size: 70%;

      background-color: var(--primary-bg-color);

      border-radius: var(--default-border-radius);
    }
  }

  .content {
    display: flex;
    flex-direction: row;

    .avatar {
      height: 1.5em;
      width: 1.5em;

      border-radius: 0.4em;
    }
    .username {
      display: flex;
      flex-direction: row;
      align-items: center;

      font-size: 60%;

      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>
