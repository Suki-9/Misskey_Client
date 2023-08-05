<script setup lang="ts">
//TS Module
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

//vue component
import NoticesVue from "./Notices.vue";

const goHome = () => { router.push("/") }
const reload = () => { location.reload() }
const viewNotices = ref<boolean>(false)
</script>


<template>
  <div :class="$style.root">
    <i class="icon-dot-3"></i>
    <i 
      class="icon-home"
      @click="goHome"
      ></i>
    <i 
      class="icon-bell-alt"
      @click="viewNotices = !viewNotices"
      ></i>
    <i
      class="icon-cw"
      @click="reload"
    ></i>
    <i class="icon-mail-alt"></i>
  </div>
  <NoticesVue v-show="viewNotices" />
</template>

<style module lang="postcss">
.root {
  display: flex;
  align-items: center;
  justify-content: space-around;

  position: fixed;
  bottom: 0;
  left: 0;

  width: 96vw;

  padding: 2%;

  border-top: solid 1px;

  background-color: var(--primary-bg-color);

  i {
    padding: 2% 3%;

    line-height: 0;
  }
  i::before {
    margin: 0;
  }
}
</style>
