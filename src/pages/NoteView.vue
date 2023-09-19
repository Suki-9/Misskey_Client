<script setup lang="ts">
// TS Module -------------------------------------------///
import { fetchMisskeyAPI } from "../scripts/API/fetchAPI";
import { noteGen } from "../scripts/API/note";
import { useRoute } from 'vue-router'
const route = useRoute()

// Vue Component ---------------------------------------///



const note = await fetchMisskeyAPI<"notes/show">("notes/show", { noteId: route.params["id"] as string }).then(
  fetchNote => noteGen(fetchNote!)
)

</script>


<template>
  <p>{{ note }}</p>
</template>

<style module lang="scss">

</style>