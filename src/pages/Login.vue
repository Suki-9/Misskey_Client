<script setup lang="ts">
//TS Module
//Vue Component
</script>

<template>
  <div :class="$style.root">
    <p :class="$style.head">Login!!</p>
    <div :class="$style.tile">
      <p :class="$style.tileHead">ログイン<span></span></p>
      <div :class="$style.tileContainer">
        <img :class="$style.avatar"/>
        <a :class="$style.button">Use MiAuth</a>
        <a :class="$style.button">Password</a>
      </div>
      <input :class="$style.form" placeholder="UserName"/>
      <input :class="$style.form" placeholder="UserName"/>
      <p :class="$style.attentionText">パスワードを忘れた場合</p>
      <div :class="$style.submitButtonBox">
        <a :class="$style.submitButton">Login</a>
      </div>
    </div>
    <div :class="$style.tile">
      <p :class="$style.tileHead">他のサーバーにログインする<span></span></p>
      <input :class="$style.form" placeholder="Host Name"/>
    </div>
    <div :class="$style.tile">
      <p :class="$style.tileHead">新規登録<span></span></p>
      <input :class="$style.form" placeholder="UserName"/>
      <input :class="$style.form" placeholder="UserName"/>
    </div>
  </div>
</template>

<style module lang="scss">
.root {//1.25 //2.5
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
  .head {
    display: flex;
    align-items: center;

    height: 6.25vh;

    padding: 0 5vw;

    font-size: 110%;

    border-bottom: solid 1px var(--primary-border-color);
  }
  .tile {
    position: relative;

    margin: 1.25vh 5vw 0 5vw;

    .tileHead {
      display: flex;
      align-items: center;
      flex-direction: row;

      height: 2.5vh;

      margin: 0 0 1.25vh 0;

      font-size: 70%;

      white-space: nowrap;

      background-clip: var(--primary-bg-color);

      span {
        padding: 1px 0 0 0;

        width: 100%;

        border-bottom: solid 1px var(--primary-border-color);
      }
    }
    .tileContainer {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;

      width: 100%;

      margin: 0 0 1.25vh 0;
      .avatar {
        height: 7.5vh;
        width: 7.5vh;

        border-radius: 50%;
        border: solid 1px var(--primary-border-color);
      }
      .button {
        width: 30vw;

        padding: 1vh 1vw;

        font-size: 70%;
        text-align: center;

        border-radius: var(--default-border-radius);
        border: solid 1px var(--primary-border-color);
      }
    }
    .form {
      width: calc(100% - 6.25vh);
      height: 6.25vh;

      margin: 0 0 1.25vh 0;
      padding: 0 3.125vh;
  
      background-color: var(--primary-bg-color);

      color: var(--primary-text-color);
      font-size: 70%;

      border-radius: 3.125vh;
      border: solid 1px var(--primary-border-color);
    }
    .attentionText {
      margin: 0 0 1.25vh 0;

      padding: 0 2.5vw;

      font-size: 50%;
      text-align: right;
      color: var(--secondary-text-color);
    }
    .submitButtonBox {
      width: 100%;
      height: 3.75vh;

      margin: 0 0 1.25vh 0;

      text-align: right;
      .submitButton {
        height: 3.75vh;
        width: 25vw;

        padding: 1vh 7.5vw;

        font-size: 70%;
        text-align: center;

        border-radius: var(--default-border-radius);
        border: solid 1px var(--primary-border-color);
      }
    }
  }
}
</style>