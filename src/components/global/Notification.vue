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
        :style="
          notification.reaction.link &&
          `content: url(${notification.reaction.link})`
        "
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
        <div
          v-if="notification.text"
          :class="$style.text"
          v-html="notification.text"
        ></div>
      </div>
    </div>
    <Note
      v-if="notification.note"
      :class="$style.quote"
      :note="notification.note"
    />
  </div>
</template>

<style module lang="scss">
@import "../../styles/globalComponent.css";
.root {
  display: flex;
  flex-direction: column;

  padding: 2%;
  margin: 2%;

  border: solid 1px var(--primary-border-color);

  .head {
    .reaction {
      width: fit-content;

      margin: 0 0 2% 0;

      border: solid 1px var(--primary-border-color);
    }
  }

  .content {
    display: flex;
    flex-direction: row;

    .avatar {
      height: var(--avater-size-L);
      width: var(--avater-size-L);

      border: solid 1px var(--primary-border-color);
    }

    div {
      overflow: hidden;

      margin-left: 2%;
      .username,
      .action {
        display: flex;
        flex-direction: row;
        align-items: center;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .text {
        font-size: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: var(--secondary-text-color);
      }

      .text::before,
      .text::after {
        content: "”";
      }
    }
  }

  .quote {
    margin-top: 2%;
  }
}
</style>
