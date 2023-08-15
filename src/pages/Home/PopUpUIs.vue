<script setup lang="ts">
//TS Module
import { ref } from "vue";

//vue Component
import PopUpMenuList from "../../components/global/PopUpMenuList.vue"
import Post from "../../components/global/Post.vue";
import NotificationView from "../../components/global/NotificationView.vue";
import LeftMenu from "../../components/global/LeftMenu.vue";

</script>

<script lang="ts">
const PopUpMenuList_Listcontent = ref()
const show = ref<Record<string, boolean>>({
    NotificationView: false,
    LeftMenu: false,
})

export const Show_NotificationView = () => { 
    show.value.NotificationView = !show.value.NotificationView
}

export const Show_LeftMenu = () => { 
    show.value.LeftMenu = !show.value.LeftMenu
}

export const popUpMenuList = (
    Listcontent?: {
        text: string,
        action: string,
    }[]
) => {
    PopUpMenuList_Listcontent.value = Listcontent
}
</script>


<template>
    <LeftMenu v-show="show.LeftMenu" :class="$style.LeftMenu"/>
    <PopUpMenuList :Listcontent="PopUpMenuList_Listcontent"/>
    <Post />
    <NotificationView v-show="show.NotificationView" :class="$style.notices"/>
</template>

<style module lang="scss">
@import "../../assets/css/animation.css";
.notices {
  position: fixed;
  top: 2%;

  height: 90vh;

  animation-name: moveIn;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;

  transform: translateY(-100%);
  opacity: 0;
}

.LeftMenu {
  position: fixed;
  top: 0;
  left: 0;

  height: 95vh;

  animation-name: moveIn_L;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;

  transform: translateX(-100%);
  opacity: 0;
}
</style>