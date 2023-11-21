<script setup lang="ts">
import AddAccount from "./SideSwipeMenus/AddAccount.vue";

import { ref } from "vue";
import cookie from '../../scripts/cookie';

const showAddAccount = ref<boolean>(false);
const myAccounts: Record<string, LoginUser> = JSON.parse(localStorage.getItem("usersData") ?? '{}');

const changeAccount = (loginUser: string) => {
  cookie.write('loginUser', loginUser);
  location.reload();
};
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.accounts">
      <!--TODO key を修正してください。-->
      <div v-for="(myAccount, key) in myAccounts" :key="key" :class="$style.accountTile" @click="changeAccount(key)">
        <img :src="myAccount.avatarURL" />
      </div>
      <div :class="$style.accountTile" @click="showAddAccount = !showAddAccount">
        <i class="icon-user-add"></i>
      </div>
    </div>
    <div :class="$style.subMenu">
      <AddAccount v-if="showAddAccount" />
    </div>
  </div>
</template>

<style module lang="scss">
.root {
  display: flex;
  width: 90vw;

  margin: 2%;
  height: calc(var(--display-height) - 2%);
}
.accounts {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 16vw;

  background-color: var(--tertiary-bg-color);
  border-radius: var(--default-border-radius);
  .accountTile {
    width: calc(14vw - 2px);
    height: calc(14vw - 2px);

    margin: calc(1vw - 1px);

    background-color: var(--secondary-bg-color);
    border-radius: var(--default-border-radius);
    border: solid 1px var(--primary-border-color);
    img,
    i {
      width: 100%;
      height: 100%;

      border-radius: var(--default-border-radius);

      &::before {
        margin: 1vw;
        padding: 0;
        font-size: calc(12vw - 2px);
      }
    }
  }
}
.subMenu {
  width: 70vw;

  margin: 0 auto;

  background-color: var(--tertiary-bg-color);
  border-radius: var(--default-border-radius);
}
</style>
