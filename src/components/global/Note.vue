<script setup lang="ts">
//Type
import { ModifiedNote } from "../../scripts/types";

//TS Module
import { readCookie } from "../../scripts/cookie";
import { getUserData } from "../../scripts/API/userdata";

//Vue Component function
import { Show_emojiPalette } from "../Home/PopUpUIs.vue";

const props = defineProps<{
  note: ModifiedNote;
}>();
const userData = JSON.parse(await getUserData(readCookie("loginHost").unwrap()))


const AndMoreMenu = (e: MouseEvent) => {
  const target = document.getElementById(`${props.note.id}_PopUp`)
  if (target) {
    target.style.left = `${e.pageX}px`
    target.style.top = `${e.pageY}px`
  }
  const Listcontent = [
    { text: "内容をコピー",   action: "", },
    { text: "リンクをコピー", action: "", },
    { text: "",               action: "", },
    { text: "クリップに追加", action: "", },
    { text: "ピン留め",       action: "", },
  ]

  if (props.note.user.id == userData.id) Listcontent.push(
    { text: "削除",         action: "", },
    { text: "削除して編集", action: "", })
}
</script>

<template>
  <div :class="$style.root">
    <div v-if="note.renoter" :class="$style.renote">
      <img :class="$style.renoterAvatar" :src="note.renoter.avatarUrl" />
      <p :class="$style.renoterName">
        <span v-html="note.renoter.name"></span>さんがリノート<i class="icon-retweet"></i>
      </p>
    </div>
    <div :class="$style.note">
      <img :class="$style.avatar" :src="note.user.avatarUrl" />
      <article>
        <header>
          <p :class="$style.userName">
            <span v-html="note.user.name"></span>
            <span>@{{ note.user.username }}</span>
          </p>
        </header>
        <div :class="$style.text" v-html="note.text"></div>
        <div :class="$style.files">
          <div 
            v-for="file in note.files"
            :class="$style.media_img">
            <img :src="file.thumbnailUrl" v-show="!file.isSensitive"/>
            <div 
              :class="$style.sensitiveAlert" 
              v-show="file.isSensitive"
              @click="file.isSensitive = !file.isSensitive">
              <p>センシティブな画像</p>
            </div>
          </div>
        </div>
        <div :class="$style.reactions">
          <p v-for="reaction in note.reactions" :class="$style.reaction">
            <span
              :style="reaction.link && `content: url(${reaction.link})`"
              :class="$style.emoji">
              {{ reaction.name }}
            </span>
            <span> {{ reaction.count }}</span>
          </p>
        </div>
        <footer>
          <i class="icon-comment" alt=""></i>
          <i class="icon-retweet" alt="renote"></i>
          <i class="icon-plus"    alr="reaction" @click="Show_emojiPalette"></i>
          <i class="icon-dot-3"   alt="more"     @click="AndMoreMenu"></i>
        </footer>
      </article>
    </div>
  </div>
</template>

<style module lang="scss">
@import "../../assets/css/globalComponent.css";
.root {
  display: flex;
  flex-direction: column;

  border: solid 1px var(--primary-border-color);
  .renote {
    display: flex;
    flex-direction: row;

    width: 96%;

    padding: 1% 2%;

    border-bottom: solid 1px var(--primary-border-color);
    .renoterAvatar {
      height: 0.8em;
      width: 0.8em;

      object-fit: cover;

      border-radius: 0.2em;
    }
    .renoterName {
      display: flex;
      flex-direction: row;
      align-items: center;

      width: 90%;

      margin: 0 2%;

      font-size: 60%;

      overflow: hidden;
      white-space: nowrap;

      span {
        display: flex;
        align-items: center;
      }
    }
  }
  .note {
    display: flex;
    flex-direction: row;

    .avatar { margin: 2%; }
    article {
      display: flex;
      flex-direction: column;

      width: calc(96% - 2em);

      padding: 2% 2% 2% 0;

      header {
        display: flex;
        flex-direction: row;

        margin-bottom: 2%;
        .userName {
          display: flex;
          flex-direction: row;

          font-size: 60%;

          overflow: hidden;
          white-space: nowrap;
          span {
            display: flex;
            align-items: center;
          }
        }
      }
      .text {
        overflow: hidden;
        font-size: 60%;
      }
      .files {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;

        width: 100%;

        .media_img {
          width: 98%;

          margin: 1%;

          img,.sensitiveAlert {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 100%;

            object-fit: cover;
            aspect-ratio: 16 / 9;

            font-size: 70%;

            border: solid 1px var(--primary-border-color);
            border-radius: var(--default-border-radius);
          }
        }
      }
      .reactions {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;

        font-size: 60%;

        .reaction {
          margin: 3px 3px 3px 0;
        }
      }
      footer {
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;

        width: 60%;

        font-weight: 300;
        font-size: 70%;
      }
    }
  }
}
.PopUpAndMoreMenu {
  position: fixed;
}
</style>
