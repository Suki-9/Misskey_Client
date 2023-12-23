<script setup lang="ts">
// TS Module -------------------------------------------///
import { ref } from "vue";
import cookie from "../../scripts/cookie";

//Vue Component ----------------------------------------///
import NoteMedia from "./Note/NoteMedia.vue";
import ReNoteMenu from "./Note/ReNoteMenu.vue";
import ReactionButton from "./Note/ReactionButton.vue";
import EmojiPalette from "./EmojiPalette.vue";
import Post from "./PostNote.vue";

defineProps<{
  note: Mi_Note;
}>();

const show_reNoteMenu = ref<boolean>(false);
const show_replyWindow = ref<boolean>(false);
const show_emojiPalette = ref<boolean>(false);

const loginUser: UserData = JSON.parse(localStorage.getItem(cookie.read('loginUser') ?? '') ?? '{}');
</script>

<template>
  <div :class="$style.root" v-if="note">
    <div v-if="note.renote" :class="$style.renote">
      <img :class="$style.renoterAvatar" :src="note.renote.user.avatarUrl ?? ''" />
      <p :class="$style.renoterName">
        <span v-html="note.renote.user.name"></span>さんがリノート<i class="icon-retweet"></i>
      </p>
    </div>

    <div v-if="note.reply" :class="$style.reply">
      <img :src="note.reply.user.avatarUrl ?? ''" :class="$style.avatar" />
      <article>
        <p v-html="note.reply.user.name" :class="$style.name"></p>
        <p v-html="note.reply.text" :class="$style.userName"></p>
      </article>
    </div>

    <div :class="$style.note">
      <img :class="$style.avatar" :src="note.user.avatarUrl ?? ''" />
      <article>
        <header>
          <p :class="$style.userName" @click="$router.push(`/notes/${note.id}`)">
            <span v-html="note.user.name"></span>
            <span>@{{ note.user.username }}</span>
          </p>
        </header>
        <div :class="$style.text" v-html="note.text"></div>
        <div :class="$style.text" v-html="note.cw" v-if="note.cw"></div>
        <div :class="$style.files">
          <NoteMedia
            v-for="(file, key) in note.files"
            :key="key"
            :mediaData="file"
          />
        </div>

        <div :class="$style.reactions">
          <ReactionButton
            v-for="(reaction, key) in Object.entries(note.reactions)"
            :key="key"
            :loginUser="loginUser"
            :reaction="reaction"
            :note="note"
          />
        </div>
        <footer>
          <p>
            <i class="icon-comment" alt="reply" @click="show_replyWindow = !show_replyWindow"></i>
            {{ note.repliesCount }}
          </p>
          <p>
            <i class="icon-retweet" alt="renote" @click="show_reNoteMenu = !show_reNoteMenu"></i>
            {{ note.renoteCount }}
          </p>
          <p>
            <i class="icon-plus" alr="reaction" @click="show_emojiPalette = !show_emojiPalette"></i>
          </p>
          <p>
            <i class="icon-dot-3" alt="more"></i>
          </p>
        </footer>
        <a v-show="note.repliesCount && replymode" @click="loadReplys()">続きを読み込む</a>
      </article>
    </div>
    <ReNoteMenu :noteId="note.id" :loginUser="loginUser" v-show="show_reNoteMenu" />
    <Post
      :isShowWindow="show_replyWindow"
      :noteId="note.id"
      @close="show_replyWindow = false"
      v-if="show_replyWindow"
    />
    <!-- <Note v-if="childrenNotes" v-for="(childrenNote, key) in childrenNotes" :note="childrenNote" replymode :key="key"/>-->
    <EmojiPalette v-if="show_emojiPalette" :noteId="note.id" @close="show_emojiPalette = false" />
  </div>
</template>

<style module lang="scss">
@import "../../styles/globalComponent.css";
.root {
  display: flex;
  flex-direction: column;

  overflow: hidden;

  border: solid 1px var(--primary-border-color);
  border-radius: var(--default-border-radius);
  background-color: var(--tertiary-bg-color);

  .renote {
    display: flex;
    flex-direction: row;
    align-items: center;

    width: 96%;

    padding: 1% 2%;

    border-bottom: solid 1px var(--primary-border-color);

    .renoterAvatar {
      height: 1.3rem;
      width: 1.3rem;

      object-fit: cover;

      border-radius: 0.2em;
    }

    .renoterName {
      display: flex;
      flex-direction: row;

      width: 90%;

      margin: 0 2%;

      overflow: hidden;
      white-space: nowrap;

      span {
        display: flex;
        align-items: center;
      }
    }
  }

  .reply {
    display: flex;
    align-items: center;

    margin: 0 2%;

    font-size: 90%;

    border-bottom: solid 1px var(--primary-border-color);

    .avatar {
      height: var(--avater-size-M);
      width: var(--avater-size-M);

      margin-right: 2%;
    }

    article {
      p {
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }

  .note {
    display: flex;
    flex-direction: row;

    .avatar {
      height: var(--avater-size-L);
      width: var(--avater-size-L);

      margin: 2%;
    }

    article {
      display: flex;
      flex-direction: column;

      width: calc(96% - 2em);

      padding: 2% 2% 2% 0;

      header {
        display: flex;
        flex-direction: row;

        margin-bottom: 2%;

        .userName {
          display: flex;
          flex-direction: row;

          overflow: hidden;
          white-space: nowrap;

          span {
            display: flex;
            align-items: center;
          }
        }
      }

      .text {
        margin-bottom: 1%;

        overflow: hidden;
      }

      .files {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;

        margin-bottom: 1%;

        width: 100%;
      }

      .reactions {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;

        margin-bottom: 1%;

        font-size: 80%;
      }

      footer {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;

        width: 60%;

        p {
          i {
            font-size: 130%;
          }
        }
      }
    }
  }
}
</style>
