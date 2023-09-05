<script setup lang="ts">
import { fetchAPI } from "../scripts/API/fetchMisskeyAPI";
import "../scripts/API/api.d";
import { ref } from "vue";

const endpoint = ref<keyof Endpoints>("notes/timeline");
const fetchMethod = ref<"POST" | "GET">("POST");
const body = ref<any | undefined>("");
const response = ref<any | undefined>("");

const test = async () => {
  const options = body.value
    .replaceAll("{", "")
    .replaceAll("}", "")
    .replaceAll("\n", "")
    .split(";");
  body.value = JSON.parse((body.value = "{}"));
  options.forEach(option => {
    if (option !== "") {
      const kv = option.replaceAll(" ", "").replaceAll('"', "").split(":");
      body.value[kv[0]] = Number(kv[1]);
    }
  });
  console.log(body.value);
  response.value = "";
  response.value = await fetchAPI(
    "Misskey.io",
    endpoint.value,
    body.value,
  );
  console.log(response.value)
  response.value = JSON.stringify(response.value);
  body.value = "";
};
</script>

<template>
  <h3>API test</h3>
  <p>endpoint</p>
  <input v-model="endpoint" :class="$style.textInput" />
  <p @click="fetchMethod = fetchMethod == 'GET' ? 'POST' : 'GET'">
    fetchMethod : {{ fetchMethod }}
  </p>
  <p>body</p>
  <textarea v-model="body" :class="$style.textInput"></textarea>
  <p>res</p>
  <textarea v-model="response" :class="$style.textInput"></textarea>
  <a :class="$style.button" @click="test">Go!</a>
</template>

<style module lang="scss">
.textInput {
  width: 90%;
  margin: 1% 5%;
  padding: 0;

  border: none;

  font-size: 100%;
}
.button {
  position: absolute;
  bottom: 5%;
  right: 5%;

  padding: 0 2%;

  border: solid 1px;
  border-radius: 5px;
}
p,
h3 {
  width: 90%;
  margin: 0 5%;
}
textarea {
  overflow: scroll;
  height: 7em;
}
</style>
../scripts/API/fetchMisskeyAPI