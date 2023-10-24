<script setup lang="ts">
// TS Module -------------------------------------------///
import { fetchMisskeyAPI } from "../scripts/API/fetchAPI";
import { inject } from "vue";
import { noteGen, fetchChildrenNotes } from "../scripts/API/note";
import { useRoute } from "vue-router";

// Vue Component ---------------------------------------///
import Note from "../components/global/Note.vue";
import HeadBar from "../components/global/HeadBar.vue";

const loginUser = inject<LoginUser>("loginUser");

const note =
  loginUser &&
  (await fetchMisskeyAPI<"notes/show">(
    "notes/show",
    {
      i: loginUser?.token,
      noteId: String(useRoute().params["id"]),
    },
    loginUser?.host
  ).then(fetchNote => {
    if (fetchNote) return noteGen(fetchNote, loginUser?.host);
  }));

const childrenNotes = note ? await fetchChildrenNotes(note.id, loginUser?.host) : undefined;
</script>

<template>
  <div :class="$style.root" v-if="note">
    <HeadBar
      :text="`${note.createdAt.split('T')[0]}(${note.createdAt.split('T')[1].split('.')[0]})`"
      :icon="note.user.avatarUrl"
    />
    <Note :class="$style.note" :note="note" />
    <Note v-for="childrenNote in childrenNotes" :class="$style.note" :note="childrenNote" :replymode="true" />
  </div>
  <p v-else>Noteが存在しません。</p>
</template>

<style module lang="scss">
.root {
  .note {
    margin: 2%;
  }
}
</style>
