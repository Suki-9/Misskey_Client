<script setup lang="ts">
import { ModifiedNote } from "../../scripts/types";

defineProps<{
  note: ModifiedNote;
}>();
</script>

<template>
  <div :class="$style.root">
    <div v-if="note.renoter" :class="$style.renote">
      <img :class="$style.renoterAvatar" :src="note.renoter.avatarUrl" />
      <p :class="$style.renoterName">
        <span v-html="note.renoter.name"></span>さんがリノート
      </p>
    </div>
    <div :class="$style.note">
      <img :class="$style.avatar" :src="note.user.avatarUrl" />
      <article>
        <header>
          <p :class="$style.userName">
            <span v-html="note.user.name"></span>
            <span>@{{ note.user.username }}</span>
          </p>
        </header>
        <div :class="$style.text" v-html="note.text"></div>
        <div :class="$style.media">
          <img v-for="file in note.files" :src="file.thumbnailUrl" />
        </div>
        <div :class="$style.reactions">
          <p v-for="reaction in note.reactions" :class="$style.reaction">
            <span
              :style="`content: url(${reaction.link})`"
              :class="$style.emoji"
            >
              {{ reaction.name }}
            </span>
            <span> {{ reaction.count }}</span>
          </p>
        </div>
        <footer>
          <i class="icon-comment"></i>
          <i class="icon-retweet"></i>
          <i class="icon-plus"></i>
          <i class="icon-dot-3"></i>
        </footer>
      </article>
    </div>
  </div>
</template>

<style module lang="postcss">
.root {
  display: flex;
  flex-direction: column;

  min-width: 300px;
  max-width: 600px;

  padding: 2%;
  margin: 10px 0 0 0;

  border-radius: var(--default-border-radius);

  background-color: var(--secondary-bg-color);

  .renote {
    display: flex;
    flex-direction: row;

    width: 100%;

    margin: 0 0 2% 0;

    border-bottom: solid 1px var(--secondary-border-color);
    .renoterAvatar {
      height: 0.8em;
      width: 0.8em;

      border-radius: 0.2em;
    }
    .renoterName {
      display: flex;
      flex-direction: row;

      width: 90%;

      margin: 0 2% 0 2%;

      font-size: 60%;

      overflow: hidden;
      white-space: nowrap;

      span {
        display: flex;
        align-items: center;
      }
    }
  }
  .note {
    display: flex;
    flex-direction: row;

    .avatar {
      height: 2em;
      width: 2em;

      border-radius: 0.4em;
    }
    article {
      display: flex;
      flex-direction: column;

      width: calc(96% - 2em);

      padding: 0 2% 2% 2%;

      header {
        display: flex;
        flex-direction: row;
        .userName {
          display: flex;
          flex-direction: row;

          font-size: 60%;

          overflow: hidden;
          white-space: nowrap;
          span {
            display: flex;
            align-items: center;
          }
        }
      }

      .text {
        overflow: hidden;
        font-size: 60%;
      }
      .media {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;

        width: 100%;

        img {
          width: 98%;

          margin: 1%;

          object-fit: cover;
          aspect-ratio: 16 / 9;

          border-radius: var(--default-border-radius);
        }
      }
      .reactions {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;

        font-size: 60%;

        .reaction {
          display: flex;

          margin: 3px;
          padding: 4px;

          height: 1.3em;

          background-color: var(--primary-bg-color);

          border-radius: var(--default-border-radius);
          .emoji {
            height: 1.3em;

            margin-right: 5px;
          }
        }
      }
      footer {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;

        width: 60%;

        font-weight: 300;
        font-size: 70%;
      }
    }
  }
}
</style>
