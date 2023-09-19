<script setup lang="ts">
// TS Module -------------------------------------------///
import { getUserData } from "../../scripts/API/userdata";
import { readCookie } from "../../scripts/cookie";
import { parseEmoji } from "../../scripts/emoji";

const userData = JSON.parse(
  await getUserData(readCookie("loginHost").unwrap())
);
</script>

<template>
  <div :class="$style.root">
    <div :class="$style.bio">
      <div :class="$style.head">
        <img :class="$style.avatar" :src="userData.avatarUrl" />
        <p
          :class="$style.name"
          v-html="userData.name == null ? userData.username : parseEmoji(userData.name)"
        ></p>
        <p :class="$style.userName">@{{ userData.username }}</p>
        <div :class="$style.followCounter">
          <p>
            <span>{{ userData.followingCount }}</span>
            <span>フォロー</span>
          </p>
          <p>
            <span>{{ userData.followersCount }}</span>
            <span>フォロワー</span>
          </p>
        </div>
      </div>
    </div>
    <div :class="$style.list">
      <a>プロフィール</a>
      <a>お気に入り</a>
      <a>リスト</a>
      <a>ドライブ</a>
    </div>
    <div :class="$style.list">
      <a>設定</a>
      <a>もっと</a>
      <a>リアクションデッキ</a>
    </div>
  </div>
</template>

<style module lang="scss">
@import "../../styles/globalComponent.css";
.root {
  display: flex;
  flex-direction: column;

  min-width: 60%;

  padding: 2%;

  font-size: 120%;

  background-color: var(--secondary-bg-color);
  .bio {
    display: flex;
    flex-direction: column;

    padding-bottom: 2%;
    margin-bottom: 2%;

    border-bottom: solid 1px var(--secondary-border-color);
    .head {
      display: flex;
      flex-direction: column;
      .name {
        margin-top: 2%;
      }
      .userName {
        color: var(--secondary-text-color);
      }
      .followCounter {
        display: flex;
        flex-direction: row;

        font-size: 90%;
        p {
          margin-right: 2%;
        }
      }
    }
  }
  .list {
    display: flex;
    flex-direction: column;

    margin: 1%;
    line-height: 1.6rem;

    font-size: 140%;


    border-bottom: solid 1px var(--secondary-border-color);
  }
}
</style>
