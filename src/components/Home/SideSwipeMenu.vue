<script setup lang="ts">
// TS Module -------------------------------------------///
import { ref } from "vue";

// Vue Component ---------------------------------------///
import AddAccount from "./SideSwipeMenus/AddAccount.vue";

const showAddAccount = ref<boolean>(false);

let t = localStorage.getItem("usersData");
const myAccounts: Record<string, LoginUser> = t ? JSON.parse(t) : undefined;

const changeAccount = (loginUser: string) => {
  console.log(loginUser);
  document.cookie = `loginUser=${loginUser}; path=/`;
  location.reload();
};
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.accounts">
      <div v-for="(myAccount, key) in myAccounts" :class="$style.accountTile" @click="changeAccount(key)">
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
