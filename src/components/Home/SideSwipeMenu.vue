<script setup lang="ts">
let t = localStorage.getItem("usersData")
const myAccounts = t ? JSON.parse(t) : undefined

const changeAccount = (loginUser: string) => { 
  document.cookie = `loginUser=${loginUser}; path=/`;
}
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.accounts">
      <div v-for="(myAccount, key) in myAccounts" :class="$style.accountTile" @click="changeAccount(key)">
        <img :src="myAccount.avaterURL" />
      </div>
      <div :class="$style.accountTile">
        <i class="icon-user-add"></i>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.root {
  display: flex;
  width: 90vw;
}
.accounts {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 16vw;
    height: var(--display-height);

    background-color: var(--tertiary-bg-color);
    border-radius: var(--default-border-radius);
    .accountTile {
      width: calc(14vw - 2px);
      height: calc(14vw - 2px);

      margin: calc(1vw - 1px);

      background-color: var(--secondary-bg-color);
      border-radius: var(--default-border-radius);
      border: solid 1px var(--primary-border-color);
      img,i {
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
.showAccount {

}
</style>