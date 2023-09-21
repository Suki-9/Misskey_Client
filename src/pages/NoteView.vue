<script setup lang="ts">
// TS Module -------------------------------------------///
import { fetchMisskeyAPI } from "../scripts/API/fetchAPI";
import { noteGen } from "../scripts/API/note";
import { useRoute } from "vue-router";
const route = useRoute();

// Vue Component ---------------------------------------///
import Note from "../components/global/Note.vue";
import HeadBar from "../components/global/HeadBar.vue";

const note = await fetchMisskeyAPI<"notes/show">("notes/show", {
  noteId: route.params["id"] as string,
}).then(fetchNote => noteGen(fetchNote!));
</script>

<template>
  <HeadBar
    :text="`${note.createdAt.split('T')[0]}(${note.createdAt.split('T')[1].split('.')[0]})`"
    :icon="note.user.avatarUrl"
  />
  <Note
  :class="$style.note"
  :note="note"/>
</template>

<style module lang="scss">
.note {
  margin: 2%;
}
</style>
