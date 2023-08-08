<script setup lang="ts">
//Type
import { ModifiedNote } from "../../scripts/types";

//TS Module
import { onMounted, ref } from "vue";
import { readCookie } from "../../scripts/cookie";
import { getUserData } from "../../scripts/API/userdata";

//vue component
import PopUpMenuList from "./PopUpMenuList.vue";


const props = defineProps<{
  note: ModifiedNote;
}>();

const onAndMoreMenu = ref<boolean>(false)
const Listcontent = [
  {
    text: "内容をコピー",
    action: "",
  },
  {
    text: "リンクをコピー",
    action: "",
  },
  {
    text: "",
    action: "",
  },
  {
    text: "クリップに追加",
    action: "",
  },
  {
    text: "ピン留め",
    action: "",
  },
]
const userData = JSON.parse(await getUserData(readCookie("loginHost").unwrap()))

if (props.note.user.id == userData.id) Listcontent.push({
  text: "削除",
  action: "",
}, {
  text: "削除して編集",
  action: "",
})

const AndMoreMenu = (e: PointerEvent) => {
  const x = e.pageX
  const y = e.pageY
  onAndMoreMenu.value = !onAndMoreMenu.value
  const target = document.getElementById(`${props.note.id}_PopUp`)
  if (target) {
    target.style.top = `${y}px`
    target.style.left = `${x}px`
  }
  console.log(x, y, e)
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
        <div :class="$style.media">
          <img v-for="file in note.files" :src="file.thumbnailUrl" />
        </div>
        <div :class="$style.reactions">
          <p v-for="reaction in note.reactions" :class="$style.reaction">
            <span
              :style="reaction.link && `content: url(${reaction.link})`"
              :class="$style.emoji"
            >
              {{ reaction.name }}
            </span>
            <span> {{ reaction.count }}</span>
          </p>
        </div>
        <footer>
          <i class="icon-comment"></i>
          <i class="icon-retweet"></i>
          <i class="icon-plus"></i>
          <i class="icon-dot-3" @click="AndMoreMenu"></i>
        </footer>
      </article>
    </div>
  </div>

</template>

<style module lang="scss">
.root {
  display: flex;
  flex-direction: column;

  min-width: 300px;
  max-width: 600px;

  padding: 2%;
  margin: 10px 0 0 0;

  border-radius: var(--default-border-radius);

  background-color: var(--secondary-bg-color);

  .renote {
    display: flex;
    flex-direction: row;

    width: 100%;

    margin: 0 0 2% 0;

    border-bottom: solid 1px var(--secondary-border-color);
    .renoterAvatar {
      height: 0.8em;
      width: 0.8em;

      object-fit: cover;

      border-radius: 0.2em;
    }
    .renoterName {
      display: flex;
      flex-direction: row;

      width: 90%;

      margin: 0 2% 0 2%;

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

    .avatar {
      height: 2em;
      width: 2em;

      object-fit: cover;

      border-radius: 0.4em;
    }
    article {
      display: flex;
      flex-direction: column;

      width: calc(96% - 2em);

      padding: 0 2% 2% 2%;

      header {
        display: flex;
        flex-direction: row;
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
      .media {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;

        width: 100%;

        img {
          width: 98%;

          margin: 1%;

          object-fit: cover;
          aspect-ratio: 16 / 9;

          border-radius: var(--default-border-radius);
        }
      }
      .reactions {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;

        font-size: 60%;

        .reaction {
          display: flex;

          margin: 3px;
          padding: 4px;

          height: 1.3em;

          overflow: hidden;
          white-space: nowrap;

          background-color: var(--primary-bg-color);

          border-radius: var(--default-border-radius);
          .emoji {
            height: 1.3em;

            margin-right: 5px;
          }
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
