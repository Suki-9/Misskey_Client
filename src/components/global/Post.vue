<script setup lang="ts">
//TS Module
import { ref } from 'vue';
import { readCookie } from '../../scripts/cookie';
import { getUserData } from '../../scripts/API/userdata';

const Active = ref<boolean>(false)

const userData = JSON.parse(readCookie(`${readCookie("loginHost")}_userData`).unwrap_or(await getUserData(readCookie("loginHost").unwrap())))
console.log(userData)
</script>


<template>
  <i class="icon-pencil" :class="$style.postButton" @click="Active = !Active"></i>
  <div v-show="Active" :class="$style.root">
    <div :class="$style.header">
        <i class="icon-cancel" :class="$style.closeButton" @click="Active = !Active"></i>
      <div :class="$style.submitButtons">
        <a >下書き</a>
        <a >ノート</a>
      </div>
    </div>
    <div :class="$style.content">
      <img>
      <div></div>
    </div>
    <div :class="$style.footer">
    </div>
  </div>
</template>

<style module lang="scss">
.postButton {
  position: fixed;
  bottom: 10%;
  right: 5%;

  border-radius: var(--default-border-radius);

  padding: 3%;

  font-size: 1.5em;
  line-height: 0;
  color: var(--tertiary-text-color);

  background-color: var(--accent-color);
}
.postButton::before {
  margin: 0;
}
.root {
  display: flex;
  flex-direction: column;

  position: fixed;
  top: 2%;

  width: 94vw;

  padding: 2%;

  border-radius: var(--default-border-radius);

  border: solid 1px var(--primary-border-color);
  background-color: var(--primary-bg-color);

  font-size: 60%;

  animation-name: moveIn;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;

  transform: translateY(-100%);
  opacity: 0;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;

    .closeButton {

    }

    .submitButtons {
      display: flex;
      flex-direction: row-reverse;

      width: 50%;

      white-space: nowrap;
      a {
        padding: 2% 4% 2% 4%;
        margin-left: 4%;

        background-color: var(--secondary-bg-color);

        border-radius: var(--default-border-radius);
      }
    }
  }
  .content {
    display: flex;
    flex-direction: row;



  }

  .footer {
    display: flex;
    flex-direction: row;
  }
}

@keyframes moveIn {
  0% {
    transform: translateY(20%);
    opacity: 0;
  }
  70% {
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
