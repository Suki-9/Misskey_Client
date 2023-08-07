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
      <div>
        <p :class="$style.username">
          <span v-html="notification.user.name"></span>
          <span>さん</span>
        </p>
        <p :class="$style.action">
          あなたの投稿に{{ notification.type }}しました。
        </p>
        <div v-if="notification.text" :class="$style.text" v-html="notification.text"></div>
      </div>
    </div>
    <Note v-if="notification.note" :note="notification.note" />
  </div>
</template>

<style module lang="scss">
.root {
  display: flex;
  flex-direction: column;

  padding: 2%;
  margin: 2%;

  background-color: var(--tertiary-bg-color);

  border-radius: var(--default-border-radius);

  .head {
    margin-bottom: 2%;
    .reaction {
      display: flex;

      padding: 4px;

      height: 1.4em;
      width: fit-content;

      font-size: 70%;

      background-color: var(--primary-bg-color);

      border-radius: var(--default-border-radius);
    }
  }

  .content {
    display: flex;
    flex-direction: row;

    background-color: var(--tertiary-bg-color);

    .avatar {
      height: 1.5em;
      width: 1.5em;

      margin-right: 1%;

      border-radius: var(--default-border-radius);
    }

    div {
      overflow: hidden;

      .username,.action {
        display: flex;
        flex-direction: row;
        align-items: center;

        font-size: 60%;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    
      .text {
        margin-top: 2%;

        font-size: 50%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: var(--secondary-text-color);
      }

      .text::before,.text::after { 
        content: "”" ;
        font-size: 20%;
      }
    }
  }
}
</style>
