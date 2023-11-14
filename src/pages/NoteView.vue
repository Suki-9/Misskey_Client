<script setup lang="tsx">
// TS Module -------------------------------------------///
import { fetchMisskeyAPI } from "../scripts/API/fetchAPI";
import { inject } from "vue";
import { noteGen } from "../scripts/API/note";
import { useRoute } from "vue-router";

const loginUser = inject<LoginUser>("loginUser");

const Note =
  loginUser &&
  (await fetchMisskeyAPI(
    "notes/show",
    {
      i: loginUser?.token,
      noteId: String(useRoute().params["id"]),
    },
    loginUser?.host
  ).then(fetchNote => {
    if (fetchNote) return noteGen(fetchNote, loginUser?.host);
  }));
</script>

<template>
  <Note />
</template>
